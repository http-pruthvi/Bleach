import { TAU, rand, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxKenpachi(c) {
  let W = 0, H = 0, slashes = [], flames = [], shake = 0;
  const RM = isReducedMotion();

  function cleave(x, y) {
    synth.kenpachi();
    shake = 18;
    const a = rand(-0.8, -0.4), L = Math.max(W, H) * 0.85;
    slashes.push({
      ax: x - Math.cos(a) * L / 2, ay: y - Math.sin(a) * L / 2,
      bx: x + Math.cos(a) * L / 2, by: y + Math.sin(a) * L / 2,
      age: 0
    });
    for (let i = 0; i < 20; i++) {
      flames.push({ x, y, vx: rand(-250, 250), vy: rand(-350, -80), r: rand(3, 8), life: 1 });
    }
  }

  return {
    resize(w, h) { W = w; H = h; },
    move() {},
    click: cleave,
    update(dt) {
      if (!RM && flames.length < 90 && Math.random() < 0.5) {
        flames.push({ x: rand(0, W), y: H + 10, vx: rand(-30, 30), vy: -rand(90, 220), r: rand(2.5, 6), life: 1 });
      }
      for (const f of flames) { f.x += f.vx * dt; f.y += f.vy * dt; f.life -= dt * 0.35; }
      flames = flames.filter(f => f.life > 0);
      for (const s of slashes) s.age += dt;
      slashes = slashes.filter(s => s.age < 0.8);
      shake = Math.max(0, shake - dt * 35);
    },
    draw(g) {
      g.save();
      if (shake > 0) g.translate(rand(-shake, shake), rand(-shake, shake));
      for (const f of flames) {
        g.globalAlpha = f.life * 0.75;
        g.fillStyle = c.accent;
        g.beginPath(); g.arc(f.x, f.y, f.r, 0, TAU); g.fill();
      }
      for (const s of slashes) {
        const k = Math.min(1, s.age / 0.1), alpha = 1 - s.age / 0.8;
        g.save();
        g.shadowColor = c.accent; g.shadowBlur = 25;
        g.strokeStyle = c.accent; g.lineWidth = 12 * alpha;
        g.beginPath(); g.moveTo(s.ax, s.ay); g.lineTo(s.ax + (s.bx - s.ax) * k, s.ay + (s.by - s.ay) * k); g.stroke();
        g.strokeStyle = '#ffffff'; g.lineWidth = 4 * alpha;
        g.beginPath(); g.moveTo(s.ax, s.ay); g.lineTo(s.ax + (s.bx - s.ax) * k, s.ay + (s.by - s.ay) * k); g.stroke();
        g.restore();
      }
      g.restore();
      g.globalAlpha = 1;
    }
  };
}
