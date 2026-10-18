import React from 'react';

export function TextureOverlay({ texture = 'none', accent = '#ef4444' }) {
  if (!texture || texture === 'none') return null;

  return (
    <div
      className={`theme-texture-overlay texture-${texture}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {texture === 'halftone' && (
        <svg width="100%" height="100%" style={{ opacity: 0.12 }}>
          <pattern id="halftone-pat" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="3" fill={accent} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#halftone-pat)" />
        </svg>
      )}

      {texture === 'scanlines' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
            backgroundSize: '100% 4px',
            opacity: 0.25
          }}
        />
      )}

      {texture === 'paper-grain' && (
        <svg width="100%" height="100%" style={{ opacity: 0.18 }}>
          <filter id="paper-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.25 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-noise)" />
        </svg>
      )}

      {texture === 'frost-noise' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 10% 20%, ${accent}22 0%, transparent 40%), radial-gradient(circle at 90% 80%, #72d6ff18 0%, transparent 50%)`,
            opacity: 0.7
          }}
        />
      )}

      {texture === 'ink-wash' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 30%, ${accent}1a 0%, transparent 70%), radial-gradient(ellipse at 80% 90%, #00000099 0%, transparent 60%)`,
            filter: 'blur(30px)',
            opacity: 0.8
          }}
        />
      )}

      {texture === 'cracked-stone' && (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ opacity: 0.15 }}>
          <path d="M 10,0 L 25,40 L 15,70 L 40,100 M 70,0 L 55,30 L 80,60 L 65,100 M 35,45 L 60,50" stroke={accent} strokeWidth="0.8" fill="none" />
        </svg>
      )}

      {texture === 'starfield' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 80px 80px',
            backgroundPosition: '0 0, 20px 20px',
            opacity: 0.15
          }}
        />
      )}

      {texture === 'sakura-silk' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `repeating-linear-gradient(45deg, transparent, transparent 15px, ${accent}11 15px, ${accent}11 30px)`,
            opacity: 0.5
          }}
        />
      )}

      {texture === 'mirror-shards' && (
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ opacity: 0.15 }}>
          <polygon points="10,10 40,5 30,35" fill="none" stroke={accent} strokeWidth="0.6" />
          <polygon points="60,20 95,15 80,45" fill="none" stroke={accent} strokeWidth="0.6" />
          <polygon points="15,65 45,85 25,95" fill="none" stroke={accent} strokeWidth="0.6" />
          <polygon points="70,55 90,80 60,90" fill="none" stroke={accent} strokeWidth="0.6" />
        </svg>
      )}
    </div>
  );
}
