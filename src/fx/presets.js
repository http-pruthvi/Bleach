import { fxIchigo } from './ichigo.js';
import { fxRukia } from './rukia.js';
import { fxOrihime } from './orihime.js';
import { fxChad } from './chad.js';
import { fxUryu } from './uryu.js';
import { fxRenji } from './renji.js';
import { fxByakuya } from './byakuya.js';
import { fxToshiro } from './toshiro.js';
import { fxKenpachi } from './kenpachi.js';
import { fxAizen } from './aizen.js';
import { fxYoruichi } from './yoruichi.js';
import { fxUrahara } from './urahara.js';
import { TAU, clamp, rand, rgba, isReducedMotion } from './utils.js';
import { synth } from '../audio/synth.js';

// Generic Fire / Spiritual Combustion Preset
function fxGenericFire(c) {
  let W = 0, H = 0, sparks = [];
  const acc = c.colors?.accent || c.accent || '#ff5a0a';
  return {
    resize(w, h) {
      W = w; H = h;
      if (sparks.length === 0) {
        for (let i = 0; i < 45; i++) {
          sparks.push({ x: rand(0, W), y: rand(0, H), vx: rand(-40, 40), vy: -rand(60, 160), r: rand(2.5, 6), life: rand(0.2, 1) });
        }
      }
    },
    move(x, y) {
      if (Math.random() < 0.7) {
        sparks.push({ x: x + rand(-15, 15), y: y + rand(-15, 15), vx: rand(-80, 80), vy: -rand(100, 220), r: rand(3, 7), life: 1 });
      }
    },
    click(x, y) {
      synth.slash();
      for (let i = 0; i < 35; i++) {
        sparks.push({ x, y, vx: rand(-240, 240), vy: rand(-320, -40), r: rand(3, 9), life: 1 });
      }
    },
    update(dt) {
      if (sparks.length < 50 && Math.random() < 0.6) {
        sparks.push({ x: rand(0, W), y: H + 10, vx: rand(-30, 30), vy: -rand(80, 200), r: rand(2, 5), life: 1 });
      }
      for (const s of sparks) { s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 0.45; }
      sparks = sparks.filter(s => s.life > 0);
    },
    draw(g) {
      g.save();
      for (const s of sparks) {
        g.globalAlpha = clamp(s.life) * 0.85;
        g.fillStyle = acc;
        g.shadowColor = acc;
        g.shadowBlur = 10;
        g.beginPath(); g.arc(s.x, s.y, s.r, 0, TAU); g.fill();
      }
      g.restore();
    }
  };
}

// Generic Hollow / Cero Pressure Preset
function fxGenericHollow(c) {
  let W = 0, H = 0, ceros = [], motes = [];
  const acc = c.colors?.accent || c.accent || '#10b981';
  return {
    resize(w, h) {
      W = w; H = h;
      if (motes.length === 0) {
        for (let i = 0; i < 40; i++) {
          motes.push({ x: rand(0, W), y: rand(0, H), r: rand(2, 5), pulse: rand(0, TAU), speed: rand(1, 3) });
        }
      }
    },
    move(x, y) {
      if (Math.random() < 0.35) {
        ceros.push({ x, y, r: 4, maxR: rand(40, 90), life: 0.6 });
      }
    },
    click(x, y) {
      synth.punch();
      ceros.push({ x, y, r: 12, maxR: rand(140, 260), life: 1 });
      ceros.push({ x, y, r: 6, maxR: rand(180, 320), life: 1.2 });
    },
    update(dt) {
      for (const m of motes) { m.pulse += dt * m.speed; }
      for (const ce of ceros) { ce.r += dt * 380; ce.life -= dt * 1.1; }
      ceros = ceros.filter(ce => ce.life > 0);
    },
    draw(g) {
      g.save();
      // Draw ambient hollow spirit motes
      for (const m of motes) {
        const a = (Math.sin(m.pulse) * 0.5 + 0.5) * 0.7;
        g.globalAlpha = a;
        g.fillStyle = acc;
        g.beginPath(); g.arc(m.x, m.y, m.r, 0, TAU); g.fill();
      }
      // Draw expanding Cero rings
      for (const ce of ceros) {
        g.globalAlpha = clamp(ce.life) * 0.85;
        g.strokeStyle = acc;
        g.shadowColor = acc;
        g.shadowBlur = 16;
        g.lineWidth = 4;
        g.beginPath(); g.arc(ce.x, ce.y, ce.r, 0, TAU); g.stroke();
      }
      g.restore();
    }
  };
}

