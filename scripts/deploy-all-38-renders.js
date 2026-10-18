import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const factions = ['karakura.json', 'gotei13.json', 'urahara.json', 'visored.json', 'espada.json', 'wandenreich.json', 'royalGuard.json'];
let all = [];
for (const f of factions) {
  const list = JSON.parse(fs.readFileSync('src/data/' + f, 'utf8'));
  all.push(...list);
}
const officialManifest = JSON.parse(fs.readFileSync('public/assets/character-assets-manifest.json', 'utf8'));
const officialIds = new Set(officialManifest.map(m => m.id));
const nonTybw = all.filter(c => !officialIds.has(c.id));

async function deployAssets() {
  console.log('=== DEPLOYING ALL 38 FULL-BODY RENDERS AND HEADSHOTS ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  const destCharDir = path.resolve('public/assets/characters');
  const destHeadDir = path.resolve('public/assets/headshots');

  for (const c of nonTybw) {
    const srcPath = path.resolve(`scripts/test_bbs_downloads/${c.id}.png`);
    if (!fs.existsSync(srcPath)) {
      console.error(`ERROR: Missing source for ${c.id}`);
      continue;
    }

    const destCharPath = path.join(destCharDir, `${c.id}.png`);
    const destHeadPath = path.join(destHeadDir, `${c.id}.png`);

    // 1. Copy full-body render
    fs.copyFileSync(srcPath, destCharPath);

    // 2. Generate headshot crop via browser canvas
    const uri = 'data:image/png;base64,' + fs.readFileSync(srcPath).toString('base64');
    const headshotBase64 = await page.evaluate(async (src) => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const w = img.naturalWidth;
          const h = img.naturalHeight;

          // Find bounding box of non-transparent pixels to locate character's head
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, w, h).data;
          let minX = w, maxX = 0, minY = h, maxY = 0;
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              const a = imgData[(y * w + x) * 4 + 3];
              if (a > 30) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }

          // The head is typically at the top of the character's bounding box
          const charW = maxX - minX;
          const charH = maxY - minY;
          const centerX = minX + charW / 2;
          
          // Head region: starting from minY down about 35% of character height or min(charW, 450)
          const cropSize = Math.min(w, Math.max(280, charW * 1.1, charH * 0.38));
          const cropW = cropSize;
          const cropH = cropSize * 0.75; // aspect ratio 4:3 landscape headshot

          let startX = Math.max(0, Math.min(w - cropW, centerX - cropW / 2));
          let startY = Math.max(0, Math.min(h - cropH, minY - cropH * 0.05));

          const outCanvas = document.createElement('canvas');
          outCanvas.width = 400;
          outCanvas.height = 300;
          const outCtx = outCanvas.getContext('2d');
          outCtx.imageSmoothingEnabled = true;
          outCtx.imageSmoothingQuality = 'high';
          outCtx.drawImage(img, startX, startY, cropW, cropH, 0, 0, 400, 300);

          resolve(outCanvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''));
        };
        img.src = src;
      });
    }, uri);

    fs.writeFileSync(destHeadPath, Buffer.from(headshotBase64, 'base64'));
    console.log(`✓ Deployed ${c.id.padEnd(14)} -> characters/${c.id}.png & headshots/${c.id}.png`);
  }

  await browser.close();
  console.log('=== ALL 38 RENDERS AND HEADSHOTS DEPLOYED SUCCESSFULLY ===');
}

deployAssets();
