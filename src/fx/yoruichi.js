import { TAU, clamp, rand, rgba, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxYoruichi(c) {
  let W = 0, H = 0, bolts = [], flashes = [], speedLines = [];
  const RM = isReducedMotion();

  function strike(x, y) {
    synth.thunder();
    for (let i = 0; i < 6; i++) {
      let px = x, py = y;
      const pts = [[px, py]];
      for (let j = 0; j < 8; j++) {
        const ang = rand(0, TAU);
        const l = rand(20, 60);
        px += Math.cos(ang) * l;
        py += Math.sin(ang) * l;
        pts.push([px, py]);
      }
      bolts.push({ pts, life: 1, col: Math.random() < 0.5 ? '#ffffff' : (c.accent || '#facc15') });
    }
    flashes.push({ x, y, r: 0, life: 1 });
  }

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click: strike,
    update(dt) {
      if (!RM && speedLines.length < 25 && Math.random() < 0.4) {
        speedLines.push({
          x: rand(0, W), y: rand(0, H),
          len: rand(60, 200),
          life: 1,
          ang: rand(-0.4, 0.4)
        });
      }
      for (const b of bolts) b.life -= dt * 2.5;
      bolts = bolts.filter(b => b.life > 0);
      for (const f of flashes) { f.r += dt * 450; f.life -= dt * 2; }
      flashes = flashes.filter(f => f.life > 0);
      for (const s of speedLines) s.life -= dt * 1.8;
      speedLines = speedLines.filter(s => s.life > 0);
    },
    draw(g) {
      g.save();
      for (const s of speedLines) {
        g.globalAlpha = clamp(s.life) * 0.4;
        g.strokeStyle = c.accent || '#facc15';
        g.lineWidth = 1.5;
        g.beginPath();
        g.moveTo(s.x, s.y);
        g.lineTo(s.x + Math.cos(s.ang) * s.len, s.y + Math.sin(s.ang) * s.len);
        g.stroke();
      }

      for (const f of flashes) {
        g.globalAlpha = clamp(f.life) * 0.6;
        g.strokeStyle = '#ffffff';
        g.lineWidth = 3;
        g.beginPath(); g.arc(f.x, f.y, f.r, 0, TAU); g.stroke();
      }

      for (const b of bolts) {
        g.globalAlpha = clamp(b.life);
        g.strokeStyle = b.col;
        g.lineWidth = 2.5;
        g.shadowColor = c.accent || '#facc15';
        g.shadowBlur = 12;
        g.beginPath();
        b.pts.forEach((pt, i) => i === 0 ? g.moveTo(pt[0], pt[1]) : g.lineTo(pt[0], pt[1]));
        g.stroke();
      }
      g.restore();
      g.globalAlpha = 1;
    }
  };
}
