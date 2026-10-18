// Dynamic on-demand Google Fonts loader
// Caches loaded font families to avoid duplicate network requests
const loadedFonts = new Set();

const GOOGLE_FONT_FALLBACKS = {
  'Cinzel': 'Cinzel, Georgia, serif',
  'Syne': 'Syne, "Trebuchet MS", sans-serif',
  'Space Grotesk': '"Space Grotesk", "Segoe UI", sans-serif',
  'Playfair Display': '"Playfair Display", Georgia, serif',
  'Bebas Neue': '"Bebas Neue", "Impact", sans-serif',
  'Cormorant Garamond': '"Cormorant Garamond", Garamond, serif',
  'Orbitron': 'Orbitron, "Segoe UI", sans-serif',
  'Shippori Mincho': '"Shippori Mincho", "Hiragino Mincho ProN", serif',
  'Dela Gothic One': '"Dela Gothic One", Impact, sans-serif',
  'Marcellus': 'Marcellus, Georgia, serif',
  'Rajdhani': 'Rajdhani, "Segoe UI", sans-serif',
  'Montserrat': 'Montserrat, Arial, sans-serif',
  'Inter': 'Inter, system-ui, sans-serif',
  'Plus Jakarta Sans': '"Plus Jakarta Sans", system-ui, sans-serif'
};

export function getFontFamilyWithFallback(fontName) {
  return GOOGLE_FONT_FALLBACKS[fontName] || `"${fontName}", system-ui, sans-serif`;
}

export function loadGoogleFont(fontName) {
  if (!fontName || typeof document === 'undefined') return;
  const cleanName = fontName.replace(/['"]/g, '').trim();
  if (loadedFonts.has(cleanName)) return;

  try {
    const formattedFamily = cleanName.replace(/\s+/g, '+');
    const href = `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@400;600;700;900&display=swap`;

    // Check if link tag already exists
    const existing = document.querySelector(`link[href*="${formattedFamily}"]`);
    if (existing) {
      loadedFonts.add(cleanName);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    loadedFonts.add(cleanName);
  } catch (err) {
    console.warn(`Could not load font ${cleanName}:`, err);
  }
}

export const CURATED_FONTS = Object.keys(GOOGLE_FONT_FALLBACKS);
