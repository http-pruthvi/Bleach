import gsap from 'gsap';

/**
 * Ichigo Signature Transition:
 * 1. Anticipation: Tapered black crescent slash draws across screen.
 * 2. Hit-Stop: 80ms impact freeze.
 * 3. Cover: Screen splits along the cut; both halves slide in covering the screen in #ff5a0a.
 * 4. Reveal: Halves slide apart revealing new page; thin white seam lingers and fades.
 */
export function createIchigoTransition({ canvas, ctx, theme, onCovered, onComplete }) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const coverColor = theme?.palette?.bg || '#ff5a0a';
  const inkColor = theme?.palette?.ink || '#0c0c0c';

  // State object animated by GSAP
  const state = {
    slashProgress: 0,   // 0 -> 1: drawing the crescent cut
    hitStop: 0,          // hit stop flash
    coverProgress: 0,    // 0 -> 1: orange halves sliding in to cover
    revealProgress: 0,   // 0 -> 1: orange halves sliding apart
    seamAlpha: 1         // 1 -> 0: lingering white cut seam fading
  };

  // Diagonal cut line from top-right to bottom-left
  // Angle approximately -25 deg through center
  const cx = W / 2;
  const cy = H / 2;
  const angle = -0.42; // radians
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const diagLen = Math.hypot(W, H) * 1.3;

  const p1 = { x: cx - cos * diagLen / 2, y: cy - sin * diagLen / 2 };
  const p2 = { x: cx + cos * diagLen / 2, y: cy + sin * diagLen / 2 };

  // Render loop
  function render() {
    ctx.clearRect(0, 0, W, H);

    // Phase 1: Draw black crescent slash
    if (state.slashProgress > 0 && state.coverProgress < 1) {
      const p = state.slashProgress;
      const curX = p1.x + (p2.x - p1.x) * p;
      const curY = p1.y + (p2.y - p1.y) * p;

      // Draw tapered crescent blade
      ctx.save();
      ctx.fillStyle = inkColor;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      const bulge = Math.sin(p * Math.PI) * 28;
      ctx.quadraticCurveTo(
        (p1.x + curX) / 2 - sin * bulge,
        (p1.y + curY) / 2 + cos * bulge,
        curX, curY
      );
      ctx.quadraticCurveTo(
        (p1.x + curX) / 2 + sin * bulge * 0.3,
        (p1.y + curY) / 2 - cos * bulge * 0.3,
        p1.x, p1.y
      );
      ctx.fill();

      // White blade edge highlight
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }

    // Phase 2: Cover panels (split halves in destination color)
    if (state.coverProgress > 0) {
      const cp = state.coverProgress;
      const rp = state.revealProgress;

      ctx.save();
      ctx.fillStyle = coverColor;

      // Half A (Top-Left of cut line)
      ctx.save();
      ctx.beginPath();
      // Define Half A polygon
      ctx.moveTo(0, 0);
      ctx.lineTo(W, 0);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.clip();

      // Sliding offset for Half A:
      // When covering: slides from offset to 0. When revealing: slides from 0 to -offset.
      let offsetA = 0;
      if (rp > 0) {
        offsetA = -rp * (Math.max(W, H) * 0.9);
      } else {
        offsetA = -(1 - cp) * (Math.max(W, H) * 0.9);
      }
      ctx.translate(cos * offsetA, sin * offsetA);
      ctx.fillRect(-W, -H, W * 3, H * 3);
      ctx.restore();

      // Half B (Bottom-Right of cut line)
      ctx.save();
      ctx.beginPath();
      // Define Half B polygon
      ctx.moveTo(W, H);
      ctx.lineTo(0, H);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(W, 0);
      ctx.closePath();
      ctx.clip();

      let offsetB = 0;
      if (rp > 0) {
        offsetB = rp * (Math.max(W, H) * 0.9);
      } else {
        offsetB = (1 - cp) * (Math.max(W, H) * 0.9);
      }
      ctx.translate(cos * offsetB, sin * offsetB);
      ctx.fillRect(-W, -H, W * 3, H * 3);
      ctx.restore();

      // White cut seam line
      if (state.seamAlpha > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${state.seamAlpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    }
  }

  // Create GSAP Timeline
  const tl = gsap.timeline({
    onUpdate: render,
    onComplete: () => {
      ctx.clearRect(0, 0, W, H);
      if (onComplete) onComplete();
    }
  });

  // Step 1: Crescent slash draws across (120ms)
  tl.to(state, {
    slashProgress: 1,
    duration: 0.14,
    ease: 'power3.in'
  });

  // Step 2: 80ms hit-stop
  tl.to(state, {
    hitStop: 1,
    duration: 0.08
  });

  // Step 3: Orange halves slide in to cover screen completely (280ms)
  tl.to(state, {
    coverProgress: 1,
    duration: 0.28,
    ease: 'power4.out'
  });

  // Step 3.5: Swap Pause - wait until destination page reports ready
  tl.addPause('swap', async () => {
    if (onCovered) {
      await onCovered();
    }
    tl.play();
  });

  // Step 4: Reveal - orange halves slide apart (340ms)
  tl.to(state, {
    revealProgress: 1,
    duration: 0.36,
    ease: 'power3.inOut'
  });

  // Lingering thin white seam fades out
  tl.to(state, {
    seamAlpha: 0,
    duration: 0.22,
    ease: 'power2.out'
  }, '-=0.2');

  return tl;
}
