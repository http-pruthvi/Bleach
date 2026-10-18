/**
 * PROCEDURAL WEB AUDIO SYNTHESIZER
 * Zero external audio files. 100% synthesized anime effects.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.master = null;
  }

  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 0.6;
        this.master.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.muted = !this.muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.6, this.ctx.currentTime, 0.05);
    }
    return !this.muted;
  }

  play(fn) {
    if (this.muted || !this.ctx) return;
    try {
      fn(this.ctx, this.master);
    } catch (e) {}
  }

  slash() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.35);
      g.gain.setValueAtTime(0.7, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(g); g.connect(m);
      osc.start(now); osc.stop(now + 0.35);
    });
  }

  frost() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      [1046.5, 1318.5, 1567.98, 2093].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.04);
        g.gain.setValueAtTime(0.2, now + i * 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + i * 0.1);
        o.connect(g); g.connect(m);
        o.start(now + i * 0.04); o.stop(now + 0.9 + i * 0.1);
      });
    });
  }

  shield() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach(f => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'triangle'; o.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(0.25, now);
        g.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        o.connect(g); g.connect(m);
        o.start(now); o.stop(now + 0.6);
      });
    });
  }

  punch() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(160, now);
      o.frequency.exponentialRampToValueAtTime(30, now + 0.4);
      g.gain.setValueAtTime(0.9, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      o.connect(g); g.connect(m);
      o.start(now); o.stop(now + 0.45);
    });
  }

  arrow() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(260, now);
      o.frequency.exponentialRampToValueAtTime(2200, now + 0.12);
      g.gain.setValueAtTime(0.4, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      o.connect(g); g.connect(m);
      o.start(now); o.stop(now + 0.35);
    });
  }

  whip() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square'; o.frequency.setValueAtTime(800, now);
      o.frequency.exponentialRampToValueAtTime(100, now + 0.2);
      g.gain.setValueAtTime(0.5, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      o.connect(g); g.connect(m);
      o.start(now); o.stop(now + 0.2);
    });
  }

  petals() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      [880, 1174.6, 1396.9, 1760].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.04);
        g.gain.setValueAtTime(0.18, now + i * 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + i * 0.1);
        o.connect(g); g.connect(m);
        o.start(now + i * 0.04); o.stop(now + 0.7 + i * 0.1);
      });
    });
  }

  ice() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      [659.25, 987.77, 1318.5, 1975.5].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'triangle'; o.frequency.setValueAtTime(f, now + i * 0.03);
        g.gain.setValueAtTime(0.25, now + i * 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + i * 0.05);
        o.connect(g); g.connect(m);
        o.start(now + i * 0.03); o.stop(now + 0.6 + i * 0.05);
      });
    });
  }

  kenpachi() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(140, now);
      o.frequency.exponentialRampToValueAtTime(35, now + 0.5);
      g.gain.setValueAtTime(1.0, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      o.connect(g); g.connect(m);
      o.start(now); o.stop(now + 0.5);
    });
  }

  shatter() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      [1480, 2220, 2960, 3700].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.02);
        g.gain.setValueAtTime(0.3, now + i * 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        o.connect(g); g.connect(m);
        o.start(now + i * 0.02); o.stop(now + 0.5);
      });
    });
  }

  thunder() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(880, now);
      o.frequency.exponentialRampToValueAtTime(80, now + 0.4);
      g.gain.setValueAtTime(0.8, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      o.connect(g); g.connect(m);
      o.start(now); o.stop(now + 0.4);
    });
  }

  comic() {
    this.play((ctx, m) => {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(300, now);
      o.frequency.exponentialRampToValueAtTime(850, now + 0.15);
      o.frequency.exponentialRampToValueAtTime(400, now + 0.3);
      g.gain.setValueAtTime(0.7, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      o.connect(g); g.connect(m);
      o.start(now); o.stop(now + 0.35);
    });
  }

  playByFx(fxType) {
    switch (fxType) {
      case 'fire':
      case 'blades': this.slash(); break;
      case 'ice': this.ice(); break;
      case 'lightning': this.thunder(); break;
      case 'shield': this.shield(); break;
      case 'earth': this.punch(); break;
      case 'arrows': this.arrow(); break;
      case 'petals': this.petals(); break;
      case 'illusion': this.shatter(); break;
      default: this.slash(); break;
    }
  }
}

export const synth = new SoundEngine();
