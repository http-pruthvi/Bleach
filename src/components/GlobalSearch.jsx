import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_CHARACTERS } from '../data/loader';
import { Emblem } from './Emblem';

export function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onClose(true); // Open search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false); // Close search
      }
    };
    const handleCustomOpen = () => onClose(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleCustomOpen);
    };
  }, [isOpen, onClose]);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return ALL_CHARACTERS.filter(c => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchKanji = c.kanji.includes(q);
      const matchAlias = c.aliases?.some(a => a.toLowerCase().includes(q));
      const matchZan = c.power?.name?.toLowerCase().includes(q) || c.power?.shikai?.toLowerCase().includes(q) || c.power?.bankai?.toLowerCase().includes(q);
      const matchFaction = c.faction?.toLowerCase().includes(q);
      return matchName || matchKanji || matchAlias || matchZan || matchFaction;
    }).slice(0, 12);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={() => onClose(false)} role="dialog" aria-modal="true">
      <div className="search-modal-box" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <svg
            className="search-icon-svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-field"
            placeholder="Search character, kanji, alias, or Zanpakuto (ESC to close)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search all Bleach characters"
          />
          <button className="search-close-btn" onClick={() => onClose(false)} aria-label="Close search">
            ✕
          </button>
        </div>

        <div className="search-results-list">
          {query.trim() && results.length === 0 && (
            <div className="search-empty">No warriors found matching "{query}"</div>
          )}

          {results.map(c => (
            <Link
              key={c.id}
              to={`/character/${c.id}`}
              className="search-result-item"
              onClick={() => onClose(false)}
            >
              <div className="result-thumb-wrap">
                {(c.image || c.headshot) ? (
                  <img
                    src={c.image || c.headshot}
                    alt={c.name}
                    className="result-thumb"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement.querySelector('.result-fallback-emblem');
                      if (fallback) fallback.style.display = 'grid';
                    }}
                  />
                ) : null}
                <div className="result-fallback-emblem" style={{ display: (c.image || c.headshot) ? 'none' : 'grid' }}>
                  <Emblem fxType={c.fxType} accentColor={c.colors?.accent || '#ff5a0a'} kanji={c.kanji?.[0] || '斬'} size={32} />
                </div>
              </div>
              <div className="result-details">
                <div className="result-header">
                  <span className="result-name">{c.name}</span>
                  <span className="result-kanji">{c.kanji}</span>
                </div>
                <div className="result-meta">
                  <span className="result-faction">{c.faction}</span>
                  <span>//</span>
                  <span className="result-power">{c.power?.name || 'Spiritual Art'}</span>
                  <span>//</span>
                  <span className="result-tier">Tier {c.tier}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
