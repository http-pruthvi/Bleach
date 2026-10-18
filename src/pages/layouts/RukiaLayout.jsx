import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function RukiaLayout({ character, theme }) {
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
      className="rukia-layout-root"
      style={{
        '--bg-ice': '#e6f0f8',
        '--ink-ice': '#0b2a45',
        '--accent-ice': '#3f8fd0',
        minHeight: '100vh',
        background: 'var(--bg-ice)',
        color: 'var(--ink-ice)',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      {/* 1. Centered Monument Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '40px 20px 80px 20px'
        }}
      >
        {/* Falling Snow Canvas */}
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

        {/* Top Navigation */}
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
              background: 'var(--ink-ice)',
              color: '#ffffff',
              padding: '8px 18px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              borderRadius: '2px',
              boxShadow: '4px 4px 0px rgba(11, 42, 69, 0.25)'
            }}
          >
            ← MAIN ROSTER
          </TransitionLink>

          <div style={{ display: 'flex', gap: '10px' }}>
            <TransitionLink
              to="/character/byakuya"
              charId="byakuya"
              style={{
                background: '#f7e4ea',
                color: '#3a1d2b',
                border: '2px solid var(--ink-ice)',
                padding: '6px 14px',
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '0.75rem',
                textDecoration: 'none',
                boxShadow: '3px 3px 0px var(--ink-ice)'
              }}
            >
              Byakuya Kuchiki →
            </TransitionLink>
          </div>
        </header>

        {/* Monumental Crescent Moon Behind Figure */}
        <div
          style={{
            position: 'absolute',
            width: 'min(700px, 80vw)',
            height: 'min(700px, 80vw)',
            borderRadius: '50%',
            boxShadow: 'inset -50px -50px 0 0 #ffffff, inset -52px -52px 0 2px var(--accent-ice)',
            zIndex: 2,
            opacity: 0.85,
            pointerEvents: 'none'
          }}
        />

        {/* Giant Vertical Kanji: 袖白雪 (Sode no Shirayuki) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '6vw',
            top: '12vh',
            zIndex: 2,
            writingMode: 'vertical-rl',
            fontSize: 'clamp(4.5rem, 12vw, 12rem)',
            fontWeight: 800,
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '2px var(--ink-ice)' }}>
            袖白雪
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-ice)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            袖白雪
          </div>
        </div>

        {/* Centered Official Rukia Cutout */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(280px, 34vw, 480px)',
            height: 'clamp(440px, 68vh, 640px)',
            margin: '60px 0 20px 0',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/rukia.png"
            alt="Rukia Kuchiki"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(8px 8px 0px var(--ink-ice))'
            }}
          />
        </div>

        {/* Narrow Centered Column Copy */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            maxWidth: '560px',
            textAlign: 'center',
            padding: '24px 32px',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '3px solid var(--ink-ice)',
            boxShadow: '8px 8px 0px var(--ink-ice)'
          }}
        >
          <div
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.85rem',
              color: 'var(--accent-ice)',
              marginBottom: '4px'
            }}
          >
            朽木 ルキア
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2rem, 3.4vw, 3rem)',
              margin: '0 0 10px 0',
              color: 'var(--ink-ice)',
              letterSpacing: '0.02em'
            }}
          >
            Rukia Kuchiki
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--ink-ice)',
              color: '#ffffff',
              padding: '4px 12px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.72rem',
              marginBottom: '14px'
            }}
          >
            {character.divisionRank || 'Captain of the 13th Division'}
          </div>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--ink-ice)',
              margin: '0 0 16px 0'
            }}
          >
            {character.blurb}
          </p>

          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--accent-ice)'
            }}
          >
            ◆ Click screen to release Hakuren frost dance
          </div>
        </div>
      </section>

      {/* 2. Sode no Shirayuki Dances (Dance Steps) */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '4px solid var(--ink-ice)',
          borderBottom: '4px solid var(--ink-ice)',
          padding: '80px 6vw'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              textAlign: 'center',
              marginBottom: '50px'
            }}
          >
            The Dances of Sode no Shirayuki
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px'
            }}
          >
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-ice)',
                  border: '3px solid var(--ink-ice)',
                  boxShadow: '6px 6px 0px var(--ink-ice)',
                  padding: '28px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontFamily: "'Dela Gothic One', sans-serif", color: 'var(--accent-ice)' }}>
                    DANCE 0{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{step.title}</span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Dela Gothic One', sans-serif",
                    fontSize: '1.3rem',
                    margin: '0 0 12px 0'
                  }}
                >
                  {step.name}
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: '#163654', margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <footer
        style={{
          background: 'var(--ink-ice)',
          color: '#ffffff',
          padding: '40px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TransitionLink
          to="/character/ichigo"
          charId="ichigo"
          style={{
            background: '#ff5a0a',
            color: '#0c0c0c',
            padding: '10px 20px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px #ffffff'
          }}
        >
          ← Ichigo Kurosaki
        </TransitionLink>

        <TransitionLink
          to="/#cast"
          style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.9rem'
          }}
        >
          Main Roster
        </TransitionLink>
      </footer>
    </div>
  );
}
