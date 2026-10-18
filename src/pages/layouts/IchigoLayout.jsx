import React, { useEffect, useRef, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';

export function IchigoLayout({ character, theme }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Signature canvas effect: Getsuga Tensho slash
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
      ref={containerRef}
      className="ichigo-layout-root"
      style={{
        '--bg-orange': '#ff5a0a',
        '--ink-black': '#0c0c0c',
        '--white': '#ffffff',
        minHeight: '100vh',
        background: '#ffffff',
        color: '#0c0c0c',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      <style>{`
        @media (max-width: 992px) {
          .ichigo-hero-stage {
            min-height: auto !important;
            display: flex;
            flex-direction: column;
            padding-bottom: 60px;
          }
          .ichigo-diagonal-field {
            clip-path: polygon(0 0, 100% 0, 100% 480px, 0 540px) !important;
          }
          .ichigo-cut-seam {
            display: none !important;
          }
          .ichigo-figure-wrap {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: clamp(240px, 60vw, 360px) !important;
            height: clamp(380px, 50vh, 520px) !important;
            margin: 30px auto 0 auto !important;
          }
          .ichigo-hero-copy {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            max-width: calc(100% - 32px) !important;
            width: calc(100% - 32px) !important;
            margin: 24px auto 0 auto !important;
            box-sizing: border-box;
          }
          .ichigo-kanji-wrap {
            font-size: clamp(4rem, 15vw, 7rem) !important;
            top: 70px !important;
            left: 12px !important;
          }
        }
      `}</style>

      {/* 1. Diagonal Split Hero Stage */}
      <section
        className="ichigo-hero-stage"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Left Orange Field (Diagonal Split at ~ -22deg) */}
        <div
          className="ichigo-diagonal-field"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-orange)',
            clipPath: 'polygon(0 0, 58% 0, 42% 100%, 0 100%)',
            zIndex: 1
          }}
        />

        {/* Diagonal Cut Seam Line */}
        <div
          className="ichigo-cut-seam"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <line
              x1="58%"
              y1="0"
              x2="42%"
              y2="100%"
              stroke="#0c0c0c"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Giant Vertical Kanji: 斬月 (Zangetsu) bleeding across the diagonal cut */}
        <div
          className="ichigo-kanji-wrap"
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '4vw',
            top: '6vh',
            zIndex: 3,
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 16vw, 16rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          {/* Base stroke outline */}
          <div
            style={{
              color: 'transparent',
              WebkitTextStroke: '3px var(--ink-black)',
              letterSpacing: '-0.02em'
            }}
          >
            斬月
          </div>
          {/* Solid fill filling in on scroll */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--ink-black)',
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear',
              letterSpacing: '-0.02em'
            }}
          >
            斬月
          </div>
        </div>

        {/* Interactive Canvas for Getsuga Slashes */}
        <canvas
          ref={canvasRef}
          onClick={triggerAction}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            cursor: 'crosshair'
          }}
        />

        {/* Top Header Navigation */}
        <header
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '24px 4vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TransitionLink
            to="/#cast"
            className="ichigo-nav-back"
            style={{
              background: '#0c0c0c',
              color: '#ffffff',
              padding: '8px 18px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              borderRadius: '2px',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← MAIN ROSTER
          </TransitionLink>

          <div
            className="ichigo-tier-nav"
            style={{
              display: 'flex',
              gap: '10px'
            }}
          >
            <TransitionLink
              to="/character/rukia"
              charId="rukia"
              style={{
                background: '#e6f0f8',
                color: '#0b2a45',
                border: '2px solid #0c0c0c',
                padding: '6px 14px',
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '0.75rem',
                textDecoration: 'none',
                boxShadow: '3px 3px 0px #0c0c0c'
              }}
            >
              Rukia Kuchiki →
            </TransitionLink>
          </div>
        </header>

        {/* Official Ichigo Cutout breaking across the diagonal */}
        <div
          className="ichigo-figure-wrap"
          style={{
            position: 'absolute',
            right: '28vw',
            bottom: 0,
            width: 'clamp(320px, 40vw, 560px)',
            height: '86vh',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        >
          <img
            src="/assets/characters/ichigo.png"
            alt="Ichigo Kurosaki"
            className="ichigo-hero-cutout"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(10px 10px 0px #0c0c0c)'
            }}
          />
        </div>

        {/* Editorial Copy on White Field (Right Side) */}
        <div
          className="ichigo-hero-copy"
          style={{
            position: 'absolute',
            right: '5vw',
            top: '22vh',
            maxWidth: 'min(420px, 32vw)',
            zIndex: 6,
            background: 'rgba(255, 255, 255, 0.94)',
            border: '3px solid #0c0c0c',
            boxShadow: '8px 8px 0px #0c0c0c',
            padding: '28px'
          }}
        >
          <div
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.85rem',
              color: '#ff5a0a',
              marginBottom: '6px'
            }}
          >
            黒崎 一護
          </div>

          <h1
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
              lineHeight: 1.05,
              color: '#0c0c0c',
              margin: '0 0 14px 0',
              letterSpacing: '0.02em'
            }}
          >
            Ichigo Kurosaki
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: '#0c0c0c',
              color: '#ffffff',
              padding: '4px 10px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.72rem',
              marginBottom: '14px'
            }}
          >
            Substitute Shinigami
          </div>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#1a1a1a',
              margin: 0
            }}
          >
            {character.blurb}
          </p>

          <div
            style={{
              marginTop: '18px',
              paddingTop: '14px',
              borderTop: '2px solid #0c0c0c',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.78rem',
              fontWeight: 700
            }}
          >
            <span style={{ color: '#ff5a0a' }}>◆</span>
            <span>Click canvas to unleash Getsuga Tensho</span>
          </div>
        </div>
      </section>

      {/* 2. Power Breakdown: Shikai, Bankai, Getsuga Tensho */}
      <section
        className="ichigo-power-section"
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--bg-orange)',
          borderTop: '5px solid #0c0c0c',
          borderBottom: '5px solid #0c0c0c',
          padding: '80px 6vw',
          color: '#0c0c0c'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <span
              style={{
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '0.9rem',
                background: '#0c0c0c',
                color: '#ffffff',
                padding: '4px 12px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              ZANPAKUTO FORMS
            </span>
            <h2
              style={{
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                margin: 0,
                color: '#0c0c0c'
              }}
            >
              Evolution of Zangetsu
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {character.powerSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '3px solid #0c0c0c',
                  boxShadow: '8px 8px 0px #0c0c0c',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Dela Gothic One', sans-serif",
                      fontSize: '0.8rem',
                      color: '#ff5a0a'
                    }}
                  >
                    STEP 0{idx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Dela Gothic One', sans-serif",
                      fontSize: '0.75rem',
                      background: '#0c0c0c',
                      color: '#ffffff',
                      padding: '2px 8px'
                    }}
                  >
                    {step.title}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Dela Gothic One', sans-serif",
                    fontSize: '1.4rem',
                    margin: '0 0 12px 0',
                    color: '#0c0c0c'
                  }}
                >
                  {step.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    color: '#262626',
                    flex: 1,
                    margin: '0 0 18px 0'
                  }}
                >
                  {step.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {step.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        border: '1px solid #0c0c0c',
                        padding: '2px 6px',
                        background: '#f5f5f5'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Soul Record Dossier (Manga Panel Layout) */}
      <section
        style={{
          padding: '80px 6vw',
          background: '#ffffff',
          color: '#0c0c0c'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}
          >
            <div
              style={{
                border: '3px solid #0c0c0c',
                padding: '20px',
                background: '#fafafa',
                boxShadow: '5px 5px 0px #0c0c0c'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: "'Dela Gothic One', sans-serif", color: '#ff5a0a' }}>ZANPAKUTO</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>{character.power?.name}</div>
            </div>

            <div
              style={{
                border: '3px solid #0c0c0c',
                padding: '20px',
                background: '#fafafa',
                boxShadow: '5px 5px 0px #0c0c0c'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: "'Dela Gothic One', sans-serif", color: '#ff5a0a' }}>BANKAI</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>{character.power?.bankai}</div>
            </div>

            <div
              style={{
                border: '3px solid #0c0c0c',
                padding: '20px',
                background: '#fafafa',
                boxShadow: '5px 5px 0px #0c0c0c'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: "'Dela Gothic One', sans-serif", color: '#ff5a0a' }}>VOICE ACTOR</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>{character.voiceActor || 'Masakazu Morita'}</div>
            </div>

            <div
              style={{
                border: '3px solid #0c0c0c',
                padding: '20px',
                background: '#fafafa',
                boxShadow: '5px 5px 0px #0c0c0c'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: "'Dela Gothic One', sans-serif", color: '#ff5a0a' }}>ORIGIN / ARC</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>{character.firstArc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer Switcher */}
      <footer
        style={{
          borderTop: '4px solid #0c0c0c',
          background: '#0c0c0c',
          color: '#ffffff',
          padding: '40px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TransitionLink
          to="/#cast"
          style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.9rem'
          }}
        >
          ← Return to Karakura Town
        </TransitionLink>

        <TransitionLink
          to="/character/rukia"
          charId="rukia"
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
          Next: Rukia Kuchiki →
        </TransitionLink>
      </footer>
    </div>
  );
}
