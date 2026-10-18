export const TAU = Math.PI * 2;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const rand = (a, b) => a + Math.random() * (b - a);
export const ease = (t) => 1 - Math.pow(1 - t, 3);

export const rgba = (h, a = 1) => {
  if (!h || !h.startsWith('#')) return `rgba(255,255,255,${a})`;
  let c = h.slice(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${a})`;
};

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
