import { TAU, rand, rgba, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxByakuya(c) {
  let W = 0, H = 0, ps = [], ptr = null;
  const N = 150;
  const RM = isReducedMotion();

  return {
    resize(w, h) {
      const first = !ps.length;
      W = w; H = h;
      if (first) {
        for (let i = 0; i < N; i++) {
          ps.push({
            x: rand(0, w), y: rand(0, h),
            vx: 0, vy: 0,
            s: rand(8, 20),
            ph: rand(0, TAU),
            sp: rand(1, 3),
            a: rand(0, TAU),
            k: Math.random() < 0.6
          });
        }
      }
    },
    move(x, y) { ptr = { x, y }; },
    click(x, y) {
      synth.petals();
      for (const q of ps) {
        const dx = q.x - x, dy = q.y - y, d = Math.hypot(dx, dy) || 1;
        if (d < 420) {
          const f = (1 - d / 420) * 700;
          q.vx += dx / d * f;
          q.vy += dy / d * f;
        }
      }
    },
    update(dt, t, p = 0.5) {
      const base = RM ? 0 : 1;
      for (const q of ps) {
        const bx = (40 + p * 50) * base, by = (18 + Math.sin(t * 0.7 + q.ph) * 14) * base;
        if (ptr) {
          const dx = q.x - ptr.x, dy = q.y - ptr.y, d = Math.hypot(dx, dy) || 1;
          if (d < 150) {
            const f = (1 - d / 150) * 900 * dt;
            q.vx += dx / d * f; q.vy += dy / d * f;
          }
        }
        q.vx += (bx - q.vx) * dt * 1.2; q.vy += (by - q.vy) * dt * 1.2;
        q.x += q.vx * dt; q.y += q.vy * dt;
        q.a += dt * q.sp * 0.6 * base;

        if (q.x > W + 30) q.x = -30; if (q.x < -30) q.x = W + 30;
        if (q.y > H + 30) q.y = -30; if (q.y < -30) q.y = H + 30;
      }
    },
    draw(g, t) {
      for (const q of ps) {
        g.save();
        g.translate(q.x, q.y);
        g.rotate(q.a);
        g.scale(1, Math.abs(Math.sin(q.ph + t * q.sp)) * 0.8 + 0.2);
        g.beginPath();
        g.moveTo(-q.s, 0);
        g.quadraticCurveTo(0, -q.s * 0.55, q.s, 0);
        g.quadraticCurveTo(0, q.s * 0.55, -q.s, 0);
        g.fillStyle = q.k ? rgba(c.accent, 0.85) : rgba(c.accent, 0.5);
        g.fill();
        g.restore();
      }
    }
  };
}
