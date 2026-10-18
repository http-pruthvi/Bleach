import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function KenpachiLayout({ character, theme }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const fxFactory = getFxForCharacter(character);
  const { canvasRef, triggerAction } = useCanvasFx({
    fxFactory,
    character,
    inView: true
  });

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(total > 0 ? Math.min(1, Math.max(0, current / total)) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="kenpachi-layout-root"
      style={{
        '--bg-amber': '#eab308',
        '--ink-black': '#18181b',
        '--accent-blood': '#dc2626',
        minHeight: '100vh',
        background: 'var(--bg-amber)',
        color: 'var(--ink-black)',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      <header
        style={{
          position: 'absolute',
          top: '24px',
          left: '4vw',
          right: '4vw',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TransitionLink
          to="/#cast"
          style={{
            background: 'var(--ink-black)',
            color: '#ffffff',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.4)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/aizen"
          charId="aizen"
          style={{
            background: '#e2e8f0',
            color: '#0f172a',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            border: '2px solid var(--ink-black)',
            boxShadow: '4px 4px 0px var(--ink-black)'
          }}
        >
          Sosuke Aizen →
        </TransitionLink>
      </header>

      {/* Hero: Torn-Paper Manga Collage with Rough Rotated Panels */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '100px 6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        <canvas
          ref={canvasRef}
          onClick={triggerAction}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            cursor: 'crosshair'
          }}
        />

        {/* Crude Brush Kanji: 剣八 (Kenpachi) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '2vw',
            top: '8vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 16vw, 16rem)',
            fontWeight: 900,
            zIndex: 2,
            pointerEvents: 'none',
            transform: 'rotate(-4deg)'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '3px var(--ink-black)' }}>
            野晒
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-black)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            野晒
          </div>
        </div>

        {/* Rotated Manga Panel 1: Profile & Title */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '520px',
            background: '#ffffff',
            border: '5px solid var(--ink-black)',
            boxShadow: '12px 12px 0px var(--ink-black)',
            padding: '40px',
            transform: 'rotate(-2.5deg)'
          }}
        >
          <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem', color: 'var(--accent-blood)' }}>
            更木 剣八 • ELEVENTH DIVISION
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              margin: '8px 0 16px 0',
              lineHeight: 0.95
            }}
          >
            Kenpachi Zaraki
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--accent-blood)',
              color: '#ffffff',
              padding: '4px 14px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              marginBottom: '18px'
            }}
          >
            Captain of the 11th Division • Berserker King
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: '0 0 18px 0', color: '#18181b', fontWeight: 600 }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.82rem', color: 'var(--accent-blood)', fontWeight: 800 }}>
            ◆ Click canvas to unleash raw spiritual skull explosion
          </div>
        </div>

        {/* Figure Cutout Breaking Panels */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(320px, 42vw, 580px)',
            height: 'clamp(460px, 78vh, 740px)',
            pointerEvents: 'none',
            transform: 'rotate(1.5deg)'
          }}
        >
          <img
            src="/assets/characters/kenpachi.png"
            alt="Kenpachi Zaraki"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(10px 10px 0px var(--ink-black))'
            }}
          />
        </div>
      </section>

      {/* Raw Brutal Steps */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '6px solid var(--ink-black)',
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.8rem', textAlign: 'center', marginBottom: '40px' }}>
            UNBRIDLED SAVAGERY • NOZARASHI
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-amber)',
                  border: '4px solid var(--ink-black)',
                  boxShadow: '8px 8px 0px var(--ink-black)',
                  padding: '30px',
                  transform: idx % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)'
                }}
              >
                <div style={{ fontFamily: "'Dela Gothic One', sans-serif", color: 'var(--accent-blood)', fontSize: '0.85rem' }}>
                  BRUTE FORCE 0{idx + 1}
                </div>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.4rem', margin: '6px 0 12px 0' }}>{step.name}</h3>
                <p style={{ fontSize: '0.96rem', lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
