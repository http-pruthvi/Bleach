import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getThemeForCharacter } from '../src/data/themes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'src', 'data');

const FACTION_FILES = [
  'karakura.json',
  'gotei13.json',
  'visored.json',
  'espada.json',
  'wandenreich.json',
  'royalGuard.json',
  'urahara.json'
];

const VALID_TIERS = new Set(['A', 'B', 'C']);
const VALID_FX_TYPES = new Set([
  'fire', 'ice', 'lightning', 'blades', 'hollow', 'arrows',
  'kido', 'water', 'shadow', 'illusion', 'gravity', 'speed',
  'petals', 'earth', 'shield'
]);

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function validate() {
  console.log('[AUDIT] Validating Bleach Character Data & Theme DNA Uniqueness...');
  const seenIds = new Set();
  const errors = [];
  const globalShapeColorCombos = new Map();
  let totalCharacters = 0;
  const tierCounts = { A: 0, B: 0, C: 0 };

  for (const file of FACTION_FILES) {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing faction file: ${file}`);
      continue;
    }

    let list;
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      list = JSON.parse(content);
    } catch (e) {
      errors.push(`Failed to parse JSON in ${file}: ${e.message}`);
      continue;
    }

    if (!Array.isArray(list)) {
      errors.push(`Faction file ${file} must export a JSON array.`);
      continue;
    }

    // Faction-level uniqueness tracker: transition + accent + display font
    const factionThemeCombos = new Map();
    const factionKitCombos = new Map();

    list.forEach((char, idx) => {
      totalCharacters++;
      const tag = `[${file} #${idx + 1} (${char.id || 'NO_ID'})]`;

      // 1. Required core fields
      if (!char.id || typeof char.id !== 'string') errors.push(`${tag} Missing or invalid 'id'`);
      if (seenIds.has(char.id)) errors.push(`${tag} Duplicate id '${char.id}'`);
      if (char.id) seenIds.add(char.id);

      if (!char.name || typeof char.name !== 'string') errors.push(`${tag} Missing 'name'`);
      if (!char.kanji || typeof char.kanji !== 'string') errors.push(`${tag} Missing 'kanji'`);
      if (!Array.isArray(char.aliases)) errors.push(`${tag} 'aliases' must be an array`);
      if (!char.faction || typeof char.faction !== 'string') errors.push(`${tag} Missing 'faction'`);

      // 2. Tier validation
      if (!VALID_TIERS.has(char.tier)) {
        errors.push(`${tag} Invalid tier '${char.tier}' (must be A, B, or C)`);
      } else {
        tierCounts[char.tier]++;
      }

      // 3. Power definition
      if (!char.power || typeof char.power !== 'object') {
        errors.push(`${tag} Missing 'power' object`);
      } else {
        if (!('name' in char.power)) errors.push(`${tag} 'power.name' is required`);
      }

      // 4. FX type
      if (!VALID_FX_TYPES.has(char.fxType)) {
        errors.push(`${tag} Invalid fxType '${char.fxType}'. Allowed: ${[...VALID_FX_TYPES].join(', ')}`);
      }

      // 5. Colors & Contrast & Non-Dark Luminance Floor
      if (!char.colors || !char.colors.bg || !char.colors.ink || !char.colors.accent) {
        errors.push(`${tag} Missing colors (must have bg, ink, accent hex strings)`);
      } else {
        try {
          const bgLum = relativeLuminance(hexToRgb(char.colors.bg));
          if (bgLum < 0.10) {
            errors.push(`${tag} Background luminance too dark (${bgLum.toFixed(3)} < 0.10). Near-black backgrounds are banned: character must own a saturated or light color field.`);
          }

          const ratio = contrastRatio(char.colors.bg, char.colors.ink);
          if (ratio < 4.5) {
            errors.push(`${tag} AA Contrast failure between bg (${char.colors.bg}) and ink (${char.colors.ink}): ${ratio.toFixed(2)}:1 (minimum 4.5:1 required)`);
          }
        } catch (e) {
          errors.push(`${tag} Invalid hex colors: ${e.message}`);
        }
      }

      // 6. Blurb
      if (!char.blurb || typeof char.blurb !== 'string' || char.blurb.trim().length < 20) {
        errors.push(`${tag} 'blurb' must be at least 20 characters in original words`);
      }

      // 7. Video object shape
      if (!char.video || typeof char.video !== 'object') {
        errors.push(`${tag} Missing 'video' object`);
      } else {
        if (![null, 'youtube', 'file'].includes(char.video.type)) {
          errors.push(`${tag} 'video.type' must be 'youtube', 'file', or null`);
        }
      }

      // 8. Theme DNA Validation & Uniqueness
      try {
        const theme = getThemeForCharacter(char);
        if (!theme) {
          errors.push(`${tag} Failed to resolve Theme DNA`);
        } else {
          // Check WCAG contrast on theme palette
          const themeRatio = contrastRatio(theme.palette.bg, theme.palette.ink);
          if (themeRatio < 4.5) {
            errors.push(`${tag} Theme AA Contrast failure: ${themeRatio.toFixed(2)}:1`);
          }

          // Uniqueness in same faction: shape + motion + signature element
          if (char.kitShape && char.kitMotion && char.kitSignature) {
            const kitComboKey = `${char.kitShape}|${char.kitMotion}|${char.kitSignature}`;
            if (factionKitCombos.has(kitComboKey)) {
              const existingId = factionKitCombos.get(kitComboKey);
              errors.push(`${tag} In-faction kit collision in ${file}: shares shape '${char.kitShape}', motion '${char.kitMotion}', and signature '${char.kitSignature}' with '${existingId}'`);
            } else {
              factionKitCombos.set(kitComboKey, char.id);
            }

            // Global uniqueness: no two characters anywhere share the same shape + color field
            const shapeColorKey = `${char.kitShape}|${char.colors.bg.toLowerCase()}`;
            if (globalShapeColorCombos.has(shapeColorKey)) {
              const existingId = globalShapeColorCombos.get(shapeColorKey);
              errors.push(`${tag} Global shape+color collision: shares shape '${char.kitShape}' and bg '${char.colors.bg}' with '${existingId}'`);
            } else {
              globalShapeColorCombos.set(shapeColorKey, char.id);
            }
          }

          // Uniqueness in same faction: transition + accent + display font
          const comboKey = `${theme.transition}|${theme.palette.accent.toLowerCase()}|${theme.type.display}`;
          if (factionThemeCombos.has(comboKey)) {
            const existingId = factionThemeCombos.get(comboKey);
            errors.push(`${tag} Theme collision in ${file}: shares transition '${theme.transition}', accent '${theme.palette.accent}', and font '${theme.type.display}' with '${existingId}'`);
          } else {
            factionThemeCombos.set(comboKey, char.id);
          }
        }
      } catch (err) {
        errors.push(`${tag} Theme DNA error: ${err.message}`);
      }
    });
  }

  if (errors.length > 0) {
    console.error(`\n[FAIL] Validation Failed with ${errors.length} error(s):`);
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  }

  console.log(`\n[PASS] Data & Theme DNA Validation Passed!`);
  console.log(`   Total Characters: ${totalCharacters}`);
  console.log(`   Tier A (Full Pin Scenes): ${tierCounts.A}`);
  console.log(`   Tier B (Faction Grid Cards): ${tierCounts.B}`);
  console.log(`   Tier C (Compact Roster): ${tierCounts.C}`);
  console.log(`   Faction Theme Uniqueness: 100% Unique Combos Verified!`);
}

validate();
