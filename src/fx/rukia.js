import { TAU, clamp, rand, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxRukia(c) {
  let W = 0, H = 0, rings = [], flakes = [], mp = 0;
  const RM = isReducedMotion();

  const ring = (x, y, sp) => rings.push({ x, y, r: 0, sp, life: 1 });
  const flake = (x, y, vx, vy, life) => flakes.push({ x, y, vx, vy, r: rand(5, 12), rot: rand(0, TAU), vr: rand(-1, 1), life });

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click(x, y) {
      synth.frost();
      ring(x, y, 260);
      for (let i = 0; i < 14; i++) {
        const a = rand(0, TAU), s = rand(60, 200);
        flake(x, y, Math.cos(a) * s, Math.sin(a) * s, 0.99);
      }
    },
    update(dt, t, p = 0.5) {
      mp = p;
      if (!RM && flakes.length < 40 && Math.random() < 0.08) {
        flake(rand(0, W), -10, rand(-10, 10), rand(20, 50), 1);
      }
      for (const r of rings) {
        r.r += r.sp * dt;
        r.life -= dt * 0.3;
      }
      rings = rings.filter(r => r.life > 0);
      for (const f of flakes) {
        f.x += f.vx * dt; f.y += f.vy * dt; f.rot += f.vr * dt;
        if (f.life < 1) f.life -= dt * 0.8;
      }
      flakes = flakes.filter(f => f.y < H + 20 && f.life > 0);
    },
    draw(g) {
      const mx = W * 0.72, my = H * 0.3, R = Math.min(W, H) * 0.13;
      g.lineWidth = 2; g.strokeStyle = c.accent || c.acc;
      for (const r of rings) {
        g.globalAlpha = Math.max(0, r.life) * 0.8;
        g.beginPath(); g.arc(r.x, r.y, r.r, 0, TAU); g.stroke();
        g.beginPath(); g.arc(r.x, r.y, r.r * 0.85, 0, TAU); g.stroke();
      }
      g.globalAlpha = 1;
      g.save();
      g.shadowColor = c.accent || c.acc;
      g.shadowBlur = 30;
      g.fillStyle = '#ffffff';
      g.beginPath(); g.arc(mx, my, R, 0, TAU); g.fill();
      g.restore();

      const off = R * (1.5 - 1.2 * clamp(mp * 1.3));
      g.fillStyle = c.bg;
      g.beginPath(); g.arc(mx + off, my - R * 0.1, R * 1.02, 0, TAU); g.fill();
      g.strokeStyle = c.accent || c.acc;
      g.lineWidth = 1.5;

      for (const f of flakes) {
        g.globalAlpha = clamp(f.life);
        g.save(); g.translate(f.x, f.y); g.rotate(f.rot);
        g.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = i * TAU / 6;
          g.moveTo(0, 0); g.lineTo(Math.cos(a) * f.r, Math.sin(a) * f.r);
          const bx = Math.cos(a) * f.r * 0.6, by = Math.sin(a) * f.r * 0.6;
          g.moveTo(bx, by); g.lineTo(bx + Math.cos(a + 0.8) * f.r * 0.35, by + Math.sin(a + 0.8) * f.r * 0.35);
          g.moveTo(bx, by); g.lineTo(bx + Math.cos(a - 0.8) * f.r * 0.35, by + Math.sin(a - 0.8) * f.r * 0.35);
        }
        g.stroke(); g.restore();
      }
      g.globalAlpha = 1;
    }
  };
}
