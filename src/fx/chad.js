import { TAU, clamp, rand, rgba } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxChad(c) {
  let W = 0, H = 0, rings = [], cracks = [], debris = [], shake = 0, P = 0;

  function hit(x, y) {
    synth.punch();
    rings.push({ x, y, r: 10, life: 1 });
    for (let i = 0; i < 9; i++) {
      let a = rand(0, TAU), px = x, py = y;
      const pts = [[x, y]], n = Math.floor(rand(4, 8));
      for (let j = 0; j < n; j++) {
        a += rand(-0.4, 0.4);
        const l = rand(28, 60);
        px += Math.cos(a) * l; py += Math.sin(a) * l;
        pts.push([px, py]);
      }
      cracks.push({ pts, life: 1.6 });
    }
    for (let i = 0; i < 16; i++) {
      debris.push({
        x, y,
        vx: rand(-260, 260), vy: rand(-420, -80),
        rot: rand(0, TAU), vr: rand(-8, 8),
        s: rand(3, 9), life: 1
      });
    }
    shake = 14;
  }

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click: hit,
    update(dt, t, p = 0.5) {
      P = p;
      for (const r of rings) { r.r += dt * 800; r.life -= dt * 1.5; }
      rings = rings.filter(r => r.life > 0);
      for (const k of cracks) k.life -= dt * 0.5;
      cracks = cracks.filter(k => k.life > 0);
      for (const d of debris) {
        d.vy += 1000 * dt; d.x += d.vx * dt; d.y += d.vy * dt;
        d.rot += d.vr * dt; d.life -= dt * 0.7;
      }
      debris = debris.filter(d => d.life > 0);
      shake = Math.max(0, shake - dt * 40);
    },
    draw(g) {
      g.save();
      if (shake > 0) g.translate(rand(-shake, shake), rand(-shake, shake));
      g.fillStyle = rgba(c.ink, 0.05);
      for (let i = 0; i < 4; i++) {
        g.save();
        g.translate(W * (0.38 + i * 0.15), H * 0.5 + (P - 0.5) * 60 * (i + 1));
        g.rotate(-0.2);
        g.fillRect(0, -H, W * 0.09, H * 2);
        g.restore();
      }
      g.strokeStyle = c.accent;
      for (const r of rings) {
        g.globalAlpha = Math.max(0, r.life);
        g.lineWidth = 2 + 8 * r.life;
        g.beginPath(); g.arc(r.x, r.y, r.r, 0, TAU); g.stroke();
      }
      g.strokeStyle = c.ink;
      g.lineWidth = 3; g.lineJoin = 'round';
      for (const k of cracks) {
        g.globalAlpha = clamp(k.life);
        g.beginPath();
        k.pts.forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]));
        g.stroke();
      }
      g.fillStyle = c.accent;
      for (const d of debris) {
        g.globalAlpha = clamp(d.life);
        g.save(); g.translate(d.x, d.y); g.rotate(d.rot);
        g.fillRect(-d.s / 2, -d.s / 2, d.s, d.s);
        g.restore();
      }
      g.restore();
      g.globalAlpha = 1;
    }
  };
}
