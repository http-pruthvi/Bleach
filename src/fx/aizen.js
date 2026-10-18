import { TAU, clamp, rand, rgba } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxAizen(c) {
  let W = 0, H = 0, shards = [], rings = [], distort = 0;

  function shatter(x, y) {
    synth.shatter();
    distort = 0.6;
    for (let i = 0; i < 28; i++) {
      const ang = rand(0, TAU), spd = rand(100, 420);
      shards.push({
        x, y,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        rot: rand(0, TAU), vr: rand(-6, 6),
        s: rand(10, 24), life: 1
      });
    }
    rings.push({ x, y, r: 0, life: 1 });
  }

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click: shatter,
    update(dt) {
      for (const s of shards) {
        s.x += s.vx * dt; s.y += s.vy * dt;
        s.rot += s.vr * dt; s.life -= dt * 0.6;
      }
      shards = shards.filter(s => s.life > 0);
      for (const r of rings) { r.r += dt * 350; r.life -= dt * 0.8; }
      rings = rings.filter(r => r.life > 0);
      distort = Math.max(0, distort - dt * 1.5);
    },
    draw(g, t) {
      const cx = W * 0.65, cy = H * 0.35, R = Math.min(W, H) * 0.16;
      g.save();
      g.strokeStyle = rgba(c.accent, 0.4); g.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        g.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = t * 0.2 * i + j * TAU / 6;
          const px = cx + Math.cos(a) * R * (i * 0.35), py = cy + Math.sin(a) * R * (i * 0.35);
          j === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
        }
        g.closePath(); g.stroke();
      }
      for (const r of rings) {
        g.globalAlpha = r.life * 0.6;
        g.strokeStyle = c.accent; g.lineWidth = 2;
        g.beginPath(); g.arc(r.x, r.y, r.r, 0, TAU); g.stroke();
      }
      for (const s of shards) {
        g.save(); g.translate(s.x, s.y); g.rotate(s.rot);
        g.globalAlpha = clamp(s.life);
        g.beginPath(); g.moveTo(-s.s, -s.s * 0.5); g.lineTo(s.s, -s.s * 0.2); g.lineTo(s.s * 0.2, s.s); g.closePath();
        g.fillStyle = rgba(c.accent, 0.35); g.fill();
        g.strokeStyle = '#ffffff'; g.lineWidth = 1.5; g.stroke();
        g.restore();
      }
      g.restore();
      g.globalAlpha = 1;
    }
  };
}
