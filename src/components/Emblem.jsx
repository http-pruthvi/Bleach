import React from 'react';

export function Emblem({ fxType = 'blades', accentColor = '#ff5a0a', kanji = '斬', size = 160, className = '' }) {
  const renderIcon = () => {
    switch (fxType) {
      case 'fire':
        return (
          <path
            d="M50 15 C55 35 75 42 75 62 C75 78 63 90 50 90 C37 90 25 78 25 62 C25 45 42 32 45 20 Z M50 45 C46 55 40 60 40 70 C40 76 44 80 50 80 C56 80 60 76 60 70 C60 62 54 58 50 45 Z"
            fill={accentColor}
            opacity="0.9"
          />
        );
      case 'ice':
        return (
          <g stroke={accentColor} strokeWidth="3" strokeLinecap="round" fill="none">
            <line x1="50" y1="12" x2="50" y2="88" />
            <line x1="17" y1="31" x2="83" y2="69" />
            <line x1="17" y1="69" x2="83" y2="31" />
            <polyline points="42 22 50 30 58 22" />
            <polyline points="42 78 50 70 58 78" />
            <polyline points="28 40 36 44 32 52" />
            <polyline points="72 60 64 56 68 48" />
            <circle cx="50" cy="50" r="8" fill={accentColor} fillOpacity="0.3" />
          </g>
        );
      case 'lightning':
        return (
          <polygon
            points="54 10 24 54 48 54 38 90 76 44 50 44"
            fill={accentColor}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        );
      case 'blades':
        return (
          <g stroke={accentColor} strokeWidth="3" strokeLinecap="round">
            <line x1="20" y1="80" x2="80" y2="20" />
            <line x1="80" y1="80" x2="20" y2="20" />
            <line x1="16" y1="84" x2="28" y2="72" stroke="#fff" strokeWidth="4" />
            <line x1="84" y1="84" x2="72" y2="72" stroke="#fff" strokeWidth="4" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
          </g>
        );
      case 'hollow':
        return (
          <g fill="none" stroke={accentColor} strokeWidth="3">
            <path d="M25 40 C25 20 75 20 75 40 C75 70 60 85 50 88 C40 85 25 70 25 40 Z" fill={accentColor} fillOpacity="0.15" />
            <circle cx="38" cy="44" r="6" fill="#000" stroke={accentColor} strokeWidth="2" />
            <circle cx="62" cy="44" r="6" fill="#000" stroke={accentColor} strokeWidth="2" />
            <line x1="34" y1="66" x2="66" y2="66" strokeWidth="2" />
            <line x1="42" y1="62" x2="42" y2="70" strokeWidth="2" />
            <line x1="50" y1="62" x2="50" y2="70" strokeWidth="2" />
            <line x1="58" y1="62" x2="58" y2="70" strokeWidth="2" />
          </g>
        );
      case 'arrows':
        return (
          <g stroke={accentColor} strokeWidth="2.5" fill="none">
            <circle cx="50" cy="50" r="38" strokeDasharray="3 3" />
            <polygon points="50 12 62 38 88 50 62 62 50 88 38 62 12 50 38 38" fill={accentColor} fillOpacity="0.25" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#fff" strokeWidth="1.5" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" />
          </g>
        );
      case 'kido':
        return (
          <g stroke={accentColor} strokeWidth="2" fill="none">
            <polygon points="50 14 85 50 50 86 15 50" fill={accentColor} fillOpacity="0.2" />
            <polygon points="50 24 76 50 50 76 24 50" stroke="#fff" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="16" />
            <circle cx="50" cy="50" r="6" fill={accentColor} />
          </g>
        );
      case 'water':
        return (
          <g stroke={accentColor} strokeWidth="3" fill="none">
            <path d="M20 50 Q35 32 50 50 T80 50" />
            <path d="M16 64 Q35 46 50 64 T84 64" />
            <path d="M24 36 Q35 18 50 36 T76 36" />
            <circle cx="50" cy="50" r="38" strokeDasharray="6 4" strokeWidth="1.5" />
          </g>
        );
      case 'shadow':
        return (
          <g fill={accentColor}>
            <circle cx="50" cy="50" r="36" fillOpacity="0.2" stroke={accentColor} strokeWidth="2" />
            <path d="M30 70 Q50 20 70 70 Q50 55 30 70 Z" fillOpacity="0.8" />
            <circle cx="50" cy="50" r="12" fill="#000" stroke="#fff" strokeWidth="2" />
          </g>
        );
      case 'illusion':
        return (
          <g stroke={accentColor} strokeWidth="2" fill="none">
            <circle cx="50" cy="50" r="38" />
            <circle cx="50" cy="50" r="26" strokeDasharray="4 4" stroke="#fff" />
            <circle cx="50" cy="50" r="14" />
            <line x1="20" y1="20" x2="80" y2="80" strokeWidth="1" stroke="#fff" />
            <line x1="20" y1="80" x2="80" y2="20" strokeWidth="1" stroke="#fff" />
          </g>
        );
      case 'gravity':
        return (
          <g stroke={accentColor} strokeWidth="2.5" fill="none">
            <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-30 50 50)" />
            <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(90 50 50)" />
            <circle cx="50" cy="50" r="10" fill={accentColor} />
          </g>
        );
      case 'speed':
        return (
          <g stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M15 35 L75 35 L65 48 L85 48" stroke="#fff" />
            <path d="M25 50 L85 50" strokeWidth="3" />
            <path d="M15 65 L65 65 L55 78 L75 78" stroke="#fff" />
            <circle cx="35" cy="50" r="28" strokeDasharray="6 6" strokeWidth="1.5" />
          </g>
        );
      case 'petals':
        return (
          <g fill={accentColor} fillOpacity="0.85">
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <path
                key={i}
                d="M50 50 Q40 25 50 16 Q60 25 50 50 Z"
                transform={`rotate(${deg} 50 50)`}
                stroke="#fff"
                strokeWidth="1"
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="#fff" />
          </g>
        );
      case 'earth':
        return (
          <g stroke={accentColor} strokeWidth="3" fill="none">
            <polygon points="50 16 84 78 16 78" fill={accentColor} fillOpacity="0.25" stroke="#fff" />
            <line x1="50" y1="16" x2="50" y2="78" />
            <line x1="33" y1="47" x2="67" y2="47" />
          </g>
        );
      case 'shield':
      default:
        return (
          <g stroke={accentColor} strokeWidth="2.5" fill="none">
            <polygon points="50 14 84 74 16 74" fill={accentColor} fillOpacity="0.2" stroke="#fff" />
            <circle cx="50" cy="54" r="12" fill={accentColor} />
          </g>
        );
    }
  };

  return (
    <div
      className={`emblem-container ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* Background Kanji Watermark */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: "'Shippori Mincho', serif",
          fontWeight: 800,
          fontSize: `${size * 0.7}px`,
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: `1.5px ${accentColor}`,
          opacity: 0.28,
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        {kanji}
      </div>

      {/* Foreground Vector Crest */}
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '72%',
          height: '72%',
          position: 'relative',
          zIndex: 2,
          filter: `drop-shadow(0 0 12px ${accentColor}66)`
        }}
      >
        {renderIcon()}
      </svg>
    </div>
  );
}
