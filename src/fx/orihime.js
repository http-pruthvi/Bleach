import { TAU, rand, ease, rgba, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxOrihime(c) {
  let W = 0, H = 0, pos = { x: 0, y: 0 }, tgt = null, rot = 0, trail = [], shields = [];
  const RM = isReducedMotion();
  const alt = c.accent || '#f5a623';

  return {
    resize(w, h) {
      W = w; H = h;
      if (!pos.x) { pos.x = w * 0.6; pos.y = h * 0.45; }
    },
    move(x, y) { tgt = { x, y }; },
    click(x, y) {
      synth.shield();
      shields.push({ x, y, age: 0, rot: rand(0, TAU) });
    },
    update(dt, t, p = 0.5) {
      const gx = tgt ? tgt.x : W * 0.55 + Math.cos(t * 0.6) * W * 0.12;
      const gy = tgt ? tgt.y : H * 0.4 + Math.sin(t * 0.8) * H * 0.12;
      const k = Math.min(1, dt * 3);
      pos.x += (gx - pos.x) * k; pos.y += (gy - pos.y) * k;
      rot += dt * (RM ? 0 : 1.2 + p);

      if (!RM || tgt) trail.push({ x: pos.x + rand(-14, 14), y: pos.y + rand(-14, 14), life: 1, r: rand(1.5, 3.5) });
      for (const q of trail) { q.life -= dt * 1.1; q.y += dt * 10; }
      trail = trail.filter(q => q.life > 0);
      for (const s of shields) s.age += dt;
      shields = shields.filter(s => s.age < 1.1);
    },
    draw(g, t) {
      const R = Math.min(W, H) * 0.1 + Math.sin(t * 2) * 4;
      const gr = g.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, R * 2.4);
      gr.addColorStop(0, rgba(alt, 0.55));
      gr.addColorStop(1, rgba(alt, 0));
      g.fillStyle = gr;
      g.beginPath(); g.arc(pos.x, pos.y, R * 2.4, 0, TAU); g.fill();

      for (const q of trail) {
        g.fillStyle = rgba(alt, q.life);
        g.beginPath(); g.arc(q.x, q.y, q.r, 0, TAU); g.fill();
      }

      for (let i = 0; i < 6; i++) {
        const a = rot + i * TAU / 6;
        g.save();
        g.translate(pos.x + Math.cos(a) * R, pos.y + Math.sin(a) * R);
        g.rotate(a);
        g.beginPath(); g.ellipse(0, 0, R * 0.55, R * 0.22, 0, 0, TAU);
        g.fillStyle = rgba(c.accent, 0.9); g.fill();
        g.strokeStyle = '#ffffff'; g.lineWidth = 1.5; g.stroke();
        g.restore();
      }

      g.fillStyle = alt;
      g.beginPath(); g.arc(pos.x, pos.y, R * 0.14, 0, TAU); g.fill();

      for (const s of shields) {
        const k = s.age / 1.1, sz = 30 + ease(k) * Math.max(W, H) * 0.25, a = 1 - k;
        for (const [m, w, col] of [[1, 3, '#ffffff'], [0.62, 1.5, alt]]) {
          g.beginPath();
          for (let i = 0; i < 3; i++) {
            const an = s.rot + i * TAU / 3 - Math.PI / 2;
            g.lineTo(s.x + Math.cos(an) * sz * m, s.y + Math.sin(an) * sz * m);
          }
          g.closePath();
          if (m === 1) { g.fillStyle = rgba(alt, 0.18 * a); g.fill(); }
          g.strokeStyle = col; g.globalAlpha = a; g.lineWidth = w; g.stroke(); g.globalAlpha = 1;
        }
      }
    }
  };
}
