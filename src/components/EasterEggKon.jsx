import React, { useEffect, useState, useRef } from 'react';
import { synth } from '../audio/synth';

export function EasterEggKon() {
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing inside input / textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Track last 3 characters typed
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-3);
      if (bufferRef.current === 'kon') {
        synth.comic();
        setIsOpen(true);
        bufferRef.current = '';
      }
    };

    const handleCustomTrigger = () => {
      synth.comic();
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-kon-easter-egg', handleCustomTrigger);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-kon-easter-egg', handleCustomTrigger);
    };
  }, [isOpen]);

  const handleUnleash = () => {
    synth.comic();
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="easter-egg-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(12, 12, 12, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'grid',
        placeItems: 'center',
        padding: '20px'
      }}
    >
      <div
        className={`easter-egg-card ${shake ? 'easter-egg-shake' : ''}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '620px',
          width: '100%',
          background: '#ffbb00',
          color: '#0c0c0c',
          border: '5px solid #0c0c0c',
          boxShadow: '14px 14px 0px #0c0c0c',
          padding: 'clamp(28px, 5vw, 44px)',
          position: 'relative',
          fontFamily: "'Shippori Mincho', serif",
          transform: shake ? 'scale(1.03) rotate(-1deg)' : 'none',
          transition: 'transform 0.15s ease'
        }}
      >
        {/* Manga corner badge */}
        <div
          style={{
            position: 'absolute',
            top: '-18px',
            left: '24px',
            background: '#ff3300',
            color: '#ffffff',
            padding: '4px 14px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '0.8rem',
            border: '3px solid #0c0c0c',
            boxShadow: '4px 4px 0px #0c0c0c',
            letterSpacing: '0.05em'
          }}
        >
          死神図鑑 GOLDEN • EASTER EGG UNLOCKED
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close Kon secret episode"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#0c0c0c',
            color: '#ffffff',
            border: '2px solid #0c0c0c',
            width: '36px',
            height: '36px',
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center'
          }}
        >
          ✕
        </button>

        {/* Heading */}
        <div style={{ marginTop: '14px', marginBottom: '16px' }}>
          <h2
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.05,
              margin: '0 0 6px 0',
              color: '#0c0c0c'
            }}
          >
            KON (コン) // MOD SOUL
          </h2>
          <div
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.85rem',
              color: '#ff3300'
            }}
          >
            UNDERCOVER EMPEROR OF KARAKURA TOWN
          </div>
        </div>

        {/* Manga Dialogue Speech Box */}
        <div
          style={{
            background: '#ffffff',
            border: '3px solid #0c0c0c',
            boxShadow: '6px 6px 0px #0c0c0c',
            padding: '20px',
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 800,
              color: '#0c0c0c'
            }}
          >
            "OI! ICHIGO! WHY AM I NOT RANKED AT TIER S?!
            I AM KON-SAMA, THE MAGNIFICENT LION-HEARTED DEFENDER OF HUMANITY!
            JUST LOOK AT THIS OVERWHELMING SPIRITUAL PRESSURE! I DEMAND INSTANT RECOGNITION RIGHT NOW!"
          </p>
        </div>

        {/* Dossier Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '28px'
          }}
        >
          <div style={{ background: '#ffffff', border: '2px solid #0c0c0c', padding: '10px 14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ff3300' }}>VESSEL TYPE</div>
            <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.9rem' }}>Lion Plushie</div>
          </div>

          <div style={{ background: '#ffffff', border: '2px solid #0c0c0c', padding: '10px 14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ff3300' }}>SIGNATURE MOVE</div>
            <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.9rem' }}>Super High Jump</div>
          </div>

          <div style={{ background: '#ffffff', border: '2px solid #0c0c0c', padding: '10px 14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ff3300' }}>THREAT LEVEL</div>
            <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: '0.9rem' }}>MAX (Self-Declared)</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleUnleash}
            style={{
              background: '#ff3300',
              color: '#ffffff',
              border: '3px solid #0c0c0c',
              padding: '12px 22px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #0c0c0c'
            }}
          >
            UNLEASH MOD SOUL BOING!
          </button>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: '#0c0c0c',
              color: '#ffffff',
              border: '3px solid #0c0c0c',
              padding: '12px 22px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #0c0c0c'
            }}
          >
            STUFF KON INTO CLOSET [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
