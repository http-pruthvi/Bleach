import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTransitionEngine } from '../context/TransitionContext';
import { getThemeForCharacter } from '../data/themes';
import { getCharacterById } from '../data/loader';
import { createIchigoTransition } from '../transitions/engine/ichigo';
import { createRukiaTransition } from '../transitions/engine/rukia';
import { createKitTransition } from '../transitions/kit/index';

export function TransitionStage() {
  const {
    transitionState,
    setTransitionState,
    activeTimelineRef,
    isNavigatingRef,
    navigate
  } = useTransitionEngine();

  const canvasRef = useRef(null);

  useEffect(() => {
    // Run whenever transition is active, even if targetId is null (e.g. going back to home or factions)
    if (!transitionState.active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth;
    const H = window.innerHeight;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // Lock pointer events during transition
    canvas.style.pointerEvents = 'all';

    // Look up target character theme, or default ink/orange theme for non-character routes (e.g. / or /#factions)
    const char = transitionState.targetId ? getCharacterById(transitionState.targetId) : null;
    const theme = char ? getThemeForCharacter(char) : {
      palette: { bg: '#ff5a0a', ink: '#0c0c0c', accent: '#ffffff' }
    };

    let tl = null;

    // Phase 3 Swap handler called when Cover completes
    const handleCovered = async () => {
      // Navigate to destination route
      if (transitionState.targetUrl) {
        navigate(transitionState.targetUrl);
        const hashMatch = transitionState.targetUrl.match(/#([a-zA-Z0-9_-]+)/);
        if (hashMatch) {
          const hashId = hashMatch[1];
          requestAnimationFrame(() => {
            setTimeout(() => {
              const el = document.getElementById(hashId);
              if (el) {
                el.scrollIntoView({ behavior: 'auto' });
              } else {
                window.scrollTo(0, 0);
              }
            }, 60);
          });
        } else {
          window.scrollTo(0, 0);
        }
      }

      // Wait for fonts & hero image to be decoded
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        // Allow React DOM mount
        await new Promise(r => requestAnimationFrame(r));
        await new Promise(r => setTimeout(r, 40));

        // Await hero image decode to prevent layout shift or pop-in
        const heroImg = document.querySelector('.detail-hero-img, .fig img, .character-main-img');
        if (heroImg && heroImg.decode) {
          await heroImg.decode().catch(() => {});
        }
      } catch (err) {
        console.warn('Transition asset wait error:', err);
      }
    };

    // Phase 4 Complete handler
    const handleComplete = () => {
      ctx.clearRect(0, 0, W, H);
      canvas.style.pointerEvents = 'none';
      isNavigatingRef.current = false;
      setTransitionState({
        active: false,
        phase: 'idle',
        targetId: null,
        targetUrl: null,
        clickCoords: { x: W / 2, y: H / 2 }
      });
      activeTimelineRef.current = null;
    };

    // GSAP context for React StrictMode cleanup
    const gsapCtx = gsap.context(() => {
      if (transitionState.targetId === 'rukia') {
        tl = createRukiaTransition({
          canvas,
          ctx,
          theme,
          clickCoords: transitionState.clickCoords,
          onCovered: handleCovered,
          onComplete: handleComplete
        });
      } else if (transitionState.targetId === 'ichigo') {
        tl = createIchigoTransition({
          canvas,
          ctx,
          theme,
          onCovered: handleCovered,
          onComplete: handleComplete
        });
      } else {
        // Kit transition for Tier B / C or default return navigation
        const shape = char?.kitShape || 'slash';
        const motion = char?.kitMotion || 'snap';
        tl = createKitTransition({
          canvas,
          ctx,
          theme,
          shape,
          motion,
          signatureSvgKey: char?.transitionKit?.signatureSvgKey || 'ichibei-ink-calligraphy',
          onCovered: handleCovered,
          onComplete: handleComplete
        });
      }

      activeTimelineRef.current = tl;
    });

    return () => {
      gsapCtx.revert();
    };
  }, [transitionState.active, transitionState.targetId, transitionState.targetUrl]);

  return (
    <canvas
      id="transition-stage-canvas"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
}
