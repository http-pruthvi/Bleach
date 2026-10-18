import { TAU, rgba } from './utils.js';
import { synth } from '../audio/synth.js';

export function fxUryu(c) {
  let W = 0, H = 0, aim = null, arrows = [], bursts = [];

  const fire = (x, y) => {
    synth.arrow();
    arrows.push({ x, y, age: 0, hit: false });
  };

  return {
    resize(w, h) { W = w; H = h; },
    move(x, y) { aim = { x, y }; },
    click(x, y) { aim = { x, y }; fire(x, y); },
    update(dt) {
      for (const a of arrows) {
        a.age += dt;
        if (!a.hit && a.age >= 0.2) {
          a.hit = true;
          bursts.push({ x: a.x, y: a.y, age: 0 });
        }
      }
      arrows = arrows.filter(a => a.age < 0.6);
      for (const b of bursts) b.age += dt;
      bursts = bursts.filter(b => b.age < 0.6);
    },
    draw(g, t) {
      const ox = W * 0.5, oy = H + 10, cx = W * 0.68, cy = H * 0.32, R = Math.min(W, H) * 0.17, rot = t * 0.15;
      g.strokeStyle = rgba(c.accent, 0.5); g.lineWidth = 2;
      g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke();
      g.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = rot + ((i * 2) % 5) * TAU / 5 - Math.PI / 2;
        g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      }
      g.closePath(); g.stroke();

      if (aim) {
        g.strokeStyle = rgba(c.accent, 0.8); g.lineWidth = 1.5;
        g.beginPath(); g.arc(aim.x, aim.y, 20, 0, TAU);
        g.moveTo(aim.x - 32, aim.y); g.lineTo(aim.x - 8, aim.y);
        g.moveTo(aim.x + 8, aim.y); g.lineTo(aim.x + 32, aim.y);
        g.moveTo(aim.x, aim.y - 32); g.lineTo(aim.x, aim.y - 8);
        g.moveTo(aim.x, aim.y + 8); g.lineTo(aim.x, aim.y + 32);
        g.stroke();

        g.setLineDash([4, 8]); g.globalAlpha = 0.3;
        g.beginPath(); g.moveTo(ox, oy); g.lineTo(aim.x, aim.y); g.stroke();
        g.setLineDash([]); g.globalAlpha = 1;
      }

      for (const a of arrows) {
        const k = Math.min(1, a.age / 0.2), k0 = Math.max(0, k - 0.4);
        g.save();
        g.globalAlpha = 1 - Math.max(0, (a.age - 0.2) / 0.4);
        g.shadowColor = c.accent; g.shadowBlur = 14;
        g.strokeStyle = '#ffffff'; g.lineWidth = 3; g.lineCap = 'round';
        g.beginPath();
        g.moveTo(ox + (a.x - ox) * k0, oy + (a.y - oy) * k0);
        g.lineTo(ox + (a.x - ox) * k, oy + (a.y - oy) * k);
        g.stroke();
        g.restore();
      }

      g.strokeStyle = '#ffffff'; g.lineWidth = 2;
      for (const b of bursts) {
        g.globalAlpha = 1 - b.age / 0.6;
        g.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = i * TAU / 10, r0 = b.age * 60, r1 = b.age * 160 + 10;
          g.moveTo(b.x + Math.cos(a) * r0, b.y + Math.sin(a) * r0);
          g.lineTo(b.x + Math.cos(a) * r1, b.y + Math.sin(a) * r1);
        }
        g.stroke();
      }
      g.globalAlpha = 1;
    }
  };
}
