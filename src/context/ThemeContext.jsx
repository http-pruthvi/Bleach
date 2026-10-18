import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ARCHETYPES, getThemeForCharacter } from '../data/themes.js';
import { loadGoogleFont, getFontFamilyWithFallback } from '../utils/fontLoader.js';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(() => ARCHETYPES.blades);
  const transitionResolverRef = useRef(null);

  useEffect(() => {
    if (!activeTheme) return;

    // 1. Lazy load Google Fonts for the active theme
    if (activeTheme.type?.display) loadGoogleFont(activeTheme.type.display);
    if (activeTheme.type?.body) loadGoogleFont(activeTheme.type.body);

    // 2. Apply theme CSS variables to :root
    const root = document.documentElement;
    const pal = activeTheme.palette || {};
    const typ = activeTheme.type || {};

    root.style.setProperty('--theme-bg', pal.bg || '#080808');
    root.style.setProperty('--theme-ink', pal.ink || '#f0f0f0');
    root.style.setProperty('--theme-accent', pal.accent || '#ff5a0a');
    root.style.setProperty('--theme-alt', pal.alt || '#dc2626');
    root.style.setProperty('--theme-glow', pal.glow || 'rgba(255, 90, 10, 0.45)');

    root.style.setProperty('--theme-font-display', getFontFamilyWithFallback(typ.display || 'Cinzel'));
    root.style.setProperty('--theme-font-body', getFontFamilyWithFallback(typ.body || 'Inter'));
    root.style.setProperty('--theme-tracking', typ.tracking || '0.08em');
    root.style.setProperty('--theme-weight', typ.weight || '700');
    root.style.setProperty('--theme-scrollbar', activeTheme.scrollbar || pal.accent || '#ff5a0a');

    // 3. Set data-cursor attribute for custom cursor styling
    document.body.setAttribute('data-cursor', activeTheme.cursor || 'blade');
  }, [activeTheme]);

  const setThemeByCharacter = (character) => {
    if (!character) return;
    const compiled = getThemeForCharacter(character);
    setActiveTheme(compiled);
  };

  return (
    <ThemeContext.Provider value={{
      activeTheme,
      setActiveTheme,
      setThemeByCharacter
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
