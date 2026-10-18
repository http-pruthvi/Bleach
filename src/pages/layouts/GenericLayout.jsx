import React, { useEffect, useState } from 'react';
import { TransitionLink } from '../../components/TransitionLink';
import { useCanvasFx } from '../../fx/useCanvasFx';
import { getFxForCharacter } from '../../fx/presets';
import { SIGNATURE_SVGS } from '../../transitions/kit/index';
import { getRelatedCharacters } from '../../data/loader';

const LAYOUT_FAMILIES = [
  'diagonal-split',
  'centered-monument',
  'panel-grid',
  'horizontal-story',
  'collage',
  'mirror'
];

export function getLayoutFamilyForCharacter(char) {
  if (char.layoutFamily && LAYOUT_FAMILIES.includes(char.layoutFamily)) {
    return char.layoutFamily;
  }
  // Deterministic mapping by id char codes
  let hash = 0;
  for (let i = 0; i < char.id.length; i++) {
    hash = (hash << 5) - hash + char.id.charCodeAt(i);
    hash |= 0;
  }
  return LAYOUT_FAMILIES[Math.abs(hash) % LAYOUT_FAMILIES.length];
}

export function GenericLayout({ character, theme }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const relatedWarriors = getRelatedCharacters(character);

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

  const layoutFamily = getLayoutFamilyForCharacter(character);
  const bg = character.colors?.bg || theme.palette.bg;
  const ink = character.colors?.ink || theme.palette.ink;
  const accent = character.colors?.accent || theme.palette.accent;

  // Resolve signature SVG if available
  const sigKey = character.transitionKit?.signatureSvgKey || `${character.id}-sig`;
  const signatureSvgInner = SIGNATURE_SVGS[sigKey] || '<polygon points="50,15 85,85 15,85" fill="currentColor"/>';

  const powerSteps = character.powerSteps && character.powerSteps.length > 0
    ? character.powerSteps
    : [
        {
          name: character.zanpakuto || 'Spiritual Energy Release',
          title: 'Primary Technique',
          desc: character.blurb || 'High-density spiritual pressure materialized for combat domination.'
        }
      ];

  const activeStep = powerSteps[activeStepIdx] || powerSteps[0];

  return (
    <div
      className={`tier-bc-layout layout-family-${layoutFamily}`}
      style={{
        '--char-bg': bg,
        '--char-ink': ink,
        '--char-acc': accent,
        minHeight: '100vh',
        background: bg,
        color: ink,
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      {/* Top Header Navigation */}
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
          to="/#factions"
          style={{
            background: ink,
            color: bg,
            padding: '8px 18px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            textDecoration: 'none',
            border: `2px solid ${ink}`,
            boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
          }}
        >
          ← FACTION ROSTER
        </TransitionLink>

        <span
          style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            background: '#ffffff',
            color: ink,
            padding: '6px 14px',
            border: `2px solid ${ink}`,
            boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
          }}
        >
          {character.faction}
        </span>
      </header>

      {/* Hero Section Varying by Layout Family */}
      <section
        className="detail-hero-section"
        style={{
          minHeight: '100vh',
          position: 'relative',
          padding: '120px 6vw 60px 6vw',
          display: 'flex',
          flexDirection: layoutFamily === 'centered-monument' || layoutFamily === 'mirror' ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        {/* Diagonal Split overlay if family is diagonal-split */}
        {layoutFamily === 'diagonal-split' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              clipPath: 'polygon(55% 0%, 100% 0%, 100% 100%, 42% 100%)',
              zIndex: 2,
              opacity: 0.95
            }}
          />
        )}

        {/* Symmetrical Axis if family is mirror */}
        {layoutFamily === 'mirror' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '3px',
              background: ink,
              zIndex: 2,
              opacity: 0.35
            }}
          />
        )}

        {/* Giant Vertical Kanji starting outline and filling on scroll */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: layoutFamily === 'centered-monument' ? '5vw' : '3vw',
            top: '10vh',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 14vw, 14rem)',
            fontWeight: 900,
            zIndex: 2,
            pointerEvents: 'none',
            transform: layoutFamily === 'collage' ? 'rotate(-3deg)' : 'none'
          }}
        >
          <div style={{ color: 'transparent', WebkitTextStroke: `2px ${ink}` }}>
            {character.kanji}
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: ink,
              clipPath: `inset(0 0 calc(100% - ${Math.min(100, Math.max(15, scrollProgress * 180))}%) 0)`,
              transition: 'clip-path 0.1s linear'
            }}
          >
            {character.kanji}
          </div>
        </div>

        {/* Editorial Copy Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            maxWidth: '520px',
            background: '#ffffff',
            border: `4px solid ${ink}`,
            boxShadow: `10px 10px 0px ${ink}`,
            padding: '36px',
            transform: layoutFamily === 'collage' ? 'rotate(-2deg)' : 'none',
            textAlign: layoutFamily === 'centered-monument' ? 'center' : 'left'
          }}
        >
          <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.85rem', color: accent, marginBottom: '6px' }}>
            {character.kanji} • {character.faction}
          </div>

          <h1
            className="detail-hero-name"
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              margin: '6px 0 14px 0',
              lineHeight: 1.05,
              color: ink
            }}
          >
            {character.name}
          </h1>

          <div
            style={{
              display: 'inline-block',
              background: ink,
              color: '#ffffff',
              padding: '4px 12px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              marginBottom: '16px'
            }}
          >
            {character.divisionRank || character.faction}
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#1a1a1a', margin: '0 0 18px 0' }}>
            {character.blurb}
          </p>

          {/* Procedural Signature Emblem Wrap */}
          <div
            className="detail-emblem-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: `2px dashed ${ink}44`
            }}
          >
            <svg
              viewBox="0 0 100 100"
              style={{ width: '40px', height: '40px', color: ink }}
              dangerouslySetInnerHTML={{ __html: signatureSvgInner }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: ink }}>
              Signature Element: {sigKey}
            </span>
          </div>
        </div>

        {/* Figure Art Panel */}
        <div
          className="detail-figure-panel"
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(300px, 36vw, 500px)',
            height: 'clamp(440px, 68vh, 620px)',
            border: `4px solid ${ink}`,
            boxShadow: `14px 14px 0px ${ink}`,
            background: '#0c0c0c',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            transform: layoutFamily === 'collage' ? 'rotate(1.5deg)' : 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          {/* Manga corner badge */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 6,
              background: ink,
              color: '#ffffff',
              padding: '4px 10px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            BLEACH ARCHIVE // TIER {character.tier}
          </div>

          {/* Watermark kanji in frame background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              fontSize: '12rem',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.05)',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            {character.kanji ? character.kanji[0] : '斬'}
          </div>

          {character.image ? (
            <img
              src={character.image}
              alt={character.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                position: 'relative',
                zIndex: 4,
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.8))'
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                background: '#0c0c0c',
                color: '#ffffff',
                fontSize: '8rem',
                fontWeight: 900
              }}
            >
              {character.kanji ? character.kanji[0] : '刀'}
            </div>
          )}

          {/* Bottom subtle gradient vignette */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to top, rgba(12,12,12,0.95), transparent)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
        </div>
      </section>

      {/* #profile: Dossier & Lore Section */}
      <section
        id="profile"
        style={{
          background: '#ffffff',
          borderTop: `5px solid ${ink}`,
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.2rem', color: ink, marginBottom: '32px' }}>
            CHARACTER DOSSIER
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={{ background: bg, border: `3px solid ${ink}`, padding: '24px', boxShadow: `6px 6px 0px ${ink}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: accent }}>FACTION & RANK</div>
              <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.2rem', color: ink, marginTop: '6px' }}>
                {character.divisionRank || character.faction}
              </div>
            </div>

            <div style={{ background: bg, border: `3px solid ${ink}`, padding: '24px', boxShadow: `6px 6px 0px ${ink}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: accent }}>ZANPAKUTO / WEAPON</div>
              <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.2rem', color: ink, marginTop: '6px' }}>
                {character.zanpakuto || 'Spiritual Manifestation'}
              </div>
            </div>

            <div style={{ background: bg, border: `3px solid ${ink}`, padding: '24px', boxShadow: `6px 6px 0px ${ink}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: accent }}>RELEASE COMMAND</div>
              <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.2rem', color: ink, marginTop: '6px' }}>
                {character.releaseCommand || 'Unleash Spiritual Force'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #power-breakdown: Techniques & Power Steps Section */}
      <section
        id="power-breakdown"
        style={{
          background: bg,
          borderTop: `5px solid ${ink}`,
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.2rem', color: ink, marginBottom: '28px' }}>
            TECHNIQUES & POWER STEPS
          </h2>

          {/* Interactive Step Tabs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {powerSteps.map((step, idx) => (
              <button
                key={idx}
                className="step-tab"
                onClick={() => setActiveStepIdx(idx)}
                style={{
                  background: activeStepIdx === idx ? ink : '#ffffff',
                  color: activeStepIdx === idx ? '#ffffff' : ink,
                  border: `3px solid ${ink}`,
                  padding: '10px 22px',
                  fontFamily: "'Dela Gothic One', sans-serif",
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: activeStepIdx === idx ? 'none' : `4px 4px 0px ${ink}`,
                  transform: activeStepIdx === idx ? 'translate(2px, 2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {step.name || `Technique 0${idx + 1}`}
              </button>
            ))}
          </div>

          {/* Active Power Step Detail Card */}
          <div
            style={{
              background: '#ffffff',
              border: `4px solid ${ink}`,
              boxShadow: `10px 10px 0px ${ink}`,
              padding: '40px'
            }}
          >
            <div style={{ color: accent, fontWeight: 800, fontSize: '0.85rem', marginBottom: '8px' }}>
              STEP 0{activeStepIdx + 1} • {activeStep.title || 'COMBAT ABILITY'}
            </div>
            <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.8rem', color: ink, margin: '0 0 16px 0' }}>
              {activeStep.name}
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1a1a1a', margin: 0 }}>
              {activeStep.desc}
            </p>
          </div>
        </div>
      </section>

      {/* #showcase: Anime / Combat Scene Slot */}
      <section
        id="showcase"
        style={{
          background: '#ffffff',
          borderTop: `5px solid ${ink}`,
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.2rem', color: ink, marginBottom: '28px' }}>
            CANONICAL SHOWCASE
          </h2>

          <div
            style={{
              background: ink,
              border: `4px solid ${ink}`,
              boxShadow: `10px 10px 0px ${accent}`,
              minHeight: '360px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              padding: '40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                marginBottom: '12px',
                color: bg
              }}
            >
              {character.name} — BATTLE RECORD
            </div>
            <p style={{ maxWidth: '640px', lineHeight: 1.7, opacity: 0.9 }}>
              Documented combat encounters from the Bleach manga and Thousand-Year Blood War adaptation.
            </p>
            <div
              style={{
                marginTop: '20px',
                padding: '8px 20px',
                border: `2px solid ${bg}`,
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: '0.8rem',
                color: bg
              }}
            >
              ARCHIVE FEED VERIFIED
            </div>
          </div>
        </div>
      </section>

      {/* #playground: Interactive Spiritual FX Playground */}
      <section
        id="playground"
        className="interactive-playground-section"
        style={{
          background: bg,
          borderTop: `5px solid ${ink}`,
          padding: '80px 6vw',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '2.2rem', color: ink, marginBottom: '14px' }}>
            SPIRITUAL ENERGY PLAYGROUND
          </h2>
          <p style={{ fontSize: '1rem', color: ink, marginBottom: '28px', opacity: 0.85 }}>
            Click or drag across the energy canvas below to unleash {character.name}'s signature spiritual aura.
          </p>

          <div
            style={{
              position: 'relative',
              height: '440px',
              border: `4px solid ${ink}`,
              boxShadow: `12px 12px 0px ${ink}`,
              background: '#0c0c0c',
              overflow: 'hidden',
              cursor: 'crosshair'
            }}
            onPointerDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              triggerAction(e.clientX - rect.left, e.clientY - rect.top);
            }}
          >
            {/* Top Interactive Status Bar */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '14px',
                right: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <span
                style={{
                  background: 'rgba(12,12,12,0.85)',
                  border: `1px solid ${accent}`,
                  color: accent,
                  padding: '4px 10px',
                  fontFamily: "'Dela Gothic One', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em'
                }}
              >
                ✦ INTERACTIVE REISHI FIELD • CLICK OR DRAG TO RELEASE
              </span>
              <span
                style={{
                  background: 'rgba(12,12,12,0.85)',
                  color: '#ffffff',
                  padding: '4px 8px',
                  fontFamily: "'Dela Gothic One', sans-serif",
                  fontSize: '0.65rem'
                }}
              >
                ELEMENT: {character.fxType?.toUpperCase() || 'SPIRIT'}
              </span>
            </div>

            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* Connected Warriors / Allies & Rivals */}
      {relatedWarriors && relatedWarriors.length > 0 && (
        <section
          className="related-warriors-section"
          style={{
            background: '#0c0c0c',
            borderTop: `4px solid ${ink}`,
            padding: '60px 6vw',
            position: 'relative',
            zIndex: 5
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.75rem', color: accent, letterSpacing: '0.12em' }}>
                  ARCHIVE CORRELATION // 同志と好敵手
                </span>
                <h3 style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '1.6rem', color: '#ffffff', margin: '4px 0 0 0' }}>
                  CONNECTED WARRIORS
                </h3>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                Faction: {character.faction} • Element: {character.fxType?.toUpperCase()}
              </span>
            </div>

            <div className="related-chips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {relatedWarriors.map(rel => (
                <TransitionLink
                  key={rel.id}
                  to={`/character/${rel.id}`}
                  charId={rel.id}
                  className="related-warrior-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#ffffff',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ width: '48px', height: '56px', borderRadius: '4px', overflow: 'hidden', border: `1px solid ${rel.colors?.accent || '#ff5a0a'}`, background: '#000', flexShrink: 0 }}>
                    <img
                      src={rel.image || rel.headshot}
                      alt={rel.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    <span style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.88rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {rel.name}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: rel.colors?.accent || '#ff5a0a', fontWeight: 700 }}>
                      {rel.kanji}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {rel.power?.name || rel.faction}
                    </span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          background: ink,
          color: '#ffffff',
          padding: '40px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TransitionLink
          to="/#factions"
          style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.85rem'
          }}
        >
          ← Return to Roster
        </TransitionLink>

        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          BLEACH THOUSAND BLADES TRIBUTE
        </span>
      </footer>
    </div>
  );
}
