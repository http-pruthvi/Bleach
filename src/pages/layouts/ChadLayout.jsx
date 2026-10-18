import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function ChadLayout({ character, theme }) {
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
      className="chad-layout-root"
      style={{
        '--bg-ochre': '#e0a526',
        '--ink-dark': '#2a0f0a',
        '--accent-red': '#dc2626',
        minHeight: '100vh',
        background: 'var(--bg-ochre)',
        color: 'var(--ink-dark)',
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
            background: 'var(--ink-dark)',
            color: '#ffffff',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            borderRadius: '2px',
            boxShadow: '4px 4px 0px rgba(42, 15, 10, 0.3)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/uryu"
          charId="uryu"
          style={{
            background: '#1d4fd8',
            color: '#eaf2ff',
            border: '2px solid var(--ink-dark)',
            padding: '6px 14px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.75rem',
            textDecoration: 'none',
            boxShadow: '3px 3px 0px var(--ink-dark)'
          }}
        >
          Uryu Ishida →
        </TransitionLink>
      </header>

      {/* Hero: Heavy Stacked Slabs with name cut across */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '120px 6vw 0 6vw',
          display: 'flex',
          flexDirection: 'column'
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

        {/* Tectonic Cracks SVG driven by scroll */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: Math.min(1, scrollProgress * 2.5)
          }}
        >
          <path
            d="M 100 0 L 140 220 L 110 380 L 180 580 L 150 900"
            stroke="var(--ink-dark)"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M 140 220 L 260 300 L 320 440"
            stroke="var(--ink-dark)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 85% 0 L 80% 320 L 88% 540 L 82% 900"
            stroke="var(--ink-dark)"
            strokeWidth="4"
            fill="none"
          />
        </svg>

        {/* Slab 1: First Name */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            background: '#ffffff',
            border: '4px solid var(--ink-dark)',
            boxShadow: '10px 10px 0px var(--ink-dark)',
            padding: '24px 36px',
            maxWidth: '720px',
            marginBottom: '16px',
            transform: `translateX(${scrollProgress * 20}px)`
          }}
        >
          <span style={{ fontFamily: "'Dela Gothic One', sans-serif", color: 'var(--accent-red)', fontSize: '0.85rem' }}>
            茶渡 泰虎
          </span>
          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Dela Gothic One', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 0.9,
              margin: '4px 0 0 0',
              letterSpacing: '0.04em'
            }}
          >
            YASUTORA
          </h1>
        </div>

        {/* Slab 2: Last Name */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            background: 'var(--ink-dark)',
            color: '#ffffff',
            border: '4px solid var(--ink-dark)',
            boxShadow: '10px 10px 0px rgba(0,0,0,0.3)',
            padding: '24px 36px',
            maxWidth: '720px',
            marginBottom: '24px',
            transform: `translateX(-${scrollProgress * 20}px)`
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Dela Gothic One', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 0.9,
              margin: 0,
              letterSpacing: '0.04em'
            }}
          >
            SADO (CHAD)
          </h2>
        </div>

        {/* Slab 3: Editorial Copy */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            background: '#ffffff',
            border: '4px solid var(--ink-dark)',
            boxShadow: '8px 8px 0px var(--ink-dark)',
            padding: '28px',
            maxWidth: '520px',
            marginBottom: '40px'
          }}
        >
          <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.75rem', background: 'var(--accent-red)', color: '#ffffff', display: 'inline-block', padding: '2px 8px', marginBottom: '10px' }}>
            Brazo Derecha de Gigante
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, margin: 0, color: '#1a0b07' }}>
            {character.blurb}
          </p>
        </div>

        {/* Figure bleeding off the bottom */}
        <div
          style={{
            position: 'absolute',
            right: '4vw',
            bottom: 0,
            width: 'clamp(320px, 42vw, 580px)',
            height: 'clamp(460px, 78vh, 760px)',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/chad.png"
            alt="Yasutora Sado"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(10px 10px 0px var(--ink-dark))'
            }}
          />
        </div>
      </section>

      {/* Sado's Arms Evolution */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '5px solid var(--ink-dark)',
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', 'Dela Gothic One', sans-serif", fontSize: '3.5rem', margin: '0 0 40px 0' }}>
            TITANIC FORMS • BRAZO DE GIGANTE
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-ochre)',
                  border: '4px solid var(--ink-dark)',
                  boxShadow: '8px 8px 0px var(--ink-dark)',
                  padding: '30px'
                }}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: 'var(--accent-red)' }}>
                  STAGE 0{idx + 1} // {step.title}
                </div>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.4rem', margin: '4px 0 12px 0' }}>
                  {step.name}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
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
