import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function YoruichiLayout({ character, theme }) {
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
      className="yoruichi-layout-root"
      style={{
        '--bg-violet': '#f5d0fe',
        '--ink-night': '#3b0764',
        '--accent-shunko': '#c026d3',
        minHeight: '100vh',
        background: 'var(--bg-violet)',
        color: 'var(--ink-night)',
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
            background: 'var(--ink-night)',
            color: '#ffffff',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            boxShadow: '4px 4px 0px rgba(59, 7, 100, 0.3)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/urahara"
          charId="urahara"
          style={{
            background: '#dcfce7',
            color: '#14532d',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            border: '2px solid var(--ink-night)',
            boxShadow: '4px 4px 0px var(--ink-night)'
          }}
        >
          Kisuke Urahara →
        </TransitionLink>
      </header>

      {/* Hero: Speed-Line Composition with Afterimages and Angled Bars */}
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

        {/* Speed lines pattern in background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 40px, rgba(192, 38, 211, 0.12) 40px, rgba(192, 38, 211, 0.12) 42px)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Kanji: 瞬神 (Shunshin) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '3vw',
            top: '8vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 15vw, 15rem)',
            fontWeight: 900,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '2px var(--ink-night)' }}>
            瞬神
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-night)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            瞬神
          </div>
        </div>

        {/* Angled Copy Bars (Skewed Speed Bars) */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '540px',
            transform: 'skewX(-6deg)'
          }}
        >
          {/* Angled Bar 1 */}
          <div
            style={{
              background: '#ffffff',
              border: '4px solid var(--ink-night)',
              boxShadow: '10px 10px 0px var(--ink-night)',
              padding: '36px',
              marginBottom: '16px'
            }}
          >
            <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem', color: 'var(--accent-shunko)', transform: 'skewX(6deg)' }}>
              四楓院 夜一 • FLASH GODDESS
            </div>

            <h1
              style={{
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
                margin: '8px 0 14px 0',
                lineHeight: 1,
                transform: 'skewX(6deg)'
              }}
            >
              Yoruichi Shihoin
            </h1>

            <div
              style={{
                display: 'inline-block',
                background: 'var(--accent-shunko)',
                color: '#ffffff',
                padding: '4px 12px',
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '0.75rem',
                marginBottom: '14px',
                transform: 'skewX(6deg)'
              }}
            >
              Shunko Raijin Senkei • Former 2nd Division Captain
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, margin: 0, color: '#2c044b', transform: 'skewX(6deg)' }}>
              {character.blurb}
            </p>
          </div>

          <div
            style={{
              background: 'var(--ink-night)',
              color: '#ffffff',
              padding: '12px 20px',
              border: '2px solid #ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              boxShadow: '6px 6px 0px rgba(0,0,0,0.3)',
              transform: 'skewX(-6deg)'
            }}
          >
            <div style={{ transform: 'skewX(6deg)' }}>
              ◆ Click screen to strike with high-voltage Shunko lightning blast
            </div>
          </div>
        </div>

        {/* Figure Caught Mid-Step with Afterimages */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(320px, 42vw, 560px)',
            height: 'clamp(460px, 76vh, 720px)',
            pointerEvents: 'none'
          }}
        >
          {/* Ghost Afterimage 1 */}
          <img
            src="/assets/characters/yoruichi.png"
            alt="Yoruichi Afterimage 1"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              transform: 'translateX(-40px) scale(0.97)',
              opacity: 0.3,
              filter: 'hue-rotate(280deg)'
            }}
          />

          {/* Ghost Afterimage 2 */}
          <img
            src="/assets/characters/yoruichi.png"
            alt="Yoruichi Afterimage 2"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              transform: 'translateX(-20px) scale(0.985)',
              opacity: 0.55
            }}
          />

          {/* Real Cutout */}
          <img
            src="/assets/characters/yoruichi.png"
            alt="Yoruichi Shihoin"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(10px 10px 0px var(--ink-night))'
            }}
          />
        </div>
      </section>

      {/* Shunko Speed Breakdown */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '5px solid var(--ink-night)',
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>
            SHUNKO • SUPREME SPEED MASTERY
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-violet)',
                  border: '3px solid var(--ink-night)',
                  boxShadow: '6px 6px 0px var(--ink-night)',
                  padding: '28px'
                }}
              >
                <div style={{ color: 'var(--accent-shunko)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px' }}>
                  SPEED TECHNIQUE 0{idx + 1}
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
