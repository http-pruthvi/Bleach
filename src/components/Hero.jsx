import React from 'react';

export function Hero({ onScrollCueClick }) {
  return (
    <header className="hero-wrapper" id="hero">
      <div className="hero-pin">
        <div className="hero-band" id="hero-band" aria-hidden="true" />
        <div className="hero-word a" id="hero-wa" aria-hidden="true">死神</div>
        <div className="hero-word b" id="hero-wb" aria-hidden="true">死神</div>
        <svg className="hero-cutline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="62" y1="0" x2="38" y2="100" />
        </svg>

        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-tag">SOUL REAPER CHRONICLES // VOL. 01</p>
            <h1 className="hero-title">BLEACH</h1>
            <p className="hero-sub">
              Over one hundred souls from Karakura Town, the Soul Society, Hueco Mundo, and the Silbern, rendered in living code and reactive Zanpakuto arts.
            </p>
          </div>

          <button
            className="hero-cue"
            onClick={onScrollCueClick}
            aria-label="Scroll to characters"
          >
            <span>SCROLL</span>
            <span className="hero-arrow">↓</span>
          </button>
        </div>
      </div>
    </header>
  );
}
