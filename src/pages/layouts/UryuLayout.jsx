import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function UryuLayout({ character, theme }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

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
      className="uryu-layout-root"
      style={{
        '--bg-quincy': '#1d4fd8',
        '--ink-silver': '#eaf2ff',
        '--accent-cyan': '#7fd1ff',
        minHeight: '100vh',
        background: 'var(--bg-quincy)',
        color: 'var(--ink-silver)',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Rajdhani', sans-serif"
      }}
    >
      {/* Aiming Reticle that follows the cursor */}
      <div
        style={{
          position: 'fixed',
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          width: '56px',
          height: '56px'
        }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="24" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" strokeDasharray="6 3" />
          <circle cx="28" cy="28" r="8" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <line x1="28" y1="0" x2="28" y2="16" stroke="var(--accent-cyan)" strokeWidth="1.5" />
          <line x1="28" y1="40" x2="28" y2="56" stroke="var(--accent-cyan)" strokeWidth="1.5" />
          <line x1="0" y1="28" x2="16" y2="28" stroke="var(--accent-cyan)" strokeWidth="1.5" />
          <line x1="40" y1="28" x2="56" y2="28" stroke="var(--accent-cyan)" strokeWidth="1.5" />
        </svg>
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
            background: '#ffffff',
            color: 'var(--bg-quincy)',
            padding: '8px 18px',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            border: '2px solid var(--accent-cyan)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/renji"
          charId="renji"
          style={{
            background: '#b3121f',
            color: '#ffffff',
            padding: '8px 18px',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            border: '2px solid #ffffff'
          }}
        >
          Renji Abarai →
        </TransitionLink>
      </header>

      {/* Hero: Precision Grid with Rotating Quincy Star Diagram */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '100px 6vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          alignItems: 'center',
          gap: '40px'
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

        {/* Rotating 5-Point Quincy Star Diagram driven by scroll */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${scrollProgress * 360}deg)`,
            width: 'min(680px, 80vw)',
            height: 'min(680px, 80vw)',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.15
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <polygon
              points="50,5 61,35 95,35 68,57 78,90 50,70 22,90 32,57 5,35 39,35"
              stroke="#ffffff"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="50" cy="50" r="48" stroke="#ffffff" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="32" stroke="var(--accent-cyan)" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Left Grid Cell: Copy & Tactical Data */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            background: 'rgba(11, 31, 94, 0.92)',
            border: '2px solid var(--accent-cyan)',
            padding: '36px',
            boxShadow: '0 0 0 1px var(--ink-silver)'
          }}
        >
          <div style={{ color: 'var(--accent-cyan)', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 700 }}>
            石田 雨竜 • LAST QUINCY
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              margin: '8px 0 16px 0',
              lineHeight: 0.95
            }}
          >
            URYU ISHIDA
          </h1>

          <div
            style={{
              display: 'inline-block',
              border: '1px solid var(--accent-cyan)',
              padding: '4px 12px',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              marginBottom: '20px',
              background: 'rgba(127, 209, 255, 0.1)'
            }}
          >
            GINREI KOJAKU • HEILIG PFEIL
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#d8e5ff', margin: '0 0 20px 0' }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>
            ◆ Move reticle to track targets • Click to fire Heilig Pfeil barrage
          </div>
        </div>

        {/* Right Grid Cell: Figure Cutout */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            height: 'clamp(460px, 75vh, 680px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <img
            src="/assets/characters/uryu.png"
            alt="Uryu Ishida"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(10px 10px 0px #081745)'
            }}
          />
        </div>
      </section>

      {/* Quincy Weaponry Matrix */}
      <section
        style={{
          background: '#0c2266',
          borderTop: '3px solid var(--accent-cyan)',
          padding: '80px 6vw'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '40px', textAlign: 'center' }}>
            QUINCY WEAPONRY ARCHIVE
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  border: '2px solid var(--accent-cyan)',
                  padding: '28px',
                  background: 'rgba(29, 79, 216, 0.4)'
                }}
              >
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
                  TACTICAL ARSENAL 0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.6rem', margin: '6px 0 10px 0' }}>{step.name}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#d8e5ff' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
