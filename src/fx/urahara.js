import { TAU, clamp, rand, rgba, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxUrahara(c) {
  let W = 0, H = 0, nets = [], reishiWaves = [];
  const RM = isReducedMotion();

  function cast(x, y) {
    synth.slash();
    nets.push({ x, y, r: 0, life: 1, rot: rand(0, TAU) });
    for (let i = 0; i < 18; i++) {
      const a = rand(0, TAU), sp = rand(80, 240);
      reishiWaves.push({
        x, y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        r: rand(2, 6),
        life: 1
      });
    }
  }

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click: cast,
    update(dt) {
      for (const n of nets) {
        n.r += dt * 300;
        n.life -= dt * 1.2;
      }
      nets = nets.filter(n => n.life > 0);
      for (const w of reishiWaves) {
        w.x += w.vx * dt; w.y += w.vy * dt;
        w.life -= dt * 0.9;
      }
      reishiWaves = reishiWaves.filter(w => w.life > 0);
    },
    draw(g, t) {
      const cx = W * 0.65, cy = H * 0.4, R = Math.min(W, H) * 0.15;
      g.save();
      g.strokeStyle = rgba(c.accent || '#10b981', 0.4);
      g.lineWidth = 1.5;
      g.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = t * 0.3 + i * TAU / 8;
        const px = cx + Math.cos(a) * R, py = cy + Math.sin(a) * R;
        i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
      }
      g.closePath(); g.stroke();

      for (const n of nets) {
        g.globalAlpha = clamp(n.life);
        g.strokeStyle = '#ef4444'; // Crimson Benihime hue
        g.lineWidth = 2;
        g.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = n.rot + j * TAU / 6;
          const px = n.x + Math.cos(a) * n.r, py = n.y + Math.sin(a) * n.r;
          j === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
        }
        g.closePath(); g.stroke();
      }

      for (const w of reishiWaves) {
        g.globalAlpha = clamp(w.life);
        g.fillStyle = c.accent || '#10b981';
        g.beginPath(); g.arc(w.x, w.y, w.r, 0, TAU); g.fill();
      }
      g.restore();
      g.globalAlpha = 1;
    }
  };
}
