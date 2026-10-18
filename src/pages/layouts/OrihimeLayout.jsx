import React, { useEffect, useState, useRef } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function OrihimeLayout({ character, theme }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="orihime-layout-root"
      style={{
        '--bg-peach': '#ffd9bd',
        '--ink-brown': '#4a1f1a',
        '--accent-rose': '#e8556d',
        minHeight: '100vh',
        background: 'var(--bg-peach)',
        color: 'var(--ink-brown)',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .orihime-hero {
            flex-direction: column !important;
            padding-top: 100px !important;
          }
          .orihime-figure {
            width: 260px !important;
            height: 420px !important;
            margin: 0 auto !important;
          }
          .orihime-hex-panel {
            width: calc(100% - 32px) !important;
            margin: 20px auto !important;
          }
        }
      `}</style>

      {/* Orbiting micro-petals around cursor */}
      <div
        style={{
          position: 'fixed',
          left: mousePos.x,
          top: mousePos.y,
          pointerEvents: 'none',
          zIndex: 9999
        }}
      >
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50% 0 50% 0',
              background: 'var(--accent-rose)',
              transform: `rotate(${deg + (Date.now() / 20) % 360}deg) translate(28px) rotate(45deg)`,
              opacity: 0.8
            }}
          />
        ))}
      </div>

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
            background: 'var(--ink-brown)',
            color: '#ffffff',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            borderRadius: '2px',
            boxShadow: '4px 4px 0px rgba(74, 31, 26, 0.25)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/chad"
          charId="chad"
          style={{
            background: '#e0a526',
            color: '#2a0f0a',
            border: '2px solid var(--ink-brown)',
            padding: '6px 14px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.75rem',
            textDecoration: 'none',
            boxShadow: '3px 3px 0px var(--ink-brown)'
          }}
        >
          Yasutora Sado →
        </TransitionLink>
      </header>

      {/* Hero: Figure Left, Rounded Hexagon Panel Right */}
      <section
        className="orihime-hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 6vw',
          position: 'relative'
        }}
      >
        {/* Canvas for Santen Kesshun shield flares */}
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

        {/* Kanji outline: 盾舜六花 */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '2vw',
            top: '8vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(4.5rem, 12vw, 13rem)',
            fontWeight: 900,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '2px var(--ink-brown)' }}>
            盾舜六花
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-brown)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            盾舜六花
          </div>
        </div>

        {/* Figure Left */}
        <div
          className="orihime-figure"
          style={{
            position: 'relative',
            zIndex: 3,
            width: 'clamp(300px, 36vw, 500px)',
            height: 'clamp(460px, 72vh, 680px)',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/orihime.png"
            alt="Orihime Inoue"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(8px 8px 0px var(--ink-brown))'
            }}
          />
        </div>

        {/* Rounded Hexagon Panel Right */}
        <div
          className="orihime-hex-panel"
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'min(500px, 44vw)',
            background: '#ffffff',
            border: '4px solid var(--ink-brown)',
            borderRadius: '24px',
            boxShadow: '10px 10px 0px var(--ink-brown)',
            padding: '40px 36px'
          }}
        >
          <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem', color: 'var(--accent-rose)' }}>
            井上 織姫
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2rem, 3.2vw, 3rem)',
              margin: '6px 0 12px 0',
              color: 'var(--ink-brown)'
            }}
          >
            Orihime Inoue
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--accent-rose)',
              color: '#ffffff',
              padding: '4px 12px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.72rem',
              marginBottom: '16px'
            }}
          >
            Santen Kesshun • Phenomenon Rejection
          </div>

          <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: '#3b1814', margin: '0 0 20px 0' }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
            ◆ Move cursor to lead the floral fairies • Click to reject reality
          </div>
        </div>
      </section>

      {/* Power Breakdown */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '4px solid var(--ink-brown)',
          padding: '80px 6vw'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>
            The Six Flowers of the Hibiscus Shield
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-peach)',
                  border: '3px solid var(--ink-brown)',
                  borderRadius: '16px',
                  boxShadow: '6px 6px 0px var(--ink-brown)',
                  padding: '28px'
                }}
              >
                <div style={{ color: 'var(--accent-rose)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '8px' }}>
                  FORMATION 0{idx + 1}
                </div>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", margin: '0 0 10px 0' }}>{step.name}</h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
