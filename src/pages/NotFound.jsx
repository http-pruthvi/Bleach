import React, { useEffect, useRef } from 'react';
import { TransitionLink } from '../components/TransitionLink';
import { synth } from '../audio/synth';

const RESCUE_SQUAD = [
  { id: 'ichigo', name: 'Ichigo', role: 'Substitute Shinigami' },
  { id: 'rukia', name: 'Rukia', role: 'Squad 13' },
  { id: 'byakuya', name: 'Byakuya', role: 'Squad 6 Captain' },
  { id: 'kenpachi', name: 'Kenpachi', role: 'Squad 11 Captain' },
  { id: 'aizen', name: 'Aizen', role: 'Hueco Mundo Lord' },
  { id: 'grimmjow', name: 'Grimmjow', role: 'Sexta Espada' },
  { id: 'urahara', name: 'Kisuke', role: 'Store Owner' }
];

export function NotFound({ invalidWarriorId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate Dangai current streams (time-current particles)
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.2) * 2.5 + 1.2,
      vy: (Math.random() - 0.5) * 1.5,
      len: Math.random() * 80 + 30,
      width: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.4 ? 'rgba(230, 43, 30, ' : 'rgba(255, 255, 255, ',
      alpha: Math.random() * 0.5 + 0.2
    }));

    let mouseX = W / 2;
    let mouseY = H / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(12, 12, 12, 0.25)';
      ctx.fillRect(0, 0, W, H);

      // Draw Dangai precipice streams
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Subtle mouse pull
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        if (p.x > W + 100) p.x = -100;
        if (p.y > H + 50) p.y = -50;
        if (p.y < -50) p.y = H + 50;

        ctx.strokeStyle = p.color + p.alpha + ')';
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.len, p.y - p.vy * 8);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const triggerSearch = () => {
    synth.slash();
    window.dispatchEvent(new CustomEvent('open-global-search'));
  };

  return (
    <main
      className="not-found-page"
      style={{
        minHeight: '100vh',
        background: '#0c0c0c',
        color: '#ffffff',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(32px, 6vh, 64px) 5vw',
        fontFamily: "'Shippori Mincho', serif"
      }}
    >
      {/* Interactive Dangai Canvas Current */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Giant Vertical Calligraphy Outline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '4vw',
          top: '5vh',
          writingMode: 'vertical-rl',
          fontSize: 'clamp(6rem, 16vw, 18rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(230, 43, 30, 0.22)',
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        断界・迷子
      </div>

      {/* Main Editorial Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '720px',
          width: '100%',
          background: '#ffffff',
          color: '#0c0c0c',
          border: '4px solid #0c0c0c',
          boxShadow: '14px 14px 0px #e62b1e',
          padding: 'clamp(28px, 4.5vw, 48px)',
          textAlign: 'left',
          borderRadius: '2px'
        }}
      >
        {/* Koutotsu Alert Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '18px'
          }}
        >
          <div
            style={{
              background: '#e62b1e',
              color: '#ffffff',
              padding: '6px 14px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.06em'
            }}
          >
            CHAPTER 404 • THE LOST SOUL IN THE DANGAI
          </div>

          <div
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.7rem',
              color: '#e62b1e',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#e62b1e',
                display: 'inline-block',
                animation: 'pulse 1.2s infinite'
              }}
            />
            拘突接近 • KOUTOTSU IMMINENT
          </div>
        </div>

        {invalidWarriorId && (
          <div
            style={{
              background: '#fff3cd',
              border: '2px solid #ffb703',
              color: '#7a4100',
              padding: '10px 14px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
            }}
          >
            <span>⚠️</span>
            <span>SPIRIT TRACE LOST: No archive record found for "{invalidWarriorId}".</span>
          </div>
        )}

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
            margin: '0 0 14px 0',
            lineHeight: 1.0,
            color: '#0c0c0c',
            letterSpacing: '0.02em'
          }}
        >
          SPIRIT NOT FOUND
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            lineHeight: 1.7,
            color: '#1a1a1a',
            marginBottom: '16px'
          }}
        >
          You have stepped outside the Senkaimon and drifted into the Precipice World (断界 — Dangai).
          The spiritual path ahead has disintegrated, and the current is accelerating toward the void.
        </p>

        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#444444',
            marginBottom: '26px',
            borderLeft: '4px solid #e62b1e',
            paddingLeft: '14px',
            fontStyle: 'italic'
          }}
        >
          "To stand idle in the Dangai is to allow one's soul chain to corrode. Anchor your reishi before the Cleaner catches your scent."
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px'
          }}
        >
          <TransitionLink
            to="/"
            style={{
              background: '#e62b1e',
              color: '#ffffff',
              border: '3px solid #0c0c0c',
              padding: '12px 22px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              textDecoration: 'none',
              boxShadow: '4px 4px 0px #0c0c0c',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ⚔ RETURN TO ARCHIVE
          </TransitionLink>

          <TransitionLink
            to="/gotei13"
            style={{
              background: '#0c0c0c',
              color: '#ffffff',
              border: '3px solid #0c0c0c',
              padding: '12px 22px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              textDecoration: 'none',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            十三隊 GOTEI 13 CHART
          </TransitionLink>

          <button
            onClick={triggerSearch}
            style={{
              background: '#ffffff',
              color: '#0c0c0c',
              border: '3px solid #0c0c0c',
              padding: '12px 20px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🔍 SEARCH ALL WARRIORS [/]
          </button>

          <button
            onClick={() => window.history.back()}
            style={{
              background: '#f4f4f4',
              color: '#333333',
              border: '2px solid #333333',
              padding: '12px 18px',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            ← PREVIOUS REALM
          </button>
        </div>

        {/* Emergency Soul Rescue Squad Links */}
        <div
          style={{
            borderTop: '2px dashed rgba(12, 12, 12, 0.2)',
            paddingTop: '20px'
          }}
        >
          <div
            style={{
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: '0.75rem',
              color: '#e62b1e',
              marginBottom: '10px',
              letterSpacing: '0.04em'
            }}
          >
            EMERGENCY REISHI BEACONS // JUMP DIRECTLY TO COMBATANT:
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}
          >
            {RESCUE_SQUAD.map((warrior) => (
              <TransitionLink
                key={warrior.id}
                to={`/character/${warrior.id}`}
                charId={warrior.id}
                style={{
                  background: '#f0f0f0',
                  color: '#0c0c0c',
                  border: '1px solid #0c0c0c',
                  padding: '5px 12px',
                  fontFamily: "'Dela Gothic One', sans-serif",
                  fontSize: '0.7rem',
                  textDecoration: 'none',
                  borderRadius: '3px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background 0.15s ease, transform 0.15s ease'
                }}
              >
                <span>{warrior.name}</span>
                <span style={{ opacity: 0.5, fontSize: '0.6rem' }}>→</span>
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
