import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getThemeForCharacter } from '../src/data/themes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicCharDir = path.join(rootDir, 'public', 'assets', 'characters');
const dataDir = path.join(rootDir, 'src', 'data');

if (!fs.existsSync(publicCharDir)) {
  fs.mkdirSync(publicCharDir, { recursive: true });
}

// Read all characters from the 7 faction files
const FACTION_FILES = [
  'karakura.json',
  'gotei13.json',
  'urahara.json',
  'visored.json',
  'espada.json',
  'wandenreich.json',
  'royalGuard.json'
];

async function run() {
  console.log('=== GENERATING CHARACTER PORTRAIT IMAGES FOR ALL COMBATANTS ===');

  // Collect characters
  const allCharacters = [];
  for (const file of FACTION_FILES) {
    const filePath = path.join(dataDir, file);
    const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allCharacters.push(...list);
  }

  // Launch headless browser to render portraits
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 640, deviceScaleFactor: 2 });

  let generatedCount = 0;
  let preservedCount = 0;

  for (let i = 0; i < allCharacters.length; i++) {
    const char = allCharacters[i];
    const outPath = path.join(publicCharDir, `${char.id}.png`);

    // Check if an existing illustrated image is already in place (e.g. the Tier A warriors)
    // We only preserve files that are already large illustrations (> 100KB)
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 100000) {
      preservedCount++;
      console.log(`[${i + 1}/${allCharacters.length}] Preserving rich illustrated artwork for: ${char.name} (${char.id})`);
      continue;
    }

    const theme = getThemeForCharacter(char);
    const bg = theme.palette.bg;
    const ink = theme.palette.ink;
    const acc = theme.palette.accent;
    const alt = theme.palette.alt;
    const kanji = char.kanji;
    const firstKanji = char.kanji[0] || '斬';

    // HTML template for high-impact manga character card portrait
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 480px;
            height: 640px;
            background: ${bg};
            color: ${ink};
            overflow: hidden;
            position: relative;
            font-family: '${theme.type.display}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 32px 28px;
          }
          /* Radial spiritual pressure aura */
          .aura {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 45%, ${acc}33 0%, ${alt}15 45%, transparent 70%);
            z-index: 1;
          }
          /* Giant Kanji Calligraphy Watermark */
          .kanji-bg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -55%);
            font-size: 260px;
            font-weight: 900;
            color: ${acc};
            opacity: 0.12;
            z-index: 2;
            line-height: 1;
            user-select: none;
            font-family: "Hiragino Mincho ProN", "Yu Mincho", serif;
          }
          /* Subtle diagonal slash energy rays */
          .energy-ray {
            position: absolute;
            width: 200%;
            height: 2px;
            background: linear-gradient(90deg, transparent, ${acc}44, transparent);
            transform: rotate(-25deg);
            z-index: 2;
          }
          /* Central Iconographic Crest */
          .emblem-center {
            position: absolute;
            top: 46%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .crest-circle {
            width: 210px;
            height: 210px;
            border-radius: 50%;
            border: 3px solid ${acc};
            box-shadow: 0 0 35px ${acc}55, inset 0 0 25px ${acc}22;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${bg}cc;
            position: relative;
          }
          .crest-symbol {
            font-size: 88px;
            font-weight: 900;
            color: ${ink};
            text-shadow: 0 0 15px ${acc};
            font-family: "Hiragino Mincho ProN", "Yu Mincho", serif;
          }
          .crest-ring {
            position: absolute;
            inset: -12px;
            border-radius: 50%;
            border: 1px dashed ${acc}88;
          }
          /* Header Banner */
          .top-bar {
            position: relative;
            z-index: 5;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .faction-badge {
            font-size: 11px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: ${acc};
            font-weight: 800;
          }
          .tier-chip {
            padding: 3px 8px;
            background: ${acc}22;
            border: 1px solid ${acc};
            border-radius: 3px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: ${ink};
          }
          /* Footer Dossier Block */
          .bottom-block {
            position: relative;
            z-index: 5;
            background: ${bg}dd;
            border: 1px solid ${acc}44;
            border-radius: 6px;
            padding: 16px 18px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.6);
          }
          .char-name {
            font-size: 26px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            line-height: 1.1;
            margin-bottom: 4px;
            color: #ffffff;
            font-weight: 900;
          }
          .char-rank {
            font-size: 12px;
            letter-spacing: 0.1em;
            color: ${acc};
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 6px;
          }
          .char-power {
            font-size: 12px;
            opacity: 0.85;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .power-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: ${acc};
            box-shadow: 0 0 6px ${acc};
          }
        </style>
      </head>
      <body>
        <div class="aura"></div>
        <div class="energy-ray" style="top: 20%; left: -50%;"></div>
        <div class="energy-ray" style="top: 75%; left: -40%;"></div>
        <div class="kanji-bg">${kanji}</div>

        <div class="top-bar">
          <div>
            <div class="faction-badge">${char.faction}</div>
            <div style="font-size:13px; opacity:0.6; margin-top:2px;">BLEACH // SEIREITEI ARCHIVES</div>
          </div>
          <div class="tier-chip">TIER ${char.tier}</div>
        </div>

        <div class="emblem-center">
          <div class="crest-circle">
            <div class="crest-ring"></div>
            <div class="crest-symbol">${firstKanji}</div>
          </div>
        </div>

        <div class="bottom-block">
          <div class="char-rank">${char.divisionRank || char.faction}</div>
          <div class="char-name">${char.name}</div>
          <div class="char-power">
            <span class="power-dot"></span>
            <span>${char.power?.name || 'Spiritual Pressure'} // ${char.power?.release || char.fxType.toUpperCase()}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });
    await page.screenshot({ path: outPath, type: 'png' });
    generatedCount++;
    if (generatedCount % 10 === 0 || i === allCharacters.length - 1) {
      console.log(`[${i + 1}/${allCharacters.length}] Generated ${generatedCount} portraits so far...`);
    }
  }

  await browser.close();
  console.log(`\n✅ Finished generating character portrait images!`);
  console.log(`   Preserved rich illustrated art: ${preservedCount}`);
  console.log(`   Generated bespoke visual portraits: ${generatedCount}`);
  console.log(`   Total portraits available in public/assets/characters/: ${allCharacters.length}`);

  // Now update all 7 faction JSON files so char.image points to '/assets/characters/<id>.png'
  console.log('\nUpdating faction JSON image fields to point to /assets/characters/<id>.png ...');
  for (const file of FACTION_FILES) {
    const filePath = path.join(dataDir, file);
    const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let modified = false;

    list.forEach(c => {
      const expectedPath = `/assets/characters/${c.id}.png`;
      if (c.image !== expectedPath) {
        c.image = expectedPath;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
      console.log(`  Updated ${file} with explicit character image paths.`);
    }
  }

  console.log('\n=== ALL CHARACTER IMAGES GENERATED AND LINKED SUCCESSFULLY! ===\n');
}

run().catch(err => {
  console.error('Image generation failed:', err);
  process.exit(1);
});