// Generic Kido / Barrier Incantation Preset
function fxGenericKido(c) {
  let W = 0, H = 0, runes = [], motes = [];
  const acc = c.colors?.accent || c.accent || '#38bdf8';
  return {
    resize(w, h) {
      W = w; H = h;
      if (motes.length === 0) {
        for (let i = 0; i < 35; i++) {
          motes.push({ x: rand(0, W), y: rand(0, H), vx: rand(-20, 20), vy: rand(-20, 20), r: rand(2, 4.5), life: rand(0.3, 1) });
        }
      }
    },
    move(x, y) {
      if (Math.random() < 0.4) {
        runes.push({ x: x + rand(-10, 10), y: y + rand(-10, 10), r: rand(15, 30), life: 0.7, rot: rand(0, TAU) });
      }
    },
    click(x, y) {
      synth.shield();
      for (let i = 0; i < 3; i++) {
        runes.push({ x, y, r: 25 + i * 20, life: 1 + i * 0.2, rot: rand(0, TAU) });
      }
    },
    update(dt) {
      for (const m of motes) {
        m.x += m.vx * dt; m.y += m.vy * dt;
        if (m.x < 0) m.x = W; if (m.x > W) m.x = 0;
        if (m.y < 0) m.y = H; if (m.y > H) m.y = 0;
      }
      for (const r of runes) { r.r += dt * 140; r.rot += dt * 1.5; r.life -= dt * 0.9; }
      runes = runes.filter(r => r.life > 0);
    },
    draw(g) {
      g.save();
      // Draw floating reishi motes
      for (const m of motes) {
        g.globalAlpha = 0.5;
        g.fillStyle = acc;
        g.beginPath(); g.arc(m.x, m.y, m.r, 0, TAU); g.fill();
      }
      // Draw sacred geometric kido barriers
      for (const r of runes) {
        g.globalAlpha = clamp(r.life) * 0.9;
        g.strokeStyle = acc;
        g.shadowColor = acc;
        g.shadowBlur = 12;
        g.lineWidth = 2.5;
        g.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = r.rot + i * TAU / 6;
          const px = r.x + Math.cos(a) * r.r, py = r.y + Math.sin(a) * r.r;
          i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
        }
        g.closePath(); g.stroke();
      }
      g.restore();
    }
  };
}

// Generic Water / Torrent Preset
function fxGenericWater(c) {
  let W = 0, H = 0, ripples = [], droplets = [];
  const acc = c.colors?.accent || c.accent || '#0284c7';
  return {
    resize(w, h) {
      W = w; H = h;
      if (droplets.length === 0) {
        for (let i = 0; i < 40; i++) {
          droplets.push({ x: rand(0, W), y: rand(0, H), vy: rand(80, 220), r: rand(1.5, 4), len: rand(8, 20) });
        }
      }
    },
    move(x, y) {
      if (Math.random() < 0.4) {
        ripples.push({ x, y, r: 4, life: 0.6 });
      }
    },
    click(x, y) {
      synth.frost();
      for (let i = 0; i < 3; i++) {
        ripples.push({ x, y, r: 8 + i * 15, life: 1 + i * 0.15 });
      }
    },
    update(dt) {
      for (const d of droplets) {
        d.y += d.vy * dt;
        if (d.y > H) { d.y = 0; d.x = rand(0, W); }
      }
      for (const r of ripples) { r.r += dt * 280; r.life -= dt * 1.1; }
      ripples = ripples.filter(r => r.life > 0);
    },
    draw(g) {
      g.save();
      // Draw falling spiritual rain droplets
      g.strokeStyle = acc;
      g.lineWidth = 1.5;
      g.globalAlpha = 0.4;
      for (const d of droplets) {
        g.beginPath(); g.moveTo(d.x, d.y); g.lineTo(d.x, d.y + d.len); g.stroke();
      }
      // Draw ripples
      for (const r of ripples) {
        g.globalAlpha = clamp(r.life) * 0.8;
        g.strokeStyle = acc;
        g.shadowColor = acc;
        g.shadowBlur = 14;
        g.lineWidth = 2.5;
        g.beginPath(); g.arc(r.x, r.y, r.r, 0, TAU); g.stroke();
      }
      g.restore();
    }
  };
}

export const TIER_A_FX = {
  ichigo: fxIchigo,
  rukia: fxRukia,
  orihime: fxOrihime,
  chad: fxChad,
  uryu: fxUryu,
  renji: fxRenji,
  byakuya: fxByakuya,
  toshiro: fxToshiro,
  kenpachi: fxKenpachi,
  aizen: fxAizen,
  yoruichi: fxYoruichi,
  urahara: fxUrahara
};

export function getFxForCharacter(character) {
  if (!character) return fxIchigo;
  // Tier A specific effect
  if (TIER_A_FX[character.id]) {
    return TIER_A_FX[character.id];
  }
  // Generic preset by fxType
  switch (character.fxType) {
    case 'fire': return fxGenericFire;
    case 'ice': return fxRukia;
    case 'lightning': return fxYoruichi;
    case 'blades': return fxIchigo;
    case 'hollow': return fxGenericHollow;
    case 'arrows': return fxUryu;
    case 'kido': return fxGenericKido;
    case 'water': return fxGenericWater;
    case 'shadow': return fxAizen;
    case 'illusion': return fxAizen;
    case 'gravity': return fxAizen;
    case 'speed': return fxYoruichi;
    case 'petals': return fxByakuya;
    case 'earth': return fxChad;
    case 'shield': return fxOrihime;
    default: return fxIchigo;
  }
}
