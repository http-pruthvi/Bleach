import gsap from 'gsap';

/**
 * Rukia Signature Transition:
 * 1. Anticipation: Delicate frost pulse from click point.
 * 2. Cover: Hexagonal frost cells grow outward from click point staggered by distance, filling screen in #e6f0f8.
 * 3. Hold: Falling snow crystals during swap.
 * 4. Reveal: Each cell shrinks and melts away to reveal new page.
 */
export function createRukiaTransition({ canvas, ctx, theme, clickCoords, onCovered, onComplete }) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const coverColor = theme?.palette?.bg || '#e6f0f8';
  const accentColor = theme?.palette?.accent || '#3f8fd0';
  const inkColor = theme?.palette?.ink || '#0b2a45';

  const originX = clickCoords?.x ?? W / 2;
  const originY = clickCoords?.y ?? H / 2;

  // Generate hexagonal grid covering screen
  const hexRadius = 48; // Base radius of cell
  const hexWidth = Math.sqrt(3) * hexRadius;
  const hexHeight = 2 * hexRadius * 0.75; // vertical stagger

  const cols = Math.ceil(W / hexWidth) + 3;
  const rows = Math.ceil(H / hexHeight) + 3;

  const cells = [];
  let maxDist = 1;

  for (let r = -1; r <= rows; r++) {
    for (let c = -1; c <= cols; c++) {
      const x = c * hexWidth + ((r % 2) ? hexWidth / 2 : 0);
      const y = r * hexHeight;
      const dist = Math.hypot(x - originX, y - originY);
      if (dist > maxDist) maxDist = dist;
      cells.push({ x, y, dist, scale: 0, opacity: 0 });
    }
  }

  // Snowflakes during hold/cover
  const snowflakes = Array.from({ length: 35 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    radius: 1.5 + Math.random() * 3,
    speedY: 25 + Math.random() * 40,
    speedX: (Math.random() - 0.5) * 15,
    alpha: 0.3 + Math.random() * 0.7
  }));

  const state = {
    growthProgress: 0, // 0 -> 1 grows cells outward
    revealProgress: 0, // 0 -> 1 shrinks cells away
    snowAlpha: 0
  };

  function drawHexagon(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const px = cx + r * Math.cos(a);
      const py = cy + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function render() {
    ctx.clearRect(0, 0, W, H);

    const gp = state.growthProgress;
    const rp = state.revealProgress;

    // Render cells
    cells.forEach(cell => {
      // Stagger based on distance from origin
      const distNorm = cell.dist / maxDist;
      let s = 0;

      if (rp > 0) {
        // Shrink & melt away
        const localT = Math.max(0, Math.min(1, (rp - distNorm * 0.4) / 0.6));
        s = Math.max(0, 1 - localT * 1.1);
      } else {
        // Grow outward
        const localT = Math.max(0, Math.min(1, (gp - distNorm * 0.5) / 0.5));
        s = localT * 1.25; // 1.25 to ensure slight overlap, 100% full coverage
      }

      if (s > 0) {
        ctx.save();
        ctx.fillStyle = coverColor;
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;
        drawHexagon(cell.x, cell.y, hexRadius * s);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    });

    // Render falling snow crystals
    if (state.snowAlpha > 0) {
      ctx.save();
      ctx.fillStyle = '#ffffff';
      snowflakes.forEach(sf => {
        ctx.globalAlpha = sf.alpha * state.snowAlpha;
        ctx.beginPath();
        ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2);
        ctx.fill();
        sf.y += sf.speedY * 0.016;
        sf.x += sf.speedX * 0.016;
        if (sf.y > H) sf.y = 0;
      });
      ctx.restore();
    }
  }

  const tl = gsap.timeline({
    onUpdate: render,
    onComplete: () => {
      ctx.clearRect(0, 0, W, H);
      if (onComplete) onComplete();
    }
  });

  // Step 1: Anticipation ring & cells grow outward (380ms)
  tl.to(state, {
    growthProgress: 1,
    snowAlpha: 1,
    duration: 0.38,
    ease: 'power2.out'
  });

  // Step 1.5: Swap Pause - wait until destination page reports ready
  tl.addPause('swap', async () => {
    if (onCovered) {
      await onCovered();
    }
    tl.play();
  });

  // Step 2: Reveal - cells shrink and melt away (360ms)
  tl.to(state, {
    revealProgress: 1,
    duration: 0.38,
    ease: 'power3.inOut'
  });

  tl.to(state, {
    snowAlpha: 0,
    duration: 0.2
  }, '-=0.2');

  return tl;
}
