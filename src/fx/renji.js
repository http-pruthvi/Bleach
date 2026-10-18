import { TAU, clamp, rand, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxRenji(c) {
  let W = 0, H = 0, pts = [], tgt = null, sparks = [], len = 10;
  const N = 30;
  const RM = isReducedMotion();

  return {
    resize(w, h) {
      W = w; H = h; len = Math.min(w, h) * 0.05;
      if (!pts.length) {
        for (let i = 0; i < N; i++) pts.push({ x: w * 0.06 + i * len * 0.4, y: h * 0.95 - i * len * 0.3 });
      }
    },
    move(x, y) { tgt = { x, y }; },
    click(x, y) {
      synth.whip();
      tgt = { x, y }; pts[0].x = x; pts[0].y = y;
      for (let i = 0; i < 16; i++) {
        const a = rand(0, TAU), s = rand(120, 360);
        sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 });
      }
    },
    update(dt, t) {
      const gx = tgt ? tgt.x : W * 0.55 + Math.cos(t * 0.9) * W * 0.18;
      const gy = tgt ? tgt.y : H * 0.4 + Math.sin(t * 1.1) * H * 0.2;
      const k = Math.min(1, dt * (RM && !tgt ? 0 : 4));
      pts[0].x += (gx - pts[0].x) * k; pts[0].y += (gy - pts[0].y) * k;
      for (let i = 1; i < N; i++) {
        const a = pts[i], b = pts[i - 1], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy) || 1;
        a.x = b.x + dx / d * len; a.y = b.y + dy / d * len;
      }
      for (const s of sparks) { s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 2.2; }
      sparks = sparks.filter(s => s.life > 0);
    },
    draw(g) {
      g.lineCap = 'round';
      for (const pass of [0, 1]) {
        for (let i = N - 1; i > 0; i--) {
          const w = 6 + 16 * (1 - i / N);
          g.strokeStyle = pass ? (c.accent || '#ffffff') : '#ffffff';
          g.lineWidth = pass ? w : w + 6;
          g.beginPath(); g.moveTo(pts[i].x, pts[i].y); g.lineTo(pts[i - 1].x, pts[i - 1].y); g.stroke();
        }
      }
      g.fillStyle = '#ffffff';
      for (let i = 1; i < N; i++) {
        g.beginPath(); g.arc(pts[i].x, pts[i].y, 2.5, 0, TAU); g.fill();
      }
      const h = pts[0], n = pts[1];
      const a = Math.atan2(h.y - n.y, h.x - n.x);
      g.fillStyle = c.accent || '#ffffff'; g.strokeStyle = '#ffffff'; g.lineWidth = 3;
      g.beginPath();
      g.moveTo(h.x + Math.cos(a) * len * 1.8, h.y + Math.sin(a) * len * 1.8);
      g.lineTo(h.x + Math.cos(a + 2.4) * len * 0.9, h.y + Math.sin(a + 2.4) * len * 0.9);
      g.lineTo(h.x + Math.cos(a - 2.4) * len * 0.9, h.y + Math.sin(a - 2.4) * len * 0.9);
      g.closePath(); g.fill(); g.stroke();

      g.strokeStyle = '#ffffff'; g.lineWidth = 2;
      for (const s of sparks) {
        g.globalAlpha = clamp(s.life);
        g.beginPath(); g.moveTo(s.x, s.y); g.lineTo(s.x - s.vx * 0.04, s.y - s.vy * 0.04); g.stroke();
      }
      g.globalAlpha = 1;
    }
  };
}
