import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function ByakuyaLayout({ character, theme }) {
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
      className="byakuya-layout-root"
      style={{
        '--bg-sakura': '#f7e4ea',
        '--ink-plum': '#3a1d2b',
        '--accent-rose': '#d1517a',
        minHeight: '100vh',
        background: 'var(--bg-sakura)',
        color: 'var(--ink-plum)',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      <header
        style={{
          position: 'absolute',
          top: '32px',
          left: '8vw',
          right: '8vw',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TransitionLink
          to="/#cast"
          style={{
            background: 'var(--ink-plum)',
            color: '#ffffff',
            padding: '8px 22px',
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textDecoration: 'none',
            border: '1px solid var(--ink-plum)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/toshiro"
          charId="toshiro"
          style={{
            background: '#bfeaf5',
            color: '#07324a',
            padding: '8px 20px',
            fontSize: '0.85rem',
            textDecoration: 'none',
            border: '1px solid var(--ink-plum)'
          }}
        >
          Toshiro Hitsugaya →
        </TransitionLink>
      </header>

      {/* Hero: Very wide margins, single vertical column of copy, petal field behind */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '140px 10vw 80px 10vw',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 480px) 1fr',
          alignItems: 'center',
          gap: '60px'
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

        {/* Vertical Kanji: 千本桜景厳 */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '6vw',
            top: '12vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(4rem, 10vw, 11rem)',
            fontWeight: 800,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--ink-plum)' }}>
            千本桜
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-plum)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            千本桜
          </div>
        </div>

        {/* Single Vertical Column Copy */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            background: 'rgba(255, 255, 255, 0.92)',
            border: '2px solid var(--ink-plum)',
            padding: '48px 40px',
            boxShadow: '8px 8px 0px rgba(58, 29, 43, 0.15)'
          }}
        >
          <div style={{ fontSize: '0.9rem', color: 'var(--accent-rose)', letterSpacing: '0.2em', marginBottom: '8px' }}>
            朽木 白哉 • 28TH HEAD OF KUCHIKI CLAN
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              margin: '0 0 16px 0',
              lineHeight: 1.05
            }}
          >
            Byakuya Kuchiki
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--ink-plum)',
              color: '#ffffff',
              padding: '4px 14px',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              marginBottom: '20px'
            }}
          >
            Captain of the 6th Division
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#301824', margin: '0 0 24px 0' }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.82rem', color: 'var(--accent-rose)', letterSpacing: '0.08em' }}>
            ◆ Scatter Senbonzakura blades across the wind
          </div>
        </div>

        {/* Figure Cutout */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            height: 'clamp(460px, 78vh, 720px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/byakuya.png"
            alt="Byakuya Kuchiki"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(8px 8px 0px var(--ink-plum))'
            }}
          />
        </div>
      </section>

      {/* Noble Zanpakuto Architecture */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '3px solid var(--ink-plum)',
          padding: '80px 10vw'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 500, textAlign: 'center', marginBottom: '40px' }}>
            Senbonzakura Kageyoshi • Forms of Scattering
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--ink-plum)',
                  padding: '30px',
                  background: 'var(--bg-sakura)',
                  boxShadow: '4px 4px 0px var(--ink-plum)'
                }}
              >
                <div style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '6px' }}>
                  SCATTER FORM 0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.4rem', margin: '0 0 12px 0' }}>{step.name}</h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
