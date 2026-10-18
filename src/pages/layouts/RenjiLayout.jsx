import React, { useEffect, useState, useRef } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function RenjiLayout({ character, theme }) {
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
      className="renji-layout-root"
      style={{
        '--bg-crimson': '#b3121f',
        '--ink-white': '#ffffff',
        '--accent-flame': '#ff5a0a',
        minHeight: '100vh',
        background: 'var(--bg-crimson)',
        color: 'var(--ink-white)',
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
            background: '#ffffff',
            color: '#b3121f',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px #000000'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/byakuya"
          charId="byakuya"
          style={{
            background: '#f7e4ea',
            color: '#3a1d2b',
            border: '2px solid #ffffff',
            padding: '6px 14px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.75rem',
            textDecoration: 'none',
            boxShadow: '3px 3px 0px #000000'
          }}
        >
          Byakuya Kuchiki →
        </TransitionLink>
      </header>

      {/* Hero Stage */}
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

        {/* Giant Vertical Kanji: 蛇尾丸 (Zabimaru) */}
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
          <div style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff' }}>
            蛇尾丸
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: '#ffffff',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            蛇尾丸
          </div>
        </div>

        {/* Copy Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '520px',
            background: '#1a0406',
            border: '4px solid #ffffff',
            boxShadow: '10px 10px 0px #000000',
            padding: '36px'
          }}
        >
          <div style={{ color: 'var(--accent-flame)', fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem' }}>
            阿散井 恋次
          </div>
          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              margin: '8px 0 16px 0',
              lineHeight: 1
            }}
          >
            Renji Abarai
          </h1>
          <div
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#b3121f',
              padding: '4px 10px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              marginBottom: '16px'
            }}
          >
            Lieutenant of the 6th Division
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, margin: '0 0 16px 0', color: '#f5dada' }}>
            {character.blurb}
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-flame)', fontWeight: 800 }}>
            ◆ Click screen to strike with articulated whip-blade
          </div>
        </div>

        {/* Official Renji Cutout */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(320px, 40vw, 560px)',
            height: 'clamp(460px, 75vh, 700px)',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/renji.png"
            alt="Renji Abarai"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(10px 10px 0px #000000)'
            }}
          />
        </div>
      </section>

      {/* Horizontal Chain Story: Zabimaru Links */}
      <section
        style={{
          background: '#0c0203',
          borderTop: '5px solid #ffffff',
          padding: '80px 4vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>
            THE LINKS OF ZABIMARU
          </h2>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              paddingBottom: '24px'
            }}
          >
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: '320px',
                  maxWidth: '380px',
                  background: 'var(--bg-crimson)',
                  border: '3px solid #ffffff',
                  boxShadow: '8px 8px 0px #000000',
                  padding: '30px',
                  position: 'relative',
                  flexShrink: 0
                }}
              >
                {/* Connecting chain vertebra icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '20px',
                    background: '#ffffff',
                    color: '#b3121f',
                    padding: '2px 10px',
                    fontFamily: "'Dela Gothic One', sans-serif",
                    fontSize: '0.72rem'
                  }}
                >
                  CHAIN SEGMENT {idx + 1}
                </div>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.4rem', margin: '14px 0 10px 0' }}>
                  {step.name}
                </h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: '#fbebeb', margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
