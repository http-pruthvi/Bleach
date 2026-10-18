import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_CHARACTERS, FACTIONS } from '../data/loader';
import { getThemeForCharacter } from '../data/themes.js';
import { useTransitionEngine } from '../context/TransitionContext';

function getLuminance(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const srgb = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ThemeGallery() {
  const [selectedFaction, setSelectedFaction] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { startTransition } = useTransitionEngine();

  const characters = useMemo(() => {
    return ALL_CHARACTERS.map(c => {
      const theme = getThemeForCharacter(c);
      const bg = c.colors?.bg || theme.palette.bg;
      const ink = c.colors?.ink || theme.palette.ink;
      const lum = getLuminance(bg);
      const ratio = getContrast(bg, ink);
      return {
        char: c,
        theme,
        bg,
        ink,
        accent: c.colors?.accent || theme.palette.accent,
        lum,
        ratio
      };
    });
  }, []);

  const filtered = useMemo(() => {
    return characters.filter(({ char }) => {
      const matchFaction = selectedFaction === 'all' || char.faction.toLowerCase().includes(selectedFaction.toLowerCase());
      const matchTier = selectedTier === 'all' || char.tier === selectedTier;
      const matchSearch = !searchQuery || 
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        char.kanji.includes(searchQuery) ||
        char.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFaction && matchTier && matchSearch;
    });
  }, [characters, selectedFaction, selectedTier, searchQuery]);

  const handleTestTransition = (charId, e) => {
    startTransition(`/character/${charId}`, charId, e);
  };

  return (
    <div
      className="dev-gallery-root"
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        padding: '32px 4vw',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <header style={{ maxWidth: '1400px', margin: '0 auto 24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <Link
            to="/"
            style={{
              color: '#0f172a',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Return to Tribute Site
          </Link>
          <span style={{ fontSize: '0.8rem', background: '#e2e8f0', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
            DEV INSPECTION TOOL • NOT FOR PUBLIC SHOWCASE
          </span>
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          Roster Theme DNA & Transition Registry ({ALL_CHARACTERS.length} Warriors)
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          Auditing background luminance (min L ≥ 0.10 rule), WCAG AA contrast ratio, Japanese kanji glyph subsets, and bespoke transition engines.
        </p>

        {/* Filter Toolbar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginTop: '16px' }}>
          <input
            type="text"
            placeholder="Search by ID, name, or kanji (e.g. 一護)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '0.9rem',
              minWidth: '280px',
              background: '#ffffff'
            }}
          />

          <select
            value={selectedFaction}
            onChange={e => setSelectedFaction(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              background: '#ffffff',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">All Factions</option>
            {FACTIONS.map(f => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>

          <select
            value={selectedTier}
            onChange={e => setSelectedTier(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              background: '#ffffff',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">All Tiers</option>
            <option value="A">Tier A (12 Bespoke Layouts)</option>
            <option value="B">Tier B (74 Faction Cards)</option>
            <option value="C">Tier C (36 Roster Entries)</option>
          </select>
        </div>
      </header>

      {/* Main Inspection Grid */}
      <main style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}
        >
          {filtered.map(({ char, theme, bg, ink, accent, lum, ratio }) => (
            <div
              key={char.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: '#0f172a'
                  }}
                >
                  {char.kanji}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: char.tier === 'A' ? '#ff5a0a' : char.tier === 'B' ? '#3b82f6' : '#64748b',
                    color: '#ffffff'
                  }}
                >
                  Tier {char.tier}
                </span>
              </div>

              {/* Character Details */}
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '1.1rem', fontWeight: 700 }}>
                  {char.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  ID: <code>{char.id}</code> • {char.faction}
                </div>
              </div>

              {/* Color Field Preview Swatch */}
              <div
                style={{
                  height: '48px',
                  borderRadius: '4px',
                  background: bg,
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 12px',
                  color: ink,
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                <span>{char.name}</span>
                <span style={{ fontSize: '0.75rem' }}>{bg}</span>
              </div>

              {/* Metrics audit table */}
              <div style={{ fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', color: '#475569' }}>
                <div>Luminance: <strong style={{ color: lum >= 0.10 ? '#16a34a' : '#dc2626' }}>{lum.toFixed(3)}</strong> {lum >= 0.10 ? '✓' : '✗'}</div>
                <div>Contrast: <strong style={{ color: ratio >= 4.5 ? '#16a34a' : '#dc2626' }}>{ratio.toFixed(2)}:1</strong> {ratio >= 4.5 ? '✓' : '✗'}</div>
                <div>Kit Shape: <code>{char.kitShape || 'bespoke'}</code></div>
                <div>Motion: <code>{char.kitMotion || 'bespoke'}</code></div>
              </div>

              {/* Live Preview Controls */}
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px' }}>
                <button
                  onClick={(e) => handleTestTransition(char.id, e)}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  TEST TRANSITION
                </button>

                <Link
                  to={`/character/${char.id}`}
                  style={{
                    padding: '6px 12px',
                    background: '#f1f5f9',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  View Page →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
