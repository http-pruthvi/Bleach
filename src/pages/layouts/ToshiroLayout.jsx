import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function ToshiroLayout({ character, theme }) {
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
      className="toshiro-layout-root"
      style={{
        '--bg-frost': '#bfeaf5',
        '--ink-deep-blue': '#07324a',
        '--accent-cyan': '#2fa8d8',
        minHeight: '100vh',
        background: 'var(--bg-frost)',
        color: 'var(--ink-deep-blue)',
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
            background: 'var(--ink-deep-blue)',
            color: '#ffffff',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px rgba(7, 50, 74, 0.25)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/kenpachi"
          charId="kenpachi"
          style={{
            background: '#eab308',
            color: '#18181b',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            border: '2px solid var(--ink-deep-blue)',
            boxShadow: '3px 3px 0px var(--ink-deep-blue)'
          }}
        >
          Kenpachi Zaraki →
        </TransitionLink>
      </header>

      {/* Hero: Ice Growth Composition Rising from the Bottom */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '100px 6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
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

        {/* Jagged Ice Crystals Polygon Rising from Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '320px',
            background: '#ffffff',
            clipPath: 'polygon(0% 100%, 0% 45%, 8% 20%, 18% 50%, 28% 10%, 42% 40%, 55% 5%, 68% 35%, 82% 15%, 92% 45%, 100% 25%, 100% 100%)',
            zIndex: 2,
            opacity: 0.9,
            pointerEvents: 'none'
          }}
        />

        {/* Giant Vertical Kanji: 氷輪丸 (Hyorinmaru) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '3vw',
            top: '8vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 14vw, 14rem)',
            fontWeight: 900,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '2px var(--ink-deep-blue)' }}>
            氷輪丸
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-deep-blue)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            氷輪丸
          </div>
        </div>

        {/* Copy on Flat Frosted Paper Panel (No Blur) */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '520px',
            background: '#ffffff',
            border: '4px solid var(--ink-deep-blue)',
            boxShadow: '8px 8px 0px var(--ink-deep-blue)',
            padding: '36px'
          }}
        >
          <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
            日番谷 冬獅郎
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              margin: '8px 0 14px 0',
              lineHeight: 1.05
            }}
          >
            Toshiro Hitsugaya
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--ink-deep-blue)',
              color: '#ffffff',
              padding: '4px 12px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              marginBottom: '16px'
            }}
          >
            Captain of the 10th Division
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.7, margin: '0 0 16px 0', color: '#163654' }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>
            ◆ Click canvas to summon soaring ice dragon wings
          </div>
        </div>

        {/* Figure Cutout */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(300px, 38vw, 540px)',
            height: 'clamp(460px, 75vh, 700px)',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/toshiro.png"
            alt="Toshiro Hitsugaya"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(8px 8px 0px var(--ink-deep-blue))'
            }}
          />
        </div>
      </section>

      {/* Daiguren Hyorinmaru Ice Petals */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '5px solid var(--ink-deep-blue)',
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>
            DAIGUREN HYORINMARU • ICE FORMS
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-frost)',
                  border: '3px solid var(--ink-deep-blue)',
                  boxShadow: '6px 6px 0px var(--ink-deep-blue)',
                  padding: '28px'
                }}
              >
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px' }}>
                  GLACIAL BLOOM 0{idx + 1}
                </div>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.4rem', margin: '0 0 12px 0' }}>{step.name}</h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
