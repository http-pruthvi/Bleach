import gsap from 'gsap';

export const SHAPES = [
  'slash',
  'hex-grid',
  'shards',
  'bars',
  'circle-iris',
  'star-iris',
  'diamonds',
  'waves',
  'blinds',
  'brush-stroke',
  'ripples',
  'torn-paper',
  'chain-links'
];

export const MOTIONS = [
  'snap',
  'drift',
  'slam',
  'stagger',
  'elastic',
  'glide'
];

export const SIGNATURE_SVGS = {
  'yamamoto-inferno': '<path d="M10,90 Q30,10 50,40 Q70,0 90,90 Z" fill="currentColor"/>',
  'sasakibe-lightning': '<polygon points="50,0 20,55 45,55 30,100 80,45 55,45" fill="currentColor"/>',
  'soifon-wasp-stinger': '<path d="M50,10 L70,50 L50,90 L30,50 Z M50,90 L50,100" stroke="currentColor" stroke-width="3" fill="none"/>',
  'unohana-minazuki': '<path d="M10,50 Q50,10 90,50 Q50,90 10,50 Z" fill="currentColor"/>',
  'shunsui-shadow-game': '<polygon points="50,10 90,90 10,90" fill="currentColor"/>',
  'komamura-armor-fist': '<rect x="25" y="25" width="50" height="50" fill="currentColor"/>',
  'kensei-iron-trench': '<path d="M20,20 L80,20 L60,80 L40,80 Z" fill="currentColor"/>',
  'mayuri-golden-caterpillar': '<circle cx="50" cy="50" r="35" fill="currentColor"/>',
  'shinji-inverted-cross': '<polygon points="45,10 55,10 55,90 45,90 M20,65 80,65 80,75 20,75" fill="currentColor"/>',
  'ulquiorra-murcielago': '<path d="M10,80 Q50,20 90,80 Q70,50 50,70 Q30,50 10,80 Z" fill="currentColor"/>',
  'grimmjow-pantera-claws': '<path d="M20,10 L30,90 M45,10 L50,90 M70,10 L65,90" stroke="currentColor" stroke-width="4"/>',
  'barragan-respira-crown': '<polygon points="20,80 30,30 50,60 70,30 80,80" fill="currentColor"/>',
  'harribel-tiburon-water': '<path d="M10,50 Q30,20 50,50 T90,50 Q70,80 50,50 T10,50 Z" fill="currentColor"/>',
  'nnoitra-santa-teresa': '<circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="6" fill="none"/>',
  'stark-los-lobos': '<polygon points="50,15 65,40 90,40 70,60 80,85 50,70 20,85 30,60 10,40 35,40" fill="currentColor"/>',
  'haschwalth-balance-shield': '<circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="4" fill="none"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="4"/>',
  'bazzb-burner-finger': '<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="8"/>',
  'asnodt-fear-thorns': '<path d="M20,80 L50,20 L80,80 M35,50 L65,50" stroke="currentColor" stroke-width="4" fill="none"/>',
  'bambietta-bomb-burst': '<circle cx="50" cy="50" r="20" fill="currentColor"/><circle cx="50" cy="50" r="38" stroke="currentColor" stroke-width="3" fill="none"/>',
  'gremmy-meteor-cube': '<polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="currentColor" stroke-width="4" fill="none"/>',
  'ichibei-ink-calligraphy': '<path d="M30,30 C50,10 70,10 70,40 C70,70 30,70 50,90" stroke="currentColor" stroke-width="8" fill="none"/>',
  'nimaiya-sharp-edge': '<line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="6"/>',
  'senjumaru-loom-weave': '<line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" stroke-width="3"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="3"/><line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" stroke-width="3"/>',
  'kirinji-hot-springs': '<path d="M10,60 Q50,30 90,60 M25,40 Q50,20 75,40" stroke="currentColor" stroke-width="3" fill="none"/>',
  'hikifune-cage-of-life': '<circle cx="50" cy="50" r="36" stroke="currentColor" stroke-width="5" stroke-dasharray="10 5" fill="none"/>'
};

/**
 * High-performance, interrupt-safe composable transition runner for Tier B and C characters.
 */
export function createKitTransition({ canvas, ctx, theme, shape = 'slash', motion = 'snap', signatureSvgKey, onCovered, onComplete }) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const coverColor = theme?.palette?.bg || '#ffffff';
  const inkColor = theme?.palette?.ink || '#000000';
  const accentColor = theme?.palette?.accent || '#ff5a0a';

  const state = {
    progress: 0,
    reveal: 0,
    overlayAlpha: 1
  };

  function render() {
    ctx.clearRect(0, 0, W, H);
    const p = state.progress;
    const r = state.reveal;

    ctx.save();
    ctx.fillStyle = coverColor;

    if (shape === 'bars') {
      const barsCount = 7;
      const barH = H / barsCount;
      for (let i = 0; i < barsCount; i++) {
        const staggerP = Math.max(0, Math.min(1, p * 1.5 - i * 0.08));
        const staggerR = Math.max(0, Math.min(1, r * 1.5 - i * 0.08));
        const width = (staggerP - staggerR) * W;
        const x = i % 2 === 0 ? 0 : W - width;
        ctx.fillRect(x, i * barH, width, barH + 1);
      }
    } else if (shape === 'circle-iris') {
      const maxR = Math.hypot(W, H) / 1.5;
      const currentR = Math.max(0, (p - r) * maxR);
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, currentR, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'star-iris') {
      const maxR = Math.hypot(W, H) / 1.3;
      const currentR = Math.max(0, (p - r) * maxR);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x1 = W / 2 + Math.cos(a) * currentR;
        const y1 = H / 2 + Math.sin(a) * currentR;
        const aMid = a + Math.PI / 5;
        const x2 = W / 2 + Math.cos(aMid) * (currentR * 0.4);
        const y2 = H / 2 + Math.sin(aMid) * (currentR * 0.4);
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      // Default: Clean angled slash wipe
      const wipeOffset = (p - r);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(W * wipeOffset * 1.2, 0);
      ctx.lineTo(W * wipeOffset * 1.2 - H * 0.4, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  const durationMap = {
    snap: 0.22,
    drift: 0.42,
    slam: 0.25,
    stagger: 0.35,
    elastic: 0.38,
    glide: 0.32
  };

  const easeMap = {
    snap: 'power4.out',
    drift: 'power2.inOut',
    slam: 'power4.in',
    stagger: 'power3.out',
    elastic: 'back.out(1.4)',
    glide: 'sine.inOut'
  };

  const tl = gsap.timeline({
    onUpdate: render,
    onComplete: () => {
      ctx.clearRect(0, 0, W, H);
      if (onComplete) onComplete();
    }
  });

  // Step 1: Cover phase
  tl.to(state, {
    progress: 1,
    duration: durationMap[motion] || 0.3,
    ease: easeMap[motion] || 'power3.out'
  });

  // Step 2: Swap Pause
  tl.addPause('swap', async () => {
    if (onCovered) await onCovered();
    tl.play();
  });

  // Step 3: Reveal phase
  tl.to(state, {
    reveal: 1,
    duration: durationMap[motion] || 0.3,
    ease: easeMap[motion] || 'power3.out'
  });

  return tl;
}
