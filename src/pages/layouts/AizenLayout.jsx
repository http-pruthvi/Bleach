import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function AizenLayout({ character, theme }) {
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
      className="aizen-layout-root"
      style={{
        '--bg-silver': '#e2e8f0',
        '--ink-dark': '#0f172a',
        '--accent-indigo': '#6366f1',
        minHeight: '100vh',
        background: 'var(--bg-silver)',
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
            boxShadow: '4px 4px 0px rgba(15, 23, 42, 0.3)'
          }}
        >
          ← MAIN ROSTER
        </TransitionLink>

        <TransitionLink
          to="/character/yoruichi"
          charId="yoruichi"
          style={{
            background: '#f5d0fe',
            color: '#3b0764',
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            border: '2px solid var(--ink-dark)',
            boxShadow: '4px 4px 0px var(--ink-dark)'
          }}
        >
          Yoruichi Shihoin →
        </TransitionLink>
      </header>

      {/* Hero: Mirrored Symmetrical Illusion Layout */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '120px 4vw 60px 4vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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

        {/* Central Vertical Mirror Seam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '2px',
            background: 'var(--accent-indigo)',
            zIndex: 2,
            opacity: 0.4
          }}
        />

        {/* Dual Symmetrical Kanji: 鏡花水月 */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '5vw',
            top: '10vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(4.5rem, 12vw, 12rem)',
            fontWeight: 800,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: '2px var(--ink-dark)' }}>
            鏡花水月
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-dark)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            鏡花水月
          </div>
        </div>

        {/* Dual Mirrored Figures (Reality vs Illusion Reflection) */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '40px',
            width: '100%',
            maxWidth: '1200px',
            height: 'clamp(440px, 65vh, 640px)',
            marginBottom: '30px'
          }}
        >
          {/* Mirrored Reflection (Shard-Cut Panel with scaleX(-1)) */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(260px, 32vw, 440px)',
              height: '100%',
              transform: 'scaleX(-1)',
              opacity: 0.65,
              clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
              filter: 'hue-rotate(200deg)'
            }}
          >
            <img
              src="/assets/characters/aizen.png"
              alt="Aizen Reflection"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center'
              }}
            />
          </div>

          {/* Real Figure */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(280px, 34vw, 460px)',
              height: '100%'
            }}
          >
            <img
              src="/assets/characters/aizen.png"
              alt="Sosuke Aizen"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                filter: 'drop-shadow(8px 8px 0px var(--ink-dark))'
              }}
            />
          </div>
        </div>

        {/* Centered Symmetrical Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '600px',
            textAlign: 'center',
            background: '#ffffff',
            border: '3px solid var(--ink-dark)',
            boxShadow: '10px 10px 0px var(--ink-dark)',
            padding: '36px'
          }}
        >
          <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem', color: 'var(--accent-indigo)', letterSpacing: '0.15em' }}>
            藍染 惣右介 • COMPLETE HYPNOSIS
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              margin: '8px 0 14px 0',
              lineHeight: 1
            }}
          >
            Sosuke Aizen
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: 'var(--ink-dark)',
              color: '#ffffff',
              padding: '4px 14px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              marginBottom: '16px'
            }}
          >
            Kyoka Suigetsu • Former 5th Division Captain
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, margin: '0 0 16px 0', color: '#1e293b' }}>
            {character.blurb}
          </p>

          <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 800 }}>
            ◆ Click canvas to shatter optical perception into mirror shards
          </div>
        </div>
      </section>

      {/* Symmetrical Illusion Matrix */}
      <section
        style={{
          background: '#ffffff',
          borderTop: '4px solid var(--ink-dark)',
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>
            KYOKA SUIGETSU • THE FIVE SENSES
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-silver)',
                  border: '3px solid var(--ink-dark)',
                  boxShadow: '6px 6px 0px var(--ink-dark)',
                  padding: '28px'
                }}
              >
                <div style={{ color: 'var(--accent-indigo)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px' }}>
                  HYPNOTIC RITUAL 0{idx + 1}
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
