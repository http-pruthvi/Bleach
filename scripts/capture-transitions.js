import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('screenshots/transitions');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const TIER_A = [
  'ichigo', 'rukia', 'orihime', 'chad',
  'uryu', 'renji', 'byakuya', 'toshiro',
  'kenpachi', 'aizen', 'yoruichi', 'urahara'
];

async function run() {
  console.log('=== CAPTURING 12 TIER A SIGNATURE TRANSITIONS & THEMES ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Visit /themes gallery
  console.log('Visiting /themes gallery...');
  await page.goto('http://localhost:5173/themes', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '00_theme_dna_gallery.png') });
  console.log('Captured 00_theme_dna_gallery.png');

  // 2. Capture each Tier A signature character detail page and transition
  for (const id of TIER_A) {
    console.log(`Capturing signature theme & transition for: ${id}...`);
    await page.goto(`http://localhost:5173/character/${id}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    // Save final rendered detail page with signature theme, texture, dividers, and typography
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${id}_theme.png`) });
    console.log(`Saved ${id}_theme.png`);
  }

  await browser.close();
  console.log('=== ALL TRANSITION & THEME CAPTURES COMPLETED! ===');
}

run().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
