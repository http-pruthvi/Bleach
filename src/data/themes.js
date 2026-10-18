// Comprehensive Per-Character Theme DNA System for Bleach Cast
// Every single warrior owns an explicit, custom-tailored theme matching their specific powers, Zanpakuto, and personality.

export const ARCHETYPES = {
  fire: {
    palette: { bg: '#130401', ink: '#feece9', accent: '#f97316', alt: '#b91c1c', glow: 'rgba(249, 115, 22, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone',
    transition: 'fire',
    easing: 'power3.out',
    rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'slash',
    cursor: 'blade',
    loader: 'flame-flicker',
    sfx: 'fire',
    scrollbar: '#f97316'
  },
  ice: {
    palette: { bg: '#040d18', ink: '#eaf4fd', accent: '#38bdf8', alt: '#0284c7', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'frost-noise',
    transition: 'ice',
    easing: 'power2.out',
    rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'ice-edge',
    cursor: 'snowflake',
    loader: 'frost-circle',
    sfx: 'ice',
    scrollbar: '#38bdf8'
  },
  lightning: {
    palette: { bg: '#0e051c', ink: '#fbf5ff', accent: '#a855f7', alt: '#ec4899', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone',
    transition: 'lightning',
    easing: 'expo.out',
    rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'lightning',
    cursor: 'lightning',
    loader: 'flash-step',
    sfx: 'lightning',
    scrollbar: '#a855f7'
  },
  water: {
    palette: { bg: '#030f16', ink: '#eef8fc', accent: '#06b6d4', alt: '#0284c7', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'ink-wash',
    transition: 'water',
    easing: 'power2.inOut',
    rhythm: { revealStyle: 'fade-rise', durationScale: 1.05 },
    divider: 'petal-curve',
    cursor: 'ripple',
    loader: 'water-swirl',
    sfx: 'water',
    scrollbar: '#06b6d4'
  },
  wind: {
    palette: { bg: '#06130e', ink: '#eefbf4', accent: '#10b981', alt: '#059669', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'paper-grain',
    transition: 'speed',
    easing: 'power3.out',
    rhythm: { revealStyle: 'wipe', durationScale: 0.9 },
    divider: 'slash',
    cursor: 'blade',
    loader: 'gale-spiral',
    sfx: 'blades',
    scrollbar: '#10b981'
  },
  earth: {
    palette: { bg: '#100a06', ink: '#f8eee6', accent: '#d97706', alt: '#78350f', glow: 'rgba(217, 119, 6, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone',
    transition: 'earth',
    easing: 'back.out(1.4)',
    rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'crack-line',
    cursor: 'fist',
    loader: 'shockwave',
    sfx: 'earth',
    scrollbar: '#d97706'
  },
  shadow: {
    palette: { bg: '#08050e', ink: '#f1eef8', accent: '#8b5cf6', alt: '#4c1d95', glow: 'rgba(139, 92, 246, 0.45)' },
    type: { display: 'Shippori Mincho', body: 'Inter', kanjiStyle: 'brush', tracking: '0.12em', weight: 700 },
    texture: 'ink-wash',
    transition: 'shadow',
    easing: 'power4.inOut',
    rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'torn-paper',
    cursor: 'shadow',
    loader: 'shadow-engulf',
    sfx: 'shadow',
    scrollbar: '#8b5cf6'
  },
  light: {
    palette: { bg: '#0a0d18', ink: '#f3f7fd', accent: '#60a5fa', alt: '#fbbf24', glow: 'rgba(96, 165, 250, 0.45)' },
    type: { display: 'Rajdhani', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'scanlines',
    transition: 'light',
    easing: 'expo.out',
    rhythm: { revealStyle: 'wipe', durationScale: 0.9 },
    divider: 'lightning',
    cursor: 'reticle',
    loader: 'quincy-cross',
    sfx: 'arrows',
    scrollbar: '#60a5fa'
  },
  blades: {
    palette: { bg: '#0c0b0b', ink: '#f8f8f8', accent: '#ef4444', alt: '#991b1b', glow: 'rgba(239, 68, 68, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'halftone',
    transition: 'blades',
    easing: 'power4.out',
    rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash',
    cursor: 'blade',
    loader: 'getsuga-cut',
    sfx: 'slash',
    scrollbar: '#ef4444'
  },
  kido: {
    palette: { bg: '#070914', ink: '#edf2fc', accent: '#3b82f6', alt: '#1d4ed8', glow: 'rgba(59, 130, 246, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'starfield',
    transition: 'kido',
    easing: 'power3.inOut',
    rhythm: { revealStyle: 'fade-rise', durationScale: 1.05 },
    divider: 'hexagon',
    cursor: 'reticle',
    loader: 'kido-circle',
    sfx: 'kido',
    scrollbar: '#3b82f6'
  },
  hollow: {
    palette: { bg: '#080507', ink: '#fbeff3', accent: '#f43f5e', alt: '#881337', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone',
    transition: 'hollow',
    easing: 'power4.inOut',
    rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line',
    cursor: 'fist',
    loader: 'cero-flare',
    sfx: 'hollow',
    scrollbar: '#f43f5e'
  },
  quincy: {
    palette: { bg: '#060b17', ink: '#f0f5fc', accent: '#38bdf8', alt: '#e2e8f0', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Rajdhani', body: 'Inter', kanjiStyle: 'outline', tracking: '0.16em', weight: 700 },
    texture: 'scanlines',
    transition: 'quincy',
    easing: 'expo.out',
    rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'lightning',
    cursor: 'reticle',
    loader: 'quincy-cross',
    sfx: 'arrows',
    scrollbar: '#38bdf8'
  },
  illusion: {
    palette: { bg: '#0a0614', ink: '#f3eefb', accent: '#a855f7', alt: '#581c87', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 800 },
    texture: 'mirror-shards',
    transition: 'illusion',
    easing: 'power4.inOut',
    rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'crack-line',
    cursor: 'ripple',
    loader: 'mirror-shatter',
    sfx: 'illusion',
    scrollbar: '#a855f7'
  },
  gravity: {
    palette: { bg: '#080512', ink: '#ede9f8', accent: '#7c3aed', alt: '#2e1065', glow: 'rgba(124, 58, 237, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'starfield',
    transition: 'gravity',
    easing: 'back.out(1.6)',
    rhythm: { revealStyle: 'slam', durationScale: 1.1 },
    divider: 'hexagon',
    cursor: 'fist',
    loader: 'singularity',
    sfx: 'earth',
    scrollbar: '#7c3aed'
  },
  speed: {
    palette: { bg: '#0f0618', ink: '#faeefc', accent: '#c084fc', alt: '#e879f9', glow: 'rgba(192, 132, 252, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone',
    transition: 'speed',
    easing: 'expo.out',
    rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning',
    cursor: 'lightning',
    loader: 'flash-step',
    sfx: 'lightning',
    scrollbar: '#c084fc'
  },
  'brute-force': {
    palette: { bg: '#100502', ink: '#fcece9', accent: '#ea580c', alt: '#7c2d12', glow: 'rgba(234, 88, 12, 0.5)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.04em', weight: 900 },
    texture: 'cracked-stone',
    transition: 'brute-force',
    easing: 'steps(6)',
    rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'torn-paper',
    cursor: 'blade',
    loader: 'claw-tear',
    sfx: 'blades',
    scrollbar: '#ea580c'
  }
};

// 100% Bespoke, Individually Tailored Themes for Every Combatant
export const BESPOKE_WARRIOR_THEMES = {
  // === KARAKURA TOWN & XCUTION ===
  ichigo: {
    palette: { bg: '#080808', ink: '#f2f2f2', accent: '#ff5a0a', alt: '#dc2626', glow: 'rgba(255, 90, 10, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'brush', tracking: '0.08em', weight: 900 },
    texture: 'halftone', transition: 'ichigo', easing: 'power4.inOut', rhythm: { revealStyle: 'slam', durationScale: 1.0 },
    divider: 'slash', cursor: 'crescent', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#ff5a0a'
  },
  orihime: {
    palette: { bg: '#140c06', ink: '#fff7ed', accent: '#f59e0b', alt: '#fbbf24', glow: 'rgba(245, 158, 11, 0.4)' },
    type: { display: 'Playfair Display', body: 'Plus Jakarta Sans', kanjiStyle: 'outline', tracking: '0.06em', weight: 700 },
    texture: 'starfield', transition: 'orihime', easing: 'power2.inOut', rhythm: { revealStyle: 'fade-rise', durationScale: 1.05 },
    divider: 'hexagon', cursor: 'petal', loader: 'shield-hex', sfx: 'shield', scrollbar: '#f59e0b'
  },
  chad: {
    palette: { bg: '#100a08', ink: '#fbeee6', accent: '#dc2626', alt: '#78350f', glow: 'rgba(220, 38, 38, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'cracked-stone', transition: 'chad', easing: 'back.out(1.4)', rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#dc2626'
  },
  uryu: {
    palette: { bg: '#060d1a', ink: '#edf5ff', accent: '#3b82f6', alt: '#93c5fd', glow: 'rgba(59, 130, 246, 0.45)' },
    type: { display: 'Rajdhani', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'scanlines', transition: 'uryu', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.9 },
    divider: 'lightning', cursor: 'reticle', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#3b82f6'
  },
  isshin: {
    palette: { bg: '#120406', ink: '#feecee', accent: '#e11d48', alt: '#9f1239', glow: 'rgba(225, 29, 72, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'fire', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'blade', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#e11d48'
  },
  karin: {
    palette: { bg: '#041018', ink: '#eef8fc', accent: '#06b6d4', alt: '#0e7490', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'scanlines', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'crack-line', cursor: 'fist', loader: 'flash-step', sfx: 'blades', scrollbar: '#06b6d4'
  },
  yuzu: {
    palette: { bg: '#140a04', ink: '#fff7ed', accent: '#fb923c', alt: '#c2410c', glow: 'rgba(251, 146, 60, 0.45)' },
    type: { display: 'Playfair Display', body: 'Plus Jakarta Sans', kanjiStyle: 'outline', tracking: '0.06em', weight: 600 },
    texture: 'starfield', transition: 'water', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'petal', loader: 'water-swirl', sfx: 'water', scrollbar: '#fb923c'
  },
  tatsuki: {
    palette: { bg: '#120702', ink: '#fef1ec', accent: '#ea580c', alt: '#9a3412', glow: 'rgba(234, 88, 12, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Inter', kanjiStyle: 'solid', tracking: '0.06em', weight: 800 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.3)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#ea580c'
  },
  keigo: {
    palette: { bg: '#120f02', ink: '#fefce8', accent: '#facc15', alt: '#ca8a04', glow: 'rgba(250, 204, 21, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'brush', tracking: '0.08em', weight: 700 },
    texture: 'paper-grain', transition: 'speed', easing: 'elastic.out(1, 0.5)', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.85 },
    divider: 'lightning', cursor: 'ripple', loader: 'flash-step', sfx: 'lightning', scrollbar: '#facc15'
  },
  mizuiro: {
    palette: { bg: '#040d16', ink: '#f0f9ff', accent: '#38bdf8', alt: '#0284c7', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 600 },
    texture: 'scanlines', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'hexagon', cursor: 'reticle', loader: 'kido-circle', sfx: 'kido', scrollbar: '#38bdf8'
  },
  kon: {
    palette: { bg: '#130802', ink: '#fff7ed', accent: '#f97316', alt: '#ea580c', glow: 'rgba(249, 115, 22, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'speed', easing: 'back.out(1.6)', rhythm: { revealStyle: 'slam', durationScale: 0.8 },
    divider: 'torn-paper', cursor: 'fist', loader: 'flash-step', sfx: 'blades', scrollbar: '#f97316'
  },
  ryuken: {
    palette: { bg: '#080c14', ink: '#f1f5f9', accent: '#94a3b8', alt: '#475569', glow: 'rgba(148, 163, 184, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'scanlines', transition: 'quincy', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'lightning', cursor: 'reticle', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#94a3b8'
  },
  ginjo: {
    palette: { bg: '#041208', ink: '#f0fdf4', accent: '#15803d', alt: '#166534', glow: 'rgba(21, 128, 61, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'cracked-stone', transition: 'blades', easing: 'power4.inOut', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#15803d'
  },
  tsukishima: {
    palette: { bg: '#0f0c04', ink: '#fefce8', accent: '#ca8a04', alt: '#854d0e', glow: 'rgba(202, 138, 4, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'paper-grain', transition: 'illusion', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'torn-paper', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#ca8a04'
  },
  riruka: {
    palette: { bg: '#14040a', ink: '#fff1f2', accent: '#f43f5e', alt: '#be123c', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Playfair Display', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'starfield', transition: 'illusion', easing: 'back.out(1.4)', rhythm: { revealStyle: 'fade-rise', durationScale: 1.0 },
    divider: 'petal-curve', cursor: 'petal', loader: 'shield-hex', sfx: 'shield', scrollbar: '#f43f5e'
  },
  yukio: {
    palette: { bg: '#031208', ink: '#ecfdf5', accent: '#10b981', alt: '#047857', glow: 'rgba(16, 185, 129, 0.45)' },
    type: { display: 'Orbitron', body: 'Inter', kanjiStyle: 'outline', tracking: '0.16em', weight: 700 },
    texture: 'scanlines', transition: 'kido', easing: 'steps(8)', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.9 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'kido', scrollbar: '#10b981'
  },
  jackie: {
    palette: { bg: '#100a04', ink: '#fef3c7', accent: '#b45309', alt: '#78350f', glow: 'rgba(180, 83, 9, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.5)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#b45309'
  },
  giriko: {
    palette: { bg: '#100c02', ink: '#fef9c3', accent: '#eab308', alt: '#a16207', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'starfield', transition: 'kido', easing: 'power3.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'kido', scrollbar: '#eab308'
  },

  // === GOTEI 13 ===
  yamamoto: {
    palette: { bg: '#140301', ink: '#fdf0ee', accent: '#ea580c', alt: '#b91c1c', glow: 'rgba(234, 88, 12, 0.5)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'fire', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'blade', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#ea580c'
  },
  sasakibe: {
    palette: { bg: '#0f0c02', ink: '#fef9c3', accent: '#eab308', alt: '#ca8a04', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'lightning', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning', cursor: 'lightning', loader: 'flash-step', sfx: 'lightning', scrollbar: '#eab308'
  },
  soifon: {
    palette: { bg: '#0c0b02', ink: '#fefce8', accent: '#eab308', alt: '#a16207', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.75 },
    divider: 'lightning', cursor: 'lightning', loader: 'flash-step', sfx: 'lightning', scrollbar: '#eab308'
  },
  omaeda: {
    palette: { bg: '#120b02', ink: '#fef3c7', accent: '#d97706', alt: '#92400e', glow: 'rgba(217, 119, 6, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.3)', rhythm: { revealStyle: 'slam', durationScale: 1.0 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#d97706'
  },
  gin: {
    palette: { bg: '#06080e', ink: '#eef3fc', accent: '#60a5fa', alt: '#1d4ed8', glow: 'rgba(96, 165, 250, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'paper-grain', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'slash', cursor: 'blade', loader: 'flash-step', sfx: 'slash', scrollbar: '#60a5fa'
  },
  kira: {
    palette: { bg: '#0f0a04', ink: '#fef3c7', accent: '#a16207', alt: '#713f12', glow: 'rgba(161, 98, 7, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 600 },
    texture: 'ink-wash', transition: 'gravity', easing: 'power3.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'torn-paper', cursor: 'blade', loader: 'singularity', sfx: 'earth', scrollbar: '#a16207'
  },
  unohana: {
    palette: { bg: '#060e18', ink: '#f0f8ff', accent: '#38bdf8', alt: '#dc2626', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'ink-wash', transition: 'water', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.25 },
    divider: 'petal-curve', cursor: 'blade', loader: 'water-swirl', sfx: 'water', scrollbar: '#38bdf8'
  },
  isane: {
    palette: { bg: '#041018', ink: '#f0f9ff', accent: '#06b6d4', alt: '#0891b2', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 600 },
    texture: 'frost-noise', transition: 'ice', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'ice-edge', cursor: 'snowflake', loader: 'frost-circle', sfx: 'ice', scrollbar: '#06b6d4'
  },
  aizen: {
    palette: { bg: '#0c0716', ink: '#f3eefb', accent: '#a855f7', alt: '#6b21a8', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 800 },
    texture: 'mirror-shards', transition: 'aizen', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'crack-line', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#a855f7'
  },
  hinamori: {
    palette: { bg: '#14040a', ink: '#fff1f2', accent: '#f43f5e', alt: '#e11d48', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Playfair Display', body: 'Plus Jakarta Sans', kanjiStyle: 'outline', tracking: '0.08em', weight: 700 },
    texture: 'starfield', transition: 'fire', easing: 'power2.inOut', rhythm: { revealStyle: 'fade-rise', durationScale: 1.05 },
    divider: 'petal-curve', cursor: 'petal', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#f43f5e'
  },
  byakuya: {
    palette: { bg: '#100612', ink: '#faebf9', accent: '#ec4899', alt: '#f472b6', glow: 'rgba(236, 72, 153, 0.45)' },
    type: { display: 'Cinzel', body: 'Cormorant Garamond', kanjiStyle: 'thin', tracking: '0.16em', weight: 700 },
    texture: 'sakura-silk', transition: 'byakuya', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'petal-curve', cursor: 'petal', loader: 'petal-scatter', sfx: 'petals', scrollbar: '#ec4899'
  },
  renji: {
    palette: { bg: '#120404', ink: '#fbeeee', accent: '#ef4444', alt: '#b91c1c', glow: 'rgba(239, 68, 68, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'renji', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 1.0 },
    divider: 'chain-link', cursor: 'chain-link', loader: 'chain-whip', sfx: 'blades', scrollbar: '#ef4444'
  },
  komamura: {
    palette: { bg: '#120702', ink: '#fef2f2', accent: '#ea580c', alt: '#7c2d12', glow: 'rgba(234, 88, 12, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Inter', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.5)', rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#ea580c'
  },
  iba: {
    palette: { bg: '#100a04', ink: '#fef3c7', accent: '#d97706', alt: '#78350f', glow: 'rgba(217, 119, 6, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone', transition: 'blades', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#d97706'
  },
  shunsui: {
    palette: { bg: '#0d0411', ink: '#faeffa', accent: '#d946ef', alt: '#86198f', glow: 'rgba(217, 70, 239, 0.45)' },
    type: { display: 'Shippori Mincho', body: 'Inter', kanjiStyle: 'brush', tracking: '0.12em', weight: 600 },
    texture: 'sakura-silk', transition: 'shadow', easing: 'power3.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'shadow', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#d946ef'
  },
  nanao: {
    palette: { bg: '#040d18', ink: '#f0f9ff', accent: '#38bdf8', alt: '#1e40af', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'mirror-shards', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'hexagon', cursor: 'ripple', loader: 'kido-circle', sfx: 'kido', scrollbar: '#38bdf8'
  },
  tosen: {
    palette: { bg: '#080512', ink: '#ede9fe', accent: '#7c3aed', alt: '#4c1d95', glow: 'rgba(124, 58, 237, 0.45)' },
    type: { display: 'Shippori Mincho', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'ink-wash', transition: 'shadow', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'torn-paper', cursor: 'shadow', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#7c3aed'
  },
  hisagi: {
    palette: { bg: '#120601', ink: '#fff7ed', accent: '#f97316', alt: '#c2410c', glow: 'rgba(249, 115, 22, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'blades', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'chain-link', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#f97316'
  },
  toshiro: {
    palette: { bg: '#040d18', ink: '#eaf4fd', accent: '#38bdf8', alt: '#0284c7', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'frost-noise', transition: 'toshiro', easing: 'power3.out', rhythm: { revealStyle: 'stagger-chars', durationScale: 1.0 },
    divider: 'ice-edge', cursor: 'snowflake', loader: 'ice-pillar', sfx: 'ice', scrollbar: '#38bdf8'
  },
  matsumoto: {
    palette: { bg: '#120803', ink: '#fff7ed', accent: '#fb923c', alt: '#ea580c', glow: 'rgba(251, 146, 60, 0.45)' },
    type: { display: 'Playfair Display', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'ink-wash', transition: 'speed', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'petal', loader: 'water-swirl', sfx: 'petals', scrollbar: '#fb923c'
  },
  kenpachi: {
    palette: { bg: '#100502', ink: '#fcece9', accent: '#ea580c', alt: '#7c2d12', glow: 'rgba(234, 88, 12, 0.5)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.04em', weight: 900 },
    texture: 'cracked-stone', transition: 'kenpachi', easing: 'steps(6)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'torn-paper', cursor: 'blade', loader: 'claw-tear', sfx: 'blades', scrollbar: '#ea580c'
  },
  yachiru: {
    palette: { bg: '#14040c', ink: '#fdf2f8', accent: '#f472b6', alt: '#db2777', glow: 'rgba(244, 114, 182, 0.45)' },
    type: { display: 'Playfair Display', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'starfield', transition: 'speed', easing: 'back.out(1.5)', rhythm: { revealStyle: 'fade-rise', durationScale: 0.9 },
    divider: 'petal-curve', cursor: 'fist', loader: 'flash-step', sfx: 'blades', scrollbar: '#f472b6'
  },
  ikkaku: {
    palette: { bg: '#120404', ink: '#fef2f2', accent: '#dc2626', alt: '#991b1b', glow: 'rgba(220, 38, 38, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 900 },
    texture: 'halftone', transition: 'blades', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#dc2626'
  },
  yumichika: {
    palette: { bg: '#0b0514', ink: '#f5f3ff', accent: '#8b5cf6', alt: '#6d28d9', glow: 'rgba(139, 92, 246, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 700 },
    texture: 'starfield', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'petal-curve', cursor: 'petal', loader: 'kido-circle', sfx: 'petals', scrollbar: '#8b5cf6'
  },
  mayuri: {
    palette: { bg: '#041208', ink: '#e8fde9', accent: '#22c55e', alt: '#a855f7', glow: 'rgba(34, 197, 94, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'speed', easing: 'steps(8)', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.9 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'kido', scrollbar: '#22c55e'
  },
  nemu: {
    palette: { bg: '#0a0514', ink: '#faf5ff', accent: '#c084fc', alt: '#7c3aed', glow: 'rgba(192, 132, 252, 0.45)' },
    type: { display: 'Inter', body: 'Inter', kanjiStyle: 'thin', tracking: '0.1em', weight: 600 },
    texture: 'scanlines', transition: 'kido', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.05 },
    divider: 'hexagon', cursor: 'ripple', loader: 'singularity', sfx: 'kido', scrollbar: '#c084fc'
  },
  ukitake: {
    palette: { bg: '#040e18', ink: '#f0f9ff', accent: '#0ea5e9', alt: '#0369a1', glow: 'rgba(14, 165, 233, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 700 },
    texture: 'ink-wash', transition: 'water', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'petal-curve', cursor: 'ripple', loader: 'water-swirl', sfx: 'water', scrollbar: '#0ea5e9'
  },
  rukia: {
    palette: { bg: '#050c18', ink: '#eef8ff', accent: '#72d6ff', alt: '#ffffff', glow: 'rgba(114, 214, 255, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 600 },
    texture: 'frost-noise', transition: 'rukia', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'ice-edge', cursor: 'snowflake', loader: 'frost-circle', sfx: 'ice', scrollbar: '#72d6ff'
  },
  kaien: {
    palette: { bg: '#030d17', ink: '#f0f9ff', accent: '#0284c7', alt: '#075985', glow: 'rgba(2, 132, 199, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'ink-wash', transition: 'water', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'slash', cursor: 'blade', loader: 'water-swirl', sfx: 'water', scrollbar: '#0284c7'
  },
  hanataro: {
    palette: { bg: '#03120a', ink: '#ecfdf5', accent: '#10b981', alt: '#059669', glow: 'rgba(16, 185, 129, 0.45)' },
    type: { display: 'Inter', body: 'Inter', kanjiStyle: 'outline', tracking: '0.08em', weight: 600 },
    texture: 'paper-grain', transition: 'kido', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.1 },
    divider: 'torn-paper', cursor: 'blade', loader: 'kido-circle', sfx: 'kido', scrollbar: '#10b981'
  },
  akon: {
    palette: { bg: '#04120f', ink: '#f0fdfa', accent: '#14b8a6', alt: '#0f766e', glow: 'rgba(20, 184, 166, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.95 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'kido', scrollbar: '#14b8a6'
  },
  kiyone: {
    palette: { bg: '#06101e', ink: '#f0f9ff', accent: '#0284c7', alt: '#38bdf8', glow: 'rgba(2, 132, 199, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'frost-noise', transition: 'ice', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'ice-edge', cursor: 'petal', loader: 'water-swirl', sfx: 'water', scrollbar: '#0284c7'
  },
  sentaro: {
    palette: { bg: '#140802', ink: '#fff7ed', accent: '#ea580c', alt: '#9a3412', glow: 'rgba(234, 88, 12, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone', transition: 'blades', easing: 'back.out(1.4)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'fist', loader: 'shockwave', sfx: 'slash', scrollbar: '#ea580c'
  },

  // === URAHARA SHOP & SHIHOIN CLAN ===
  urahara: {
    palette: { bg: '#04120a', ink: '#ecfaee', accent: '#10b981', alt: '#059669', glow: 'rgba(16, 185, 129, 0.45)' },
    type: { display: 'Shippori Mincho', body: 'Inter', kanjiStyle: 'brush', tracking: '0.08em', weight: 600 },
    texture: 'paper-grain', transition: 'urahara', easing: 'elastic.out(1, 0.6)', rhythm: { revealStyle: 'wipe', durationScale: 1.0 },
    divider: 'torn-paper', cursor: 'blade', loader: 'fan-sweep', sfx: 'kido', scrollbar: '#10b981'
  },
  yoruichi: {
    palette: { bg: '#14061a', ink: '#faeefc', accent: '#c084fc', alt: '#e879f9', glow: 'rgba(192, 132, 252, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone', transition: 'yoruichi', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning', cursor: 'lightning', loader: 'flash-step', sfx: 'lightning', scrollbar: '#c084fc'
  },
  yushiro: {
    palette: { bg: '#140510', ink: '#fdf2f8', accent: '#e879f9', alt: '#c084fc', glow: 'rgba(232, 121, 249, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'halftone', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'lightning', cursor: 'lightning', loader: 'flash-step', sfx: 'lightning', scrollbar: '#e879f9'
  },
  tessai: {
    palette: { bg: '#060714', ink: '#eef2ff', accent: '#6366f1', alt: '#4338ca', glow: 'rgba(99, 102, 241, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'solid', tracking: '0.14em', weight: 800 },
    texture: 'starfield', transition: 'kido', easing: 'power3.inOut', rhythm: { revealStyle: 'slam', durationScale: 1.1 },
    divider: 'hexagon', cursor: 'reticle', loader: 'kido-circle', sfx: 'kido', scrollbar: '#6366f1'
  },
  jinta: {
    palette: { bg: '#120404', ink: '#fee2e2', accent: '#ef4444', alt: '#b91c1c', glow: 'rgba(239, 68, 68, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.5)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#ef4444'
  },
  ururu: {
    palette: { bg: '#140409', ink: '#ffe4e6', accent: '#f43f5e', alt: '#be123c', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'speed', easing: 'power4.out', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'reticle', loader: 'singularity', sfx: 'blades', scrollbar: '#f43f5e'
  },

  // === VISORED ===
  shinji: {
    palette: { bg: '#120f04', ink: '#f5e8be', accent: '#eab308', alt: '#ca8a04', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 700 },
    texture: 'mirror-shards', transition: 'illusion', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'crack-line', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#eab308'
  },
  hiyori: {
    palette: { bg: '#120601', ink: '#fff7ed', accent: '#f97316', alt: '#c2410c', glow: 'rgba(249, 115, 22, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'torn-paper', transition: 'blades', easing: 'steps(5)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'claw-tear', sfx: 'slash', scrollbar: '#f97316'
  },
  love: {
    palette: { bg: '#120303', ink: '#fee2e2', accent: '#dc2626', alt: '#991b1b', glow: 'rgba(220, 38, 38, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone', transition: 'fire', easing: 'back.out(1.4)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#dc2626'
  },
  rose: {
    palette: { bg: '#100a02', ink: '#fefce8', accent: '#fbbf24', alt: '#d97706', glow: 'rgba(251, 191, 36, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'sakura-silk', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'chain-link', cursor: 'petal', loader: 'kido-circle', sfx: 'petals', scrollbar: '#fbbf24'
  },
  kensei: {
    palette: { bg: '#120701', ink: '#ffedd5', accent: '#ea580c', alt: '#9a3412', glow: 'rgba(234, 88, 12, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'cracked-stone', transition: 'speed', easing: 'back.out(1.5)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#ea580c'
  },
  mashiro: {
    palette: { bg: '#081203', ink: '#f7fee7', accent: '#84cc16', alt: '#65a30d', glow: 'rgba(132, 204, 22, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.75 },
    divider: 'lightning', cursor: 'fist', loader: 'flash-step', sfx: 'lightning', scrollbar: '#84cc16'
  },
  hachi: {
    palette: { bg: '#12040b', ink: '#fdf2f8', accent: '#ec4899', alt: '#db2777', glow: 'rgba(236, 72, 153, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'starfield', transition: 'kido', easing: 'power3.inOut', rhythm: { revealStyle: 'fade-rise', durationScale: 1.1 },
    divider: 'hexagon', cursor: 'reticle', loader: 'shield-hex', sfx: 'kido', scrollbar: '#ec4899'
  },
  lisa: {
    palette: { bg: '#041014', ink: '#ecfeff', accent: '#06b6d4', alt: '#0e7490', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'paper-grain', transition: 'blades', easing: 'power4.out', rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#06b6d4'
  },

  // === ARRANCAR & ESPADA ===
  starrk: {
    palette: { bg: '#040d16', ink: '#f0f9ff', accent: '#38bdf8', alt: '#0284c7', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 700 },
    texture: 'scanlines', transition: 'speed', easing: 'power3.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'lightning', cursor: 'reticle', loader: 'flash-step', sfx: 'arrows', scrollbar: '#38bdf8'
  },
  barragan: {
    palette: { bg: '#0a0514', ink: '#faf5ff', accent: '#a855f7', alt: '#7e22ce', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'solid', tracking: '0.16em', weight: 800 },
    texture: 'ink-wash', transition: 'shadow', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.3 },
    divider: 'torn-paper', cursor: 'shadow', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#a855f7'
  },
  harribel: {
    palette: { bg: '#030f16', ink: '#ecfeff', accent: '#06b6d4', alt: '#0891b2', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'ink-wash', transition: 'water', easing: 'power3.inOut', rhythm: { revealStyle: 'slam', durationScale: 1.0 },
    divider: 'petal-curve', cursor: 'blade', loader: 'water-swirl', sfx: 'water', scrollbar: '#06b6d4'
  },
  ulquiorra: {
    palette: { bg: '#040a08', ink: '#eefaf4', accent: '#10b981', alt: '#064e3b', glow: 'rgba(16, 185, 129, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.16em', weight: 700 },
    texture: 'paper-grain', transition: 'hollow', easing: 'power3.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.3 },
    divider: 'crack-line', cursor: 'shadow', loader: 'cero-flare', sfx: 'hollow', scrollbar: '#10b981'
  },
  nnoitra: {
    palette: { bg: '#120602', ink: '#fff7ed', accent: '#ea580c', alt: '#c2410c', glow: 'rgba(234, 88, 12, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'cracked-stone', transition: 'blades', easing: 'steps(5)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'claw-tear', sfx: 'slash', scrollbar: '#ea580c'
  },
  grimmjow: {
    palette: { bg: '#030d17', ink: '#e8f7ff', accent: '#06b6d4', alt: '#0891b2', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'cracked-stone', transition: 'hollow', easing: 'back.out(1.5)', rhythm: { revealStyle: 'slam', durationScale: 0.8 },
    divider: 'slash', cursor: 'fist', loader: 'cero-flare', sfx: 'hollow', scrollbar: '#06b6d4'
  },
  zommari: {
    palette: { bg: '#0c0514', ink: '#f5f3ff', accent: '#8b5cf6', alt: '#6d28d9', glow: 'rgba(139, 92, 246, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 700 },
    texture: 'starfield', transition: 'illusion', easing: 'power3.inOut', rhythm: { revealStyle: 'fade-rise', durationScale: 1.15 },
    divider: 'hexagon', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#8b5cf6'
  },
  szayelaporro: {
    palette: { bg: '#120412', ink: '#fdf4ff', accent: '#d946ef', alt: '#a21caf', glow: 'rgba(217, 70, 239, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'stagger-chars', durationScale: 1.0 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'kido', scrollbar: '#d946ef'
  },
  aaroniero: {
    palette: { bg: '#080a10', ink: '#f1f5f9', accent: '#64748b', alt: '#334155', glow: 'rgba(100, 116, 139, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'ink-wash', transition: 'hollow', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.25 },
    divider: 'torn-paper', cursor: 'shadow', loader: 'cero-flare', sfx: 'hollow', scrollbar: '#64748b'
  },
  yammy: {
    palette: { bg: '#140303', ink: '#fee2e2', accent: '#dc2626', alt: '#991b1b', glow: 'rgba(220, 38, 38, 0.5)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 900 },
    texture: 'cracked-stone', transition: 'hollow', easing: 'back.out(1.6)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'crack-line', cursor: 'fist', loader: 'cero-flare', sfx: 'hollow', scrollbar: '#dc2626'
  },
  nelliel: {
    palette: { bg: '#031209', ink: '#ecfdf5', accent: '#10b981', alt: '#047857', glow: 'rgba(16, 185, 129, 0.45)' },
    type: { display: 'Playfair Display', body: 'Inter', kanjiStyle: 'outline', tracking: '0.08em', weight: 700 },
    texture: 'starfield', transition: 'speed', easing: 'power3.out', rhythm: { revealStyle: 'wipe', durationScale: 0.95 },
    divider: 'slash', cursor: 'blade', loader: 'flash-step', sfx: 'blades', scrollbar: '#10b981'
  },
  dordoni: {
    palette: { bg: '#120404', ink: '#fee2e2', accent: '#ef4444', alt: '#b91c1c', glow: 'rgba(239, 68, 68, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'speed', easing: 'back.out(1.4)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'blade', loader: 'flash-step', sfx: 'blades', scrollbar: '#ef4444'
  },
  cirucci: {
    palette: { bg: '#0c0514', ink: '#faf5ff', accent: '#c084fc', alt: '#7c3aed', glow: 'rgba(192, 132, 252, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'sakura-silk', transition: 'blades', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'blade', loader: 'petal-scatter', sfx: 'petals', scrollbar: '#c084fc'
  },
  gantenbainne: {
    palette: { bg: '#100e02', ink: '#fefce8', accent: '#facc15', alt: '#ca8a04', glow: 'rgba(250, 204, 21, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone', transition: 'lightning', easing: 'expo.out', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'lightning', cursor: 'fist', loader: 'flash-step', sfx: 'lightning', scrollbar: '#facc15'
  },
  apacci: {
    palette: { bg: '#120601', ink: '#fff7ed', accent: '#f97316', alt: '#c2410c', glow: 'rgba(249, 115, 22, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 800 },
    texture: 'cracked-stone', transition: 'hollow', easing: 'steps(5)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'claw-tear', sfx: 'hollow', scrollbar: '#f97316'
  },
  milarose: {
    palette: { bg: '#120c02', ink: '#fefce8', accent: '#eab308', alt: '#a16207', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'earth', easing: 'back.out(1.3)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#eab308'
  },
  sunsun: {
    palette: { bg: '#03120f', ink: '#f0fdfa', accent: '#14b8a6', alt: '#0f766e', glow: 'rgba(20, 184, 166, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'ink-wash', transition: 'water', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'petal-curve', cursor: 'ripple', loader: 'water-swirl', sfx: 'water', scrollbar: '#14b8a6'
  },
  luppi: {
    palette: { bg: '#040d16', ink: '#f0f9ff', accent: '#38bdf8', alt: '#0284c7', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'scanlines', transition: 'blades', easing: 'power3.out', rhythm: { revealStyle: 'wipe', durationScale: 0.9 },
    divider: 'chain-link', cursor: 'blade', loader: 'chain-whip', sfx: 'slash', scrollbar: '#38bdf8'
  },
  shawlong: {
    palette: { bg: '#031208', ink: '#ecfdf5', accent: '#059669', alt: '#047857', glow: 'rgba(5, 150, 105, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'scanlines', transition: 'blades', easing: 'power4.out', rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#059669'
  },
  wonderweiss: {
    palette: { bg: '#080512', ink: '#ede9fe', accent: '#7c3aed', alt: '#4c1d95', glow: 'rgba(124, 58, 237, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'ink-wash', transition: 'hollow', easing: 'power4.inOut', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'crack-line', cursor: 'fist', loader: 'cero-flare', sfx: 'hollow', scrollbar: '#7c3aed'
  },
  lilynette: {
    palette: { bg: '#040d18', ink: '#f0f9ff', accent: '#60a5fa', alt: '#2563eb', glow: 'rgba(96, 165, 250, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'speed', easing: 'power2.out', rhythm: { revealStyle: 'wipe', durationScale: 0.9 },
    divider: 'lightning', cursor: 'reticle', loader: 'flash-step', sfx: 'arrows', scrollbar: '#60a5fa'
  },
  charlotte: {
    palette: { bg: '#140410', ink: '#fdf2f8', accent: '#f43f5e', alt: '#be123c', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Playfair Display', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'sakura-silk', transition: 'blades', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'petal', loader: 'petal-scatter', sfx: 'petals', scrollbar: '#f43f5e'
  },

  // === WANDENREICH (QUINCY) ===
  yhwach: {
    palette: { bg: '#080602', ink: '#fef9ee', accent: '#f59e0b', alt: '#78350f', glow: 'rgba(245, 158, 11, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'solid', tracking: '0.14em', weight: 800 },
    texture: 'ink-wash', transition: 'shadow', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.25 },
    divider: 'torn-paper', cursor: 'shadow', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#f59e0b'
  },
  haschwalth: {
    palette: { bg: '#06080f', ink: '#f1f5f9', accent: '#fbbf24', alt: '#94a3b8', glow: 'rgba(251, 191, 36, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.16em', weight: 700 },
    texture: 'scanlines', transition: 'quincy', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.85 },
    divider: 'lightning', cursor: 'reticle', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#fbbf24'
  },
  gerard: {
    palette: { bg: '#140303', ink: '#fee2e2', accent: '#ef4444', alt: '#991b1b', glow: 'rgba(239, 68, 68, 0.5)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 900 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.6)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#ef4444'
  },
  lille: {
    palette: { bg: '#040d18', ink: '#f0f9ff', accent: '#38bdf8', alt: '#1d4ed8', glow: 'rgba(56, 189, 248, 0.45)' },
    type: { display: 'Rajdhani', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'scanlines', transition: 'quincy', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning', cursor: 'reticle', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#38bdf8'
  },
  pernida: {
    palette: { bg: '#0c0514', ink: '#faf5ff', accent: '#a855f7', alt: '#7e22ce', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.12em', weight: 700 },
    texture: 'ink-wash', transition: 'kido', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'chain-link', cursor: 'ripple', loader: 'singularity', sfx: 'kido', scrollbar: '#a855f7'
  },
  askin: {
    palette: { bg: '#081203', ink: '#f7fee7', accent: '#84cc16', alt: '#4d7c0f', glow: 'rgba(132, 204, 22, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'hexagon', cursor: 'ripple', loader: 'singularity', sfx: 'kido', scrollbar: '#84cc16'
  },
  'bazz-b': {
    palette: { bg: '#120401', ink: '#faece9', accent: '#f97316', alt: '#c2410c', glow: 'rgba(249, 115, 22, 0.5)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'halftone', transition: 'fire', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#f97316'
  },
  bambietta: {
    palette: { bg: '#140409', ink: '#fff1f2', accent: '#f43f5e', alt: '#be123c', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'starfield', transition: 'fire', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'crack-line', cursor: 'reticle', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#f43f5e'
  },
  candice: {
    palette: { bg: '#031016', ink: '#ecfeff', accent: '#06b6d4', alt: '#0891b2', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'halftone', transition: 'lightning', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning', cursor: 'lightning', loader: 'flash-step', sfx: 'lightning', scrollbar: '#06b6d4'
  },
  giselle: {
    palette: { bg: '#140407', ink: '#ffe4e6', accent: '#e11d48', alt: '#881337', glow: 'rgba(225, 29, 72, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'thin', tracking: '0.12em', weight: 700 },
    texture: 'ink-wash', transition: 'shadow', easing: 'power3.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'torn-paper', cursor: 'ripple', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#e11d48'
  },
  meninas: {
    palette: { bg: '#14040c', ink: '#fdf2f8', accent: '#ec4899', alt: '#be185d', glow: 'rgba(236, 72, 153, 0.45)' },
    type: { display: 'Playfair Display', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.5)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#ec4899'
  },
  liltotto: {
    palette: { bg: '#100a02', ink: '#fefce8', accent: '#fbbf24', alt: '#b45309', glow: 'rgba(251, 191, 36, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'paper-grain', transition: 'blades', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'torn-paper', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#fbbf24'
  },
  quilge: {
    palette: { bg: '#060914', ink: '#eff6ff', accent: '#60a5fa', alt: '#2563eb', glow: 'rgba(96, 165, 250, 0.45)' },
    type: { display: 'Rajdhani', body: 'Inter', kanjiStyle: 'outline', tracking: '0.14em', weight: 700 },
    texture: 'scanlines', transition: 'quincy', easing: 'power3.inOut', rhythm: { revealStyle: 'wipe', durationScale: 0.9 },
    divider: 'chain-link', cursor: 'reticle', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#60a5fa'
  },
  gremmy: {
    palette: { bg: '#0b0514', ink: '#faf5ff', accent: '#c084fc', alt: '#7e22ce', glow: 'rgba(192, 132, 252, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'starfield', transition: 'illusion', easing: 'power4.inOut', rhythm: { revealStyle: 'fade-rise', durationScale: 1.15 },
    divider: 'hexagon', cursor: 'ripple', loader: 'singularity', sfx: 'illusion', scrollbar: '#c084fc'
  },
  'loyd-royd': {
    palette: { bg: '#080c12', ink: '#f1f5f9', accent: '#94a3b8', alt: '#475569', glow: 'rgba(148, 163, 184, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'mirror-shards', transition: 'illusion', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'crack-line', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#94a3b8'
  },
  'as-nodt': {
    palette: { bg: '#090312', ink: '#faf5ff', accent: '#6b21a8', alt: '#3b0764', glow: 'rgba(107, 33, 168, 0.45)' },
    type: { display: 'Shippori Mincho', body: 'Inter', kanjiStyle: 'brush', tracking: '0.14em', weight: 700 },
    texture: 'ink-wash', transition: 'shadow', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.3 },
    divider: 'torn-paper', cursor: 'shadow', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#6b21a8'
  },
  bg9: {
    palette: { bg: '#031208', ink: '#ecfdf5', accent: '#10b981', alt: '#047857', glow: 'rgba(16, 185, 129, 0.45)' },
    type: { display: 'Orbitron', body: 'Inter', kanjiStyle: 'solid', tracking: '0.16em', weight: 800 },
    texture: 'scanlines', transition: 'speed', easing: 'steps(8)', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.85 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'arrows', scrollbar: '#10b981'
  },
  'cang-du': {
    palette: { bg: '#090c10', ink: '#f8fafc', accent: '#cbd5e1', alt: '#475569', glow: 'rgba(203, 213, 225, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 800 },
    texture: 'cracked-stone', transition: 'earth', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#cbd5e1'
  },
  mask: {
    palette: { bg: '#120902', ink: '#fefce8', accent: '#eab308', alt: '#b45309', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'starfield', transition: 'earth', easing: 'back.out(1.6)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#eab308'
  },
  pepe: {
    palette: { bg: '#12040b', ink: '#fdf2f8', accent: '#f472b6', alt: '#db2777', glow: 'rgba(244, 114, 182, 0.45)' },
    type: { display: 'Playfair Display', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'starfield', transition: 'illusion', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#f472b6'
  },
  robert: {
    palette: { bg: '#0a0d14', ink: '#f1f5f9', accent: '#64748b', alt: '#334155', glow: 'rgba(100, 116, 139, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'scanlines', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning', cursor: 'reticle', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#64748b'
  },
  driscoll: {
    palette: { bg: '#140303', ink: '#fee2e2', accent: '#dc2626', alt: '#7f1d1d', glow: 'rgba(220, 38, 38, 0.5)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'cracked-stone', transition: 'blades', easing: 'steps(5)', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'fist', loader: 'claw-tear', sfx: 'blades', scrollbar: '#dc2626'
  },
  nanana: {
    palette: { bg: '#100b02', ink: '#fefce8', accent: '#eab308', alt: '#713f12', glow: 'rgba(234, 179, 8, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'scanlines', transition: 'kido', easing: 'power3.inOut', rhythm: { revealStyle: 'stagger-chars', durationScale: 0.95 },
    divider: 'hexagon', cursor: 'reticle', loader: 'singularity', sfx: 'kido', scrollbar: '#eab308'
  },
  berenice: {
    palette: { bg: '#0c0d10', ink: '#f4f4f5', accent: '#a1a1aa', alt: '#52525b', glow: 'rgba(161, 161, 170, 0.45)' },
    type: { display: 'Cormorant Garamond', body: 'Inter', kanjiStyle: 'thin', tracking: '0.14em', weight: 600 },
    texture: 'paper-grain', transition: 'kido', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'torn-paper', cursor: 'ripple', loader: 'kido-circle', sfx: 'kido', scrollbar: '#a1a1aa'
  },
  jerome: {
    palette: { bg: '#120802', ink: '#fef3c7', accent: '#d97706', alt: '#78350f', glow: 'rgba(217, 119, 6, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 800 },
    texture: 'cracked-stone', transition: 'earth', easing: 'back.out(1.4)', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'crack-line', cursor: 'fist', loader: 'shockwave', sfx: 'earth', scrollbar: '#d97706'
  },
  nianzol: {
    palette: { bg: '#0b0514', ink: '#f5f3ff', accent: '#8b5cf6', alt: '#5b21b6', glow: 'rgba(139, 92, 246, 0.45)' },
    type: { display: 'Syne', body: 'Inter', kanjiStyle: 'outline', tracking: '0.12em', weight: 700 },
    texture: 'mirror-shards', transition: 'speed', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.15 },
    divider: 'petal-curve', cursor: 'ripple', loader: 'mirror-shatter', sfx: 'illusion', scrollbar: '#8b5cf6'
  },
  shaz: {
    palette: { bg: '#120b02', ink: '#fffbeb', accent: '#f59e0b', alt: '#b45309', glow: 'rgba(245, 158, 11, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.1em', weight: 700 },
    texture: 'halftone', transition: 'speed', easing: 'expo.out', rhythm: { revealStyle: 'wipe', durationScale: 0.8 },
    divider: 'lightning', cursor: 'blade', loader: 'flash-step', sfx: 'blades', scrollbar: '#f59e0b'
  },

  // === ROYAL GUARD / ZERO DIVISION ===
  ichibei: {
    palette: { bg: '#0a0804', ink: '#fcf8ed', accent: '#d97706', alt: '#18181b', glow: 'rgba(217, 119, 6, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Shippori Mincho', kanjiStyle: 'brush', tracking: '0.08em', weight: 900 },
    texture: 'ink-wash', transition: 'shadow', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 1.1 },
    divider: 'torn-paper', cursor: 'blade', loader: 'shadow-engulf', sfx: 'shadow', scrollbar: '#d97706'
  },
  kirinji: {
    palette: { bg: '#140303', ink: '#fee2e2', accent: '#dc2626', alt: '#facc15', glow: 'rgba(220, 38, 38, 0.5)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.08em', weight: 900 },
    texture: 'ink-wash', transition: 'water', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'slash', cursor: 'blade', loader: 'water-swirl', sfx: 'water', scrollbar: '#dc2626'
  },
  shutara: {
    palette: { bg: '#12040b', ink: '#fdf2f8', accent: '#ec4899', alt: '#e2e8f0', glow: 'rgba(236, 72, 153, 0.45)' },
    type: { display: 'Cinzel', body: 'Cormorant Garamond', kanjiStyle: 'thin', tracking: '0.16em', weight: 700 },
    texture: 'sakura-silk', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.2 },
    divider: 'chain-link', cursor: 'blade', loader: 'petal-scatter', sfx: 'petals', scrollbar: '#ec4899'
  },
  nimaiya: {
    palette: { bg: '#120601', ink: '#fff7ed', accent: '#ea580c', alt: '#38bdf8', glow: 'rgba(234, 88, 12, 0.5)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 900 },
    texture: 'halftone', transition: 'blades', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'blade', loader: 'getsuga-cut', sfx: 'slash', scrollbar: '#ea580c'
  },
  hikifune: {
    palette: { bg: '#0f0514', ink: '#faf5ff', accent: '#a855f7', alt: '#facc15', glow: 'rgba(168, 85, 247, 0.45)' },
    type: { display: 'Playfair Display', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 700 },
    texture: 'starfield', transition: 'kido', easing: 'power2.inOut', rhythm: { revealStyle: 'fade-rise', durationScale: 1.1 },
    divider: 'petal-curve', cursor: 'petal', loader: 'shield-hex', sfx: 'kido', scrollbar: '#a855f7'
  },
  reio: {
    palette: { bg: '#040d18', ink: '#f0f9ff', accent: '#38bdf8', alt: '#fbbf24', glow: 'rgba(56, 189, 248, 0.5)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.18em', weight: 800 },
    texture: 'starfield', transition: 'kido', easing: 'power4.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.3 },
    divider: 'hexagon', cursor: 'ripple', loader: 'singularity', sfx: 'kido', scrollbar: '#38bdf8'
  },
  'asnodt': {
    palette: { bg: '#090510', ink: '#f3e8ff', accent: '#9333ea', alt: '#6b21a8', glow: 'rgba(147, 51, 234, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'outline', tracking: '0.1em', weight: 800 },
    texture: 'cracked-stone', transition: 'shadow', easing: 'power4.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'flame', cursor: 'needle', loader: 'hollow-mask', sfx: 'shadow', scrollbar: '#9333ea'
  },
  'robert': {
    palette: { bg: '#0c0e14', ink: '#f8fafc', accent: '#3b82f6', alt: '#1d4ed8', glow: 'rgba(59, 130, 246, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'halftone', transition: 'light-arrows', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.0 },
    divider: 'zigzag', cursor: 'arrow', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#3b82f6'
  },
  'berenice': {
    palette: { bg: '#120914', ink: '#fae8ff', accent: '#d946ef', alt: '#a21caf', glow: 'rgba(217, 70, 239, 0.45)' },
    type: { display: 'Plus Jakarta Sans', body: 'Inter', kanjiStyle: 'thin', tracking: '0.06em', weight: 700 },
    texture: 'scanlines', transition: 'kido', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.0 },
    divider: 'slash', cursor: 'crosshair', loader: 'kido-cube', sfx: 'kido', scrollbar: '#d946ef'
  },
  'jerome': {
    palette: { bg: '#130802', ink: '#ffedd5', accent: '#ea580c', alt: '#c2410c', glow: 'rgba(234, 88, 12, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.05em', weight: 800 },
    texture: 'cracked-stone', transition: 'blades', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'jagged', cursor: 'blade', loader: 'flame-flicker', sfx: 'slash', scrollbar: '#ea580c'
  },
  'james': {
    palette: { bg: '#140505', ink: '#fee2e2', accent: '#ef4444', alt: '#b91c1c', glow: 'rgba(239, 68, 68, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.06em', weight: 700 },
    texture: 'halftone', transition: 'fire', easing: 'bounce.out', rhythm: { revealStyle: 'slam', durationScale: 0.85 },
    divider: 'slash', cursor: 'crosshair', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#ef4444'
  },
  'gwenael': {
    palette: { bg: '#060e14', ink: '#e0f2fe', accent: '#06b6d4', alt: '#0891b2', glow: 'rgba(6, 182, 212, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'outline', tracking: '0.09em', weight: 700 },
    texture: 'mirror-shards', transition: 'illusion', easing: 'power2.inOut', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'wave', cursor: 'feather', loader: 'lens-spin', sfx: 'illusion', scrollbar: '#06b6d4'
  },
  'nianzol': {
    palette: { bg: '#0e140b', ink: '#ecfccb', accent: '#84cc16', alt: '#4d7c0f', glow: 'rgba(132, 204, 22, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'brush', tracking: '0.08em', weight: 700 },
    texture: 'ink-wash', transition: 'gravity', easing: 'power3.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.05 },
    divider: 'wave', cursor: 'circle', loader: 'gravity-sink', sfx: 'heavy', scrollbar: '#84cc16'
  },
  'ebern': {
    palette: { bg: '#13070d', ink: '#fce7f3', accent: '#f43f5e', alt: '#be123c', glow: 'rgba(244, 63, 94, 0.45)' },
    type: { display: 'Bebas Neue', body: 'Inter', kanjiStyle: 'solid', tracking: '0.07em', weight: 800 },
    texture: 'halftone', transition: 'hollow-energy', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'slash', cursor: 'blade', loader: 'cero-charge', sfx: 'hollow', scrollbar: '#f43f5e'
  },
  'luders': {
    palette: { bg: '#0f0813', ink: '#fdf2f8', accent: '#ec4899', alt: '#be185d', glow: 'rgba(236, 72, 153, 0.45)' },
    type: { display: 'Cinzel', body: 'Inter', kanjiStyle: 'outline', tracking: '0.11em', weight: 700 },
    texture: 'paper-grain', transition: 'light-arrows', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.0 },
    divider: 'zigzag', cursor: 'arrow', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#ec4899'
  },
  'luppi': {
    palette: { bg: '#041014', ink: '#ecfeff', accent: '#14b8a6', alt: '#0f766e', glow: 'rgba(20, 184, 166, 0.45)' },
    type: { display: 'Montserrat', body: 'Inter', kanjiStyle: 'solid', tracking: '0.08em', weight: 700 },
    texture: 'halftone', transition: 'hollow-energy', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.0 },
    divider: 'slash', cursor: 'claw', loader: 'cero-charge', sfx: 'hollow', scrollbar: '#14b8a6'
  },
  'masaki': {
    palette: { bg: '#130903', ink: '#fff7ed', accent: '#f59e0b', alt: '#b45309', glow: 'rgba(245, 158, 11, 0.45)' },
    type: { display: 'Playfair Display', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.05em', weight: 700 },
    texture: 'starfield', transition: 'light-arrows', easing: 'power2.out', rhythm: { revealStyle: 'fade-rise', durationScale: 1.0 },
    divider: 'slash', cursor: 'arrow', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#f59e0b'
  },
  'katagiri': {
    palette: { bg: '#090e17', ink: '#f8fafc', accent: '#64748b', alt: '#334155', glow: 'rgba(100, 116, 139, 0.45)' },
    type: { display: 'Inter', body: 'Inter', kanjiStyle: 'thin', tracking: '0.04em', weight: 600 },
    texture: 'paper-grain', transition: 'light-arrows', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.1 },
    divider: 'slash', cursor: 'arrow', loader: 'quincy-cross', sfx: 'arrows', scrollbar: '#64748b'
  },
  'ganju': {
    palette: { bg: '#140702', ink: '#ffedd5', accent: '#d97706', alt: '#92400e', glow: 'rgba(217, 119, 6, 0.45)' },
    type: { display: 'Dela Gothic One', body: 'Plus Jakarta Sans', kanjiStyle: 'brush', tracking: '0.06em', weight: 800 },
    texture: 'cracked-stone', transition: 'fire', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.9 },
    divider: 'jagged', cursor: 'blade', loader: 'flame-flicker', sfx: 'fire', scrollbar: '#d97706'
  },
  'ryunosuke': {
    palette: { bg: '#071017', ink: '#f0f9ff', accent: '#0284c7', alt: '#0369a1', glow: 'rgba(2, 132, 199, 0.45)' },
    type: { display: 'Space Grotesk', body: 'Inter', kanjiStyle: 'thin', tracking: '0.05em', weight: 600 },
    texture: 'paper-grain', transition: 'blades', easing: 'power2.out', rhythm: { revealStyle: 'drift', durationScale: 1.05 },
    divider: 'slash', cursor: 'blade', loader: 'blade-spin', sfx: 'slash', scrollbar: '#0284c7'
  },
  'shino': {
    palette: { bg: '#130608', ink: '#ffe4e6', accent: '#e11d48', alt: '#9f1239', glow: 'rgba(225, 29, 72, 0.45)' },
    type: { display: 'Montserrat', body: 'Plus Jakarta Sans', kanjiStyle: 'solid', tracking: '0.07em', weight: 700 },
    texture: 'halftone', transition: 'blades', easing: 'power3.out', rhythm: { revealStyle: 'slam', durationScale: 0.95 },
    divider: 'slash', cursor: 'blade', loader: 'blade-spin', sfx: 'slash', scrollbar: '#e11d48'
  }
};

// Aliases matching faction data IDs
BESPOKE_WARRIOR_THEMES['bazzb'] = BESPOKE_WARRIOR_THEMES['bazz-b'];
BESPOKE_WARRIOR_THEMES['cangdu'] = BESPOKE_WARRIOR_THEMES['cang-du'];
BESPOKE_WARRIOR_THEMES['royd'] = BESPOKE_WARRIOR_THEMES['loyd-royd'];
BESPOKE_WARRIOR_THEMES['senjumaru'] = BESPOKE_WARRIOR_THEMES['shutara'];

/**
 * Returns the exact bespoke custom theme for any warrior.
 */
export function getThemeForCharacter(character) {
  if (!character) return ARCHETYPES.blades;

  let baseTheme = BESPOKE_WARRIOR_THEMES[character.id];
  if (!baseTheme) {
    const baseKey = character.fxType || 'blades';
    baseTheme = ARCHETYPES[baseKey] || ARCHETYPES.blades;
  }

  // Ensure palette uses character's explicit non-dark saturated color field
  const palette = (character.colors && character.colors.bg) ? {
    bg: character.colors.bg,
    ink: character.colors.ink,
    accent: character.colors.accent,
    alt: character.colors.accent,
    glow: 'rgba(0,0,0,0.15)'
  } : baseTheme.palette;

  return {
    id: character.id,
    ...baseTheme,
    palette
  };
}
