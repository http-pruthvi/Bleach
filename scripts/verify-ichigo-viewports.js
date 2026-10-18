import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const REVIEW_DIR = path.resolve('review/ichigo_comparison');
if (!fs.existsSync(REVIEW_DIR)) {
  fs.mkdirSync(REVIEW_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'tablet_820', width: 820, height: 1180 },
  { name: 'mobile_390', width: 390, height: 844 }
];

async function verifyViewports() {
  console.log('=== VERIFYING ICHIGO REDESIGN AT 3 VIEWPORTS ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader']
  });

  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height}) ...`);
    await page.setViewport({ width: vp.width, height: vp.height });

    // 1. Capture redesigned Ichigo page
    await page.goto('http://localhost:5173/character/ichigo', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const ichigoScreenshot = path.join(REVIEW_DIR, `ichigo_${vp.name}.png`);
    await page.screenshot({ path: ichigoScreenshot });
    console.log(`  Saved ${ichigoScreenshot}`);

    // Scroll down to check kanji fill and power breakdown
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(r => setTimeout(r, 300));
    const ichigoScrolled = path.join(REVIEW_DIR, `ichigo_scrolled_${vp.name}.png`);
    await page.screenshot({ path: ichigoScrolled });
    console.log(`  Saved ${ichigoScrolled}`);
  }

  await browser.close();
  console.log('\n=== ICHIGO VIEWPORT VERIFICATION COMPLETE ===\n');
}

verifyViewports().catch(err => {
  console.error('Viewport verification failed:', err);
  process.exit(1);
});
