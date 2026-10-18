import { useEffect, useRef } from 'react';

export function useCanvasFx({ fxFactory, character, inView = true, interactive = true }) {
  const canvasRef = useRef(null);
  const fxInstanceRef = useRef(null);
  const reqIdRef = useRef(null);
  const lastActionTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fxFactory || !character) return;

    const ctx = canvas.getContext('2d');
    const fx = fxFactory(character);
    fxInstanceRef.current = fx;

    let DPR = Math.min(2, window.devicePixelRatio || 1);

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      DPR = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      fx.resize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pointer events with deduplication throttle
    const handlePointerMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (fx.move) fx.move(x, y);
    };

    const handlePointerDown = (e) => {
      if (!interactive) return;
      const now = performance.now();
      // Guard against synthetic click / pointer bounce (< 150ms)
      if (now - lastActionTimeRef.current < 150) return;
      lastActionTimeRef.current = now;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (fx.click) fx.click(x, y);
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    let lastTime = performance.now();
    let totalTime = 0;

    const loop = (now) => {
      if (!inView) {
        reqIdRef.current = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      totalTime += dt;

      fx.update(dt, totalTime, 0.5);
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      fx.draw(ctx, totalTime);

      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      fxInstanceRef.current = null;
    };
  }, [fxFactory, character, inView, interactive]);

  const triggerAction = (x, y) => {
    const now = performance.now();
    // Guard against synthetic click / pointer bounce (< 150ms)
    if (now - lastActionTimeRef.current < 150) return;
    lastActionTimeRef.current = now;

    if (fxInstanceRef.current && fxInstanceRef.current.click) {
      const canvas = canvasRef.current;
      const rect = canvas ? canvas.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      fxInstanceRef.current.click(x ?? rect.width / 2, y ?? rect.height / 2);
    }
  };

  return { canvasRef, triggerAction };
}
