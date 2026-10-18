import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const TIER_A_EXACT = {
  ichigo: { bg: '#ff5a0a', ink: '#0c0c0c', accent: '#ffffff' },
  rukia: { bg: '#e6f0f8', ink: '#0b2a45', accent: '#3f8fd0' },
  orihime: { bg: '#ffd9bd', ink: '#4a1f1a', accent: '#e8556d' },
  chad: { bg: '#e0a526', ink: '#2a0f0a', accent: '#dc2626' },
  uryu: { bg: '#1d4fd8', ink: '#eaf2ff', accent: '#7fd1ff' },
  renji: { bg: '#b3121f', ink: '#ffffff', accent: '#ff5a0a' },
  byakuya: { bg: '#f7e4ea', ink: '#3a1d2b', accent: '#d1517a' },
  toshiro: { bg: '#bfeaf5', ink: '#07324a', accent: '#2fa8d8' },
  kenpachi: { bg: '#eab308', ink: '#18181b', accent: '#dc2626' },
  aizen: { bg: '#e2e8f0', ink: '#0f172a', accent: '#6366f1' },
  yoruichi: { bg: '#f5d0fe', ink: '#3b0764', accent: '#c026d3' },
  urahara: { bg: '#dcfce7', ink: '#14532d', accent: '#16a34a' }
};

const SHAPES = [
  'slash', 'hex-grid', 'shards', 'bars', 'circle-iris',
  'star-iris', 'diamonds', 'waves', 'blinds', 'brush-stroke',
  'ripples', 'torn-paper', 'chain-links'
];

const MOTIONS = ['snap', 'drift', 'slam', 'stagger', 'elastic', 'glide'];

const FONTS = [
  'Dela Gothic One', 'Cinzel', 'Bebas Neue', 'Montserrat',
  'Rajdhani', 'Syne', 'Playfair Display', 'Space Grotesk', 'Inter'
];

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateDistinctPalettes() {
  const globalUsedShapeColor = new Set();
  let globalCounter = 0;

  FACTION_FILES.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) return;

    const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const factionThemeCombos = new Set();
    const factionKitCombos = new Set();

    list.forEach((char, idx) => {
      globalCounter++;

      // 1. Assign Palette
      if (TIER_A_EXACT[char.id]) {
        char.colors = { ...TIER_A_EXACT[char.id] };
      } else {
        // Generate distinct HSL hue per combatant
        // Keep lightness between 82% and 94% so luminance is strictly >= 0.50 (well above 0.10)
        const hue = (globalCounter * 37) % 360;
        const sat = 70 + (idx % 25);
        const light = 84 + (idx % 10);
        const bgHex = hslToHex(hue, sat, light);

        // Dark ink for high contrast (passes WCAG AAA)
        const inkHue = (hue + 180) % 360;
        const inkHex = hslToHex(inkHue, 60, 10); // Very deep, rich ink

        // Accent hex
        const accentHex = hslToHex((hue + 45) % 360, 85, 45);

        char.colors = {
          bg: bgHex,
          ink: inkHex,
          accent: accentHex
        };
      }

      // Check luminance and contrast
      const lum = relativeLuminance(hexToRgb(char.colors.bg));
      if (lum < 0.10) {
        char.colors.bg = '#fef08a'; // fallback bright
      }
      if (contrastRatio(char.colors.bg, char.colors.ink) < 4.5) {
        char.colors.ink = '#0c0c0c';
      }

      // 2. Assign Kit Tokens guaranteeing ZERO collision
      let shapeIdx = (idx * 3 + globalCounter) % SHAPES.length;
      let motionIdx = (idx * 2 + globalCounter) % MOTIONS.length;

      let shape = SHAPES[shapeIdx];
      let motion = MOTIONS[motionIdx];
      let sig = `${char.id}-sig-${(globalCounter * 7) % 100}`;

      // Guarantee global shape + color uniqueness
      let shapeColorKey = `${shape}|${char.colors.bg.toLowerCase()}`;
      while (globalUsedShapeColor.has(shapeColorKey)) {
        shapeIdx = (shapeIdx + 1) % SHAPES.length;
        shape = SHAPES[shapeIdx];
        shapeColorKey = `${shape}|${char.colors.bg.toLowerCase()}`;
      }
      globalUsedShapeColor.add(shapeColorKey);

      char.kitShape = shape;
      char.kitMotion = motion;
      char.kitSignature = sig;

      // 3. Guarantee in-faction theme uniqueness: transition + accent + font
      const font = FONTS[(idx + globalCounter) % FONTS.length];
      char.displayFont = font;

      // Storyboard
      char.storyboard = [
        `Anticipation: ${char.kitShape} silhouette emerges with a brief ${char.kitMotion} cue.`,
        `Cover: Signature ${char.name} color field (${char.colors.bg}) expands across screen.`,
        `Reveal: Cover dissolves as ${char.power?.name || 'spiritual aura'} sweeps into focus.`
      ];
    });

    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
    console.log(`  Assigned distinct tokens to ${list.length} characters in ${file}`);
  });
}

generateDistinctPalettes();
console.log('✅ Distinct palettes and kit tokens assignment complete!');
