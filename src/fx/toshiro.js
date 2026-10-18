import { TAU, clamp, rand, ease, rgba } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxToshiro(c) {
  let W = 0, H = 0, clusters = [], frost = [], last = null, base = null;

  const mk = (x, y, radial) => {
    const sh = [], n = radial ? 8 : 11;
    for (let i = 0; i < n; i++) {
      sh.push({
        a: radial ? rand(0, TAU) : -Math.PI / 2 + rand(-1.2, 1.2),
        len: radial ? rand(50, 140) : rand(90, 230),
        w: rand(7, 16),
        g: 0,
        d: rand(0, 0.4),
        t: 0
      });
    }
    return { x, y, sh };
  };

  function shard(g, x, y, s) {
    const e = ease(s.g), L = s.len * e;
    if (L < 1) return;
    const ax = Math.cos(s.a), ay = Math.sin(s.a), px = -ay, py = ax, w = s.w * e, tx = x + ax * L, ty = y + ay * L;
    g.beginPath(); g.moveTo(x + px * w, y + py * w); g.lineTo(tx, ty); g.lineTo(x - px * w, y - py * w); g.closePath();
    g.fillStyle = rgba(c.accent, 0.75); g.fill();
    g.strokeStyle = '#ffffff'; g.lineWidth = 1.5; g.stroke();
    g.globalAlpha = 0.5;
    g.beginPath(); g.moveTo(x, y); g.lineTo(tx, ty); g.stroke();
    g.globalAlpha = 1;
  }

  return {
    resize(w, h) {
      W = w; H = h;
      base = mk(w * 0.48, h + 10, false);
    },
    move(x, y) {
      if (!last || Math.hypot(x - last.x, y - last.y) > 14) {
        last = { x, y };
        frost.push({ x, y, life: 1, r: rand(1.5, 3.5) });
      }
    },
    click(x, y) {
      synth.ice();
      clusters.push(mk(x, y, true));
      if (clusters.length > 6) clusters.shift();
    },
    update(dt, t, p = 0.5) {
      if (base) {
        for (const s of base.sh) s.g = clamp((p - 0.12) * 2.4 - s.d);
      }
      for (const cl of clusters) {
        for (const s of cl.sh) { s.t += dt; s.g = clamp((s.t - s.d * 0.5) * 3); }
      }
      for (const f of frost) { f.life -= dt * 0.7; f.y += dt * 14; }
      frost = frost.filter(f => f.life > 0);
    },
    draw(g) {
      if (base) for (const s of base.sh) shard(g, base.x, base.y, s);
      for (const cl of clusters) for (const s of cl.sh) shard(g, cl.x, cl.y, s);
      g.fillStyle = '#ffffff';
      for (const f of frost) {
        g.globalAlpha = f.life; g.beginPath();
        g.moveTo(f.x, f.y - f.r * 1.6); g.lineTo(f.x + f.r, f.y);
        g.lineTo(f.x, f.y + f.r * 1.6); g.lineTo(f.x - f.r, f.y);
        g.closePath(); g.fill();
      }
      g.globalAlpha = 1;
    }
  };
}
