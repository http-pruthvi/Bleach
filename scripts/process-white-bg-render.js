import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

export async function removeWhiteBg(inputPath, outputPath) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const uri = 'data:image/jpeg;base64,' + fs.readFileSync(inputPath).toString('base64');

  const pngBase64 = await page.evaluate(async (src) => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        const visited = new Uint8Array(w * h);
        const queue = [];

        function isWhiteBg(r, g, b) {
          return r >= 240 && g >= 240 && b >= 240;
        }

        for (let x = 0; x < w; x++) {
          queue.push(x, 0);
          queue.push(x, h - 1);
          visited[x] = 1;
          visited[(h - 1) * w + x] = 1;
        }
        for (let y = 0; y < h; y++) {
          queue.push(0, y);
          queue.push(w - 1, y);
          visited[y * w] = 1;
          visited[y * w + w - 1] = 1;
        }

        let head = 0;
        while (head < queue.length) {
          const cx = queue[head++];
          const cy = queue[head++];
          const idx = (cy * w + cx) * 4;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          if (isWhiteBg(r, g, b)) {
            data[idx + 3] = 0; // Transparent

            const neighbors = [
              [cx + 1, cy], [cx - 1, cy],
              [cx, cy + 1], [cx, cy - 1]
            ];
            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const npos = ny * w + nx;
                if (!visited[npos]) {
                  visited[npos] = 1;
                  queue.push(nx, ny);
                }
              }
            }
          }
        }

        // Feather outer perimeter
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            if (data[idx + 3] > 0) {
              const hasTransparentNeighbor = 
                data[idx - 4 + 3] === 0 ||
                data[idx + 4 + 3] === 0 ||
                data[idx - w * 4 + 3] === 0 ||
                data[idx + w * 4 + 3] === 0;

              if (hasTransparentNeighbor) {
                const brightness = (data[idx] + data[idx+1] + data[idx+2]) / 3;
                if (brightness > 220) {
                  data[idx + 3] = Math.max(0, Math.floor((255 - brightness) * 3));
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''));
      };
      img.src = src;
    });
  }, uri);

  fs.writeFileSync(outputPath, Buffer.from(pngBase64, 'base64'));
  console.log(`Saved transparent PNG to ${outputPath}!`);
  await browser.close();
}

if (process.argv[2] && process.argv[3]) {
  removeWhiteBg(process.argv[2], process.argv[3]);
}
