import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('screenshots/e2e');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('=== STARTING EXTENDED E2E TEST SUITE FOR BLEACH TRIBUTE ===');
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore favicon or non-critical 404 network warnings if any
      consoleErrors.push(`[Console Error] ${text}`);
      console.error(`  Console error detected: ${text}`);
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(`[Page Error] ${err.message}`);
    console.error(`  Page error detected: ${err.message}`);
  });

  // 1. Visit Home Page
  console.log('\n[1/8] Navigating to Home page (http://localhost:5173/) ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Verify Hero
  const heroTitle = await page.$eval('.hero-title', el => el.textContent).catch(() => null);
  console.log(`  Hero title loaded: "${heroTitle}"`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_home_hero.png') });

  // Verify Search Button on the Right Side of Top Nav
  console.log('\n[2/8] Testing Top Navigation & Search Button (Right-aligned, SVG icon, no emojis)...');
  const searchNavBtn = await page.$('.top-nav-right .search-nav-btn');
  if (!searchNavBtn) {
    throw new Error('Search button is not in .top-nav-right!');
  }
  const searchSvg = await page.$('.top-nav-right .search-nav-btn svg');
  if (!searchSvg) {
    throw new Error('Search button does not have an SVG vector icon!');
  }
  const searchBtnText = await page.$eval('.top-nav-right .search-nav-btn', el => el.textContent);
  console.log(`  Right-aligned search button text: "${searchBtnText.trim()}"`);
  // Ensure no emoji in search button text
  if (/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(searchBtnText)) {
    throw new Error('Emoji found in search button!');
  }
  console.log('  Verified: search button is on right side with crisp SVG icon and zero emojis.');

  // Test opening and querying search modal
  await searchNavBtn.click();
  await new Promise(r => setTimeout(r, 400));
  const searchModalBox = await page.$('.search-modal-box');
  if (!searchModalBox) {
    throw new Error('Search modal failed to open upon clicking search button');
  }
  await page.type('.search-field', 'Byakuya');
  await new Promise(r => setTimeout(r, 400));
  const searchResultsCount = await page.$$eval('.search-result-item', els => els.length);
  console.log(`  Search results for "Byakuya": ${searchResultsCount}`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_search_modal.png') });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 300));

  // 3. Test Back Buttons from Character Pages
  console.log('\n[3/8] Testing Character Pages & Back Button Navigation...');
  
  // Test Ichigo layout back button
  console.log('  Testing Ichigo page back button...');
  await page.goto('http://localhost:5173/character/ichigo', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  const ichigoBackBtn = await page.$('.ichigo-nav-back');
  if (!ichigoBackBtn) {
    throw new Error('Back button (.ichigo-nav-back) not found on Ichigo page');
  }
  await ichigoBackBtn.click();
  // Wait for transition canvas cover and swap to complete
  await new Promise(r => setTimeout(r, 1600));
  const currentUrlAfterIchigoBack = page.url();
  console.log(`  URL after clicking Ichigo back button: ${currentUrlAfterIchigoBack}`);
  if (!currentUrlAfterIchigoBack.includes('localhost:5173')) {
    throw new Error(`Failed to navigate back from Ichigo page, current URL: ${currentUrlAfterIchigoBack}`);
  }

  // Test Generic layout back button (e.g. Yamamoto)
  console.log('  Testing Yamamoto (GenericLayout) back button...');
  await page.goto('http://localhost:5173/character/yamamoto', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  const yamamotoBackLink = await page.$('a[href="/#factions"]');
  if (!yamamotoBackLink) {
    throw new Error('Back button linking to /#factions not found on Yamamoto page');
  }
  await yamamotoBackLink.click();
  await new Promise(r => setTimeout(r, 1600));
  const currentUrlAfterYamamotoBack = page.url();
  console.log(`  URL after clicking Yamamoto back button: ${currentUrlAfterYamamotoBack}`);

  // Test Browser History Back / Forward
  console.log('  Testing browser history back and forward navigation...');
  await page.goBack();
  await new Promise(r => setTimeout(r, 800));
  console.log(`  Browser goBack() URL: ${page.url()}`);
  await page.goForward();
  await new Promise(r => setTimeout(r, 800));
  console.log(`  Browser goForward() URL: ${page.url()}`);

  // 4. Test Custom Bleach 404 Page
  console.log('\n[4/8] Testing Custom 404 Page (Dangai Void Realm)...');
  await page.goto('http://localhost:5173/nonexistent-realm-404', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  const notFoundPage = await page.$('.not-found-page');
  if (!notFoundPage) {
    throw new Error('Custom 404 page (.not-found-page) failed to render!');
  }
  const notFoundH1 = await page.$eval('.not-found-page h1', el => el.textContent);
  console.log(`  404 Heading: "${notFoundH1}"`);
  if (!notFoundH1.includes('SPIRIT NOT FOUND')) {
    throw new Error(`Expected "SPIRIT NOT FOUND", got "${notFoundH1}"`);
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_custom_404_dangai.png') });

  // Test 404 "RETURN TO ARCHIVE" link
  const returnLink = await page.$('.not-found-page a[href="/"]');
  if (returnLink) {
    await returnLink.click();
    await new Promise(r => setTimeout(r, 1500));
    console.log(`  Successfully navigated from 404 back to: ${page.url()}`);
  }

  // 5. Test Kon Easter Egg
  console.log('\n[5/8] Testing Kon Easter Egg (Keyboard "k-o-n" & secret trigger)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // Type k-o-n
  await page.keyboard.press('k');
  await page.keyboard.press('o');
  await page.keyboard.press('n');
  await new Promise(r => setTimeout(r, 500));

  const easterEggCard = await page.$('.easter-egg-card');
  if (!easterEggCard) {
    throw new Error('Kon Easter Egg card failed to open upon typing "kon"!');
  }
  const easterEggTitle = await page.$eval('.easter-egg-card h2', el => el.textContent);
  console.log(`  Easter Egg triggered: "${easterEggTitle}"`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_easter_egg_kon.png') });

  // Test action button in easter egg
  const boingBtn = Array.from(await page.$$('.easter-egg-card button')).find(async b => {
    const text = await page.evaluate(el => el.textContent, b);
    return text.includes('BOING');
  });
  if (boingBtn) {
    await boingBtn.click();
    await new Promise(r => setTimeout(r, 300));
    console.log('  Mod Soul Boing interaction executed.');
  }

  // Close easter egg with Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));
  const isCardClosed = (await page.$('.easter-egg-card')) === null;
  console.log(`  Easter Egg closed with Escape: ${isCardClosed}`);

  // Test secret footer trigger for Easter Egg
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('open-kon-easter-egg'));
  });
  await new Promise(r => setTimeout(r, 400));
  const isCardReopened = (await page.$('.easter-egg-card')) !== null;
  console.log(`  Easter Egg opened via custom event / footer trigger: ${isCardReopened}`);
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 300));

  // 6. Test Faction Grid & Characters
  console.log('\n[6/8] Testing Faction Grid on Home...');
  await page.evaluate(() => {
    document.getElementById('factions')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const factionGroups = await page.$$('.faction-group');
  console.log(`  Rendered faction groups count: ${factionGroups.length} (expected 7)`);
  if (factionGroups.length < 7) {
    throw new Error(`Expected at least 7 faction sections, found ${factionGroups.length}`);
  }

  // 7. Test Gotei 13 Organization Chart Page
  console.log('\n[7/8] Testing Gotei 13 Organization Chart (/gotei13)...');
  await page.goto('http://localhost:5173/gotei13', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  const divisionCards = await page.$$('.division-card');
  console.log(`  Squad division cards rendered: ${divisionCards.length} (expected 13)`);
  if (divisionCards.length !== 13) {
    throw new Error(`Expected 13 division cards, found ${divisionCards.length}`);
  }
  // Test back to main page link on Gotei 13 chart
  const goteiBackBtn = await page.$('.detail-back-btn');
  if (goteiBackBtn) {
    await goteiBackBtn.click();
    await new Promise(r => setTimeout(r, 800));
    console.log(`  Gotei 13 back button navigated to: ${page.url()}`);
  }

  // 8. Test Global Emoji Audit across Document
  console.log('\n[8/8] Performing Global Emoji Audit across rendered application...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  const pageText = await page.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const match = pageText.match(emojiRegex);
  if (match) {
    throw new Error(`Forbidden emoji detected in rendered text: "${match[0]}"`);
  }
  console.log('  Confirmed: ZERO emojis found anywhere in the rendered user interface!');

  // Final check of console errors
  console.log('\n=== E2E CONSOLE ERROR AUDIT ===');
  if (consoleErrors.length > 0) {
    console.error('FAILED: Detected console errors during execution:');
    consoleErrors.forEach(err => console.error('  ', err));
    throw new Error(`E2E test failed with ${consoleErrors.length} console errors.`);
  } else {
    console.log('[PASS] ZERO console errors caught across all tested routes and interactions!');
  }

  await browser.close();
  console.log('\n=== ALL E2E TESTS PASSED SUCCESSFULLY! ===\n');
}

run().catch(err => {
  console.error('\nE2E Test Run Failed:', err);
  process.exit(1);
});
