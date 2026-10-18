import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CharacterScene } from '../components/CharacterScene';
import { FactionGrid } from '../components/FactionGrid';
import { SideDots } from '../components/SideDots';
import { TIER_A_CHARACTERS } from '../data/loader';
import { synth } from '../audio/synth.js';
import { clamp, ease } from '../fx/utils';

export function Home({ onOpenSearch }) {
  const [sfxOn, setSfxOn] = useState(false);
  const [activeDotId, setActiveDotId] = useState('hero');
  const tickingRef = useRef(false);

  const handleScrollTo = (id) => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (el.classList.contains('char-scene')) {
      const cast = document.getElementById('cast');
      const castTop = cast ? cast.offsetTop : 0;
      const top = castTop + el.offsetTop + 0.5 * (el.offsetHeight - window.innerHeight);
      window.scrollTo({ top, behavior: RM ? 'auto' : 'smooth' });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: RM ? 'auto' : 'smooth' });
    }
  };

  useEffect(() => {
    const update = () => {
      tickingRef.current = false;
      const vh = window.innerHeight;
      const hero = document.getElementById('hero');
      const wa = document.getElementById('hero-wa');
      const wb = document.getElementById('hero-wb');
      const band = document.getElementById('hero-band');
      const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Hero scroll scrub: word split & band clip-path
      if (hero && band && wa && wb) {
        const hp = clamp(-hero.getBoundingClientRect().top / vh);
        if (!RM) {
          wa.style.transform = `translate(${-hp * 24}vw, ${-hp * 6}vh)`;
          wb.style.transform = `translate(${hp * 24}vw, ${hp * 6}vh)`;
          const g = 25.44 * hp;
          band.style.clipPath = `polygon(${62 - g}% 0, ${62 + g}% 0, ${38 + g}% 100%, ${38 - g}% 100%)`;
        }
      }

      // 2. Character scenes diagonal slice, kanji fill, figure parallax
      let activeId = 'hero';
      const scenes = document.querySelectorAll('.char-scene');
      scenes.forEach((scene, i) => {
        const pin = scene.querySelector('.scene-pin');
        const fill = scene.querySelector('.scene-kanji .fill');
        const kan = scene.querySelector('.scene-kanji');
        const fig = scene.querySelector('.scene-fig');
        if (!pin) return;

        const r = scene.getBoundingClientRect();
        const p = -r.top / (r.height - vh);
        const clampedP = clamp(p);

        // Diagonal slice entrance
        const w = RM ? 1 : ease(clamp(p / 0.16));
        const X = w * 130;
        pin.style.clipPath = w >= 1 ? 'none' : (i % 2 === 0
          ? `polygon(0 0, ${X}% 0, ${X - 30}% 100%, 0 100%)`
          : `polygon(100% 0, ${100 - X}% 0, ${130 - X}% 100%, 100% 100%)`);

        // Kanji fill from top to bottom
        if (fill) {
          const f = RM ? 1 : ease(clamp((p - 0.12) / 0.4));
          fill.style.clipPath = `inset(0 0 ${(1 - f) * 100}% 0)`;
        }

        // Kanji subtle vertical parallax
        if (kan && !RM) {
          kan.style.transform = `translateY(${(0.5 - clampedP) * 8}vh)`;
        }

        // Figure slide-in and exit
        if (fig) {
          const dir = i % 2 === 0 ? 1 : -1;
          const enter = ease(clamp((p - 0.1) / 0.2));
          const exit = clamp((p - 0.88) / 0.1);
          fig.style.transform = RM ? 'none' : `translate(${(1 - enter) * dir * -30}vw, ${(0.5 - clampedP) * -4}vh) scale(${0.94 + 0.06 * enter})`;
          fig.style.opacity = RM ? 1 : enter;
          fig.style.clipPath = exit > 0 ? `polygon(0 0, ${100 - exit * 100}% 0, ${100 - exit * 130}% 100%, 0 100%)` : 'none';
        }

        if (p >= 0) {
          activeId = scene.id;
        }
      });

      // 3. Faction roster section detection
      const factions = document.getElementById('factions');
      if (factions) {
        const fr = factions.getBoundingClientRect();
        if (fr.top <= vh * 0.5) {
          activeId = 'factions';
        }
      }

      setActiveDotId(activeId);
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    // Check if URL has hash (e.g. from detail page back button)
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      setTimeout(() => {
        handleScrollTo(targetId);
      }, 150);
    }

    const onHashChange = () => {
      if (window.location.hash) {
        handleScrollTo(window.location.hash.replace('#', ''));
      }
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const handleToggleSfx = () => {
    const on = synth.toggle();
    setSfxOn(on);
  };

  const dotItems = [
    { id: 'hero', name: 'Intro' },
    ...TIER_A_CHARACTERS.map(c => ({ id: c.id, name: c.name })),
    { id: 'factions', name: 'Roster' }
  ];

  return (
    <div className="home-container">
      {/* Fixed Header Controls */}
      <header className="top-nav" role="banner">
        <div className="top-nav-left">
          <Link to="/" className="brand-badge" aria-label="Bleach Tribute Home">
            BLEACH
          </Link>
          <button
            className="nav-btn"
            id="sfx-btn"
            onClick={handleToggleSfx}
            aria-label="Toggle anime sound effects"
          >
            {sfxOn ? 'SFX: ON' : 'SFX: OFF'}
          </button>
          <Link
            to="/gotei13"
            className="nav-btn"
            aria-label="View Gotei 13 organization chart"
          >
            護廷 GOTEI 13 CHART
          </Link>
        </div>

        <div className="top-nav-right">
          <button
            className="nav-btn search-nav-btn"
            onClick={onOpenSearch}
            aria-label="Search all characters"
          >
            <svg
              className="search-nav-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>SEARCH [/]</span>
          </button>
        </div>
      </header>

      {/* Side Dots Navigation */}
      <SideDots
        items={dotItems}
        activeId={activeDotId}
        onSelect={handleScrollTo}
      />

      {/* 1. Hero */}
      <Hero onScrollCueClick={() => handleScrollTo(TIER_A_CHARACTERS[0].id)} />

      {/* 2. Tier A Pinned Character Scenes */}
      <main id="cast">
        {TIER_A_CHARACTERS.map((char, idx) => (
          <CharacterScene
            key={char.id}
            character={char}
            index={idx}
          />
        ))}
      </main>

      {/* 3. Full 100+ Faction Roster Grid */}
      <FactionGrid />

      {/* 4. Footer */}
      <footer className="home-footer" id="footer">
        <div className="footer-content">
          <p className="footer-title">BLEACH // THOUSAND BLADES FAN TRIBUTE</p>
          <p className="footer-copy">
            A fan tribute created for lovers of Tite Kubo's manga and anime masterpieces.
            Bleach belongs to Tite Kubo, Shueisha, and Studio Pierrot. All procedural canvas effects and Web Audio synthesizers execute live in browser.
          </p>
          <div className="footer-links">
            <Link to="/gotei13" className="footer-link">Gotei 13 Organization Chart</Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-kon-easter-egg'))}
              className="footer-link"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
              title="Shinigami Illustrated Picture Book Golden Secret Episode"
            >
              死神図鑑 [KON]
            </button>
            <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('hero'); }} className="footer-link">Back to Top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
