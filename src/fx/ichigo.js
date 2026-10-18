import { TAU, clamp, rand, rgba, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxIchigo(c) {
  let W = 0, H = 0, slashes = [], embers = [], flash = 0, shake = 0;
  const RM = isReducedMotion();

  function cut(x, y) {
    synth.slash();
    const ang = rand(-1.0, -0.5);
    const L = Math.max(W, H) * 0.75;
    const dx = Math.cos(ang) * L / 2;
    const dy = Math.sin(ang) * L / 2;
    slashes.push({
      ax: x - dx, ay: y - dy,
      bx: x + dx, by: y + dy,
      age: 0,
      bulge: rand(35, 70) * (Math.random() < 0.5 ? -1 : 1)
    });
    flash = 0.5;
    shake = 8;
  }

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click: cut,
    update(dt, t, p = 0.5) {
      if (!RM && embers.length < 70 && Math.random() < 0.45) {
        embers.push({
          x: rand(0, W), y: H + 10,
          vx: rand(-25, 25), vy: -rand(60, 150) * (1 + p),
          r: rand(1.5, 4), life: 1
        });
      }
      for (const e of embers) {
        e.x += e.vx * dt; e.y += e.vy * dt;
        e.life -= dt * 0.22;
      }
      embers = embers.filter(e => e.life > 0);
      for (const s of slashes) s.age += dt;
      slashes = slashes.filter(s => s.age < 0.9);
      flash = Math.max(0, flash - dt * 2.2);
      shake = Math.max(0, shake - dt * 30);
    },
    draw(g) {
      g.save();
      if (shake > 0) g.translate(rand(-shake, shake), rand(-shake, shake));
      g.fillStyle = c.ink;
      for (const e of embers) {
        g.globalAlpha = e.life * 0.6;
        g.beginPath(); g.arc(e.x, e.y, e.r, 0, TAU); g.fill();
      }
      for (const s of slashes) {
        const k = Math.min(1, s.age / 0.12);
        const f = 1 - clamp((s.age - 0.12) / 0.78);
        const ex = s.ax + (s.bx - s.ax) * k, ey = s.ay + (s.by - s.ay) * k;
        const mx = (s.ax + ex) / 2, my = (s.ay + ey) / 2;
        const nx = -(ey - s.ay), ny = ex - s.ax;
        const nl = Math.hypot(nx, ny) || 1;
        const bx = nx / nl * s.bulge * f, by = ny / nl * s.bulge * f;

        g.globalAlpha = f;
        g.beginPath();
        g.moveTo(s.ax, s.ay);
        g.quadraticCurveTo(mx + bx, my + by, ex, ey);
        g.quadraticCurveTo(mx + bx * 0.2, my + by * 0.2, s.ax, s.ay);
        g.fillStyle = c.ink; g.fill();
        g.strokeStyle = '#ffffff'; g.lineWidth = 2; g.stroke();
      }
      g.restore();
      if (flash > 0) {
        g.globalAlpha = flash * 0.5;
        g.fillStyle = '#ffffff';
        g.fillRect(0, 0, W, H);
      }
      g.globalAlpha = 1;
    }
  };
}
