import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function UraharaLayout({ character, theme }) {
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
      className="urahara-layout-root"
      style={{
        '--bg-shop': '#dcfce7',
        '--ink-pine': '#14532d',
        '--accent-fan': '#16a34a',
        minHeight: '100vh',
        background: 'var(--bg-shop)',
        color: 'var(--ink-pine)',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      {/* Traditional Striped Noren Awning Curtain at Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: 'repeating-linear-gradient(90deg, #14532d 0, #14532d 40px, #ffffff 40px, #ffffff 80px)',
          borderBottom: '4px solid #14532d',
          zIndex: 8,
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
        }}
      />

      <header
        style={{
          position: 'absolute',
          top: '20px',
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
            color: 'var(--ink-pine)',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            border: '2px solid var(--ink-pine)',
            boxShadow: '4px 4px 0px var(--ink-pine)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/ichigo"
          charId="ichigo"
          style={{
            background: '#ff5a0a',
            color: '#0c0c0c',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px #14532d'
          }}
        >
          Ichigo Kurosaki →
        </TransitionLink>
      </header>

      {/* Hero: Shop-Front Composition with Paper-Label Blocks and Fan Motif */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '120px 6vw 60px 6vw',
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

        {/* Traditional Fan Motif Watermark */}
        <div
          style={{
            position: 'absolute',
            right: '10vw',
            top: '15vh',
            width: '400px',
            height: '240px',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.15
          }}
        >
          <svg viewBox="0 0 200 120" width="100%" height="100%">
            <path
              d="M 10 110 A 90 90 0 0 1 190 110 L 100 110 Z"
              fill="var(--ink-pine)"
            />
          </svg>
        </div>

        {/* Kanji: 紅姫 (Benihime) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '3vw',
            top: '12vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 15vw, 15rem)',
            fontWeight: 900,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '2px var(--ink-pine)' }}>
            紅姫
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-pine)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            紅姫
          </div>
        </div>

        {/* Paper-Label Copy Block */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '540px',
            background: '#ffffff',
            border: '4px solid var(--ink-pine)',
            boxShadow: '10px 10px 0px var(--ink-pine)',
            padding: '40px'
          }}
        >
          {/* Hanging merchant tag */}
          <div
            style={{
              display: 'inline-block',
              background: 'var(--ink-pine)',
              color: '#ffffff',
              padding: '4px 12px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              marginBottom: '14px'
            }}
          >
            浦原商店 • KARAKURA CANDY SHOP
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              margin: '0 0 12px 0',
              lineHeight: 1
            }}
          >
            Kisuke Urahara
          </h1>

          <div
            style={{
              display: 'inline-block',
              border: '2px solid var(--ink-pine)',
              padding: '4px 12px',
              fontWeight: 800,
              fontSize: '0.8rem',
              marginBottom: '16px'
            }}
          >
            Benihime • Former 12th Division Captain & SRDI Founder
          </div>

          <p style={{ fontSize: '1.02rem', lineHeight: 1.75, margin: '0 0 16px 0', color: '#163f25' }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.82rem', color: 'var(--accent-fan)', fontWeight: 800 }}>
            ◆ Tap cane to unleash Crimson Princess energy construct
          </div>
        </div>

        {/* Figure Cutout */}
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
            src="/assets/characters/urahara.png"
            alt="Kisuke Urahara"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(10px 10px 0px var(--ink-pine))'
            }}
          />
        </div>
      </section>

      {/* Inventions & Benihime Spells */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '5px solid var(--ink-pine)',
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>
            BENIHIME • RED PRINCESS INCANTATIONS
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-shop)',
                  border: '3px solid var(--ink-pine)',
                  boxShadow: '6px 6px 0px var(--ink-pine)',
                  padding: '28px'
                }}
              >
                <div style={{ color: 'var(--accent-fan)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px' }}>
                  EXPERIMENT 0{idx + 1}
                </div>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.4rem', margin: '0 0 12px 0' }}>{step.name}</h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
