import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TransitionLink } from './TransitionLink';
import { FACTIONS, ALL_CHARACTERS } from '../data/loader';
import { Emblem } from './Emblem';

export function FactionGrid() {
  const [selectedFaction, setSelectedFaction] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedFx, setSelectedFx] = useState('all');
  const [collapsedFactions, setCollapsedFactions] = useState({});

  const toggleCollapse = (id) => {
    setCollapsedFactions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fxTypes = useMemo(() => {
    const set = new Set(ALL_CHARACTERS.map(c => c.fxType));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredFactions = useMemo(() => {
    return FACTIONS.map(faction => {
      let characters = faction.list;
      if (selectedTier !== 'all') {
        characters = characters.filter(c => c.tier === selectedTier);
      }
      if (selectedFx !== 'all') {
        characters = characters.filter(c => c.fxType === selectedFx);
      }
      return {
        ...faction,
        characters
      };
    }).filter(f => selectedFaction === 'all' || f.id === selectedFaction);
  }, [selectedFaction, selectedTier, selectedFx]);

  return (
    <section className="faction-roster-section" id="factions">
      <div className="faction-header">
        <p className="roster-tag">THE THOUSAND BLADES // ENTIRE ARCHIVE</p>
        <h2 className="roster-title">THE COMPLETE ROSTER</h2>
        <p className="roster-subtitle">
          Over 100 combatants organized across seven canonical allegiances. Select any warrior to explore their combat history, powers, and visual arts.
        </p>

        {/* Filter Controls */}
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">Faction:</span>
            <div className="filter-chips">
              <button
                className={`chip-btn ${selectedFaction === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFaction('all')}
              >
                All
              </button>
              {FACTIONS.map(f => {
                const labelMap = {
                  karakura: 'Karakura',
                  gotei13: 'Gotei 13',
                  urahara: 'Urahara Shop',
                  visored: 'Visored',
                  espada: 'Espada',
                  wandenreich: 'Wandenreich',
                  royalGuard: 'Royal Guard'
                };
                const cleanName = labelMap[f.id] || f.name.replace(/^The\s+/, '');
                return (
                  <button
                    key={f.id}
                    className={`chip-btn ${selectedFaction === f.id ? 'active' : ''}`}
                    onClick={() => setSelectedFaction(f.id)}
                  >
                    <span className="chip-kanji">{f.kanji}</span> {cleanName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Tier:</span>
            <div className="filter-chips">
              {['all', 'A', 'B', 'C'].map(t => (
                <button
                  key={t}
                  className={`chip-btn ${selectedTier === t ? 'active' : ''}`}
                  onClick={() => setSelectedTier(t)}
                >
                  {t === 'all' ? 'All Tiers' : `Tier ${t}`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Power Element:</span>
            <div className="filter-chips">
              {fxTypes.slice(0, 8).map(fx => (
                <button
                  key={fx}
                  className={`chip-btn ${selectedFx === fx ? 'active' : ''}`}
                  onClick={() => setSelectedFx(fx)}
                >
                  {fx.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Factions Accordion Container */}
      <div className="factions-container">
        {filteredFactions.map(faction => {
          const isCollapsed = !!collapsedFactions[faction.id];
          return (
            <div
              key={faction.id}
              className="faction-group"
              style={{ '--faction-color': faction.color }}
            >
              <div
                className="faction-banner"
                onClick={() => toggleCollapse(faction.id)}
                role="button"
                tabIndex={0}
                aria-expanded={!isCollapsed}
              >
                <div className="faction-banner-info">
                  <span className="faction-kanji">{faction.kanji}</span>
                  <h3 className="faction-name">{faction.name}</h3>
                  <span className="faction-count">({faction.characters.length} Warriors)</span>
                </div>
                <span className="collapse-indicator">
                  {isCollapsed ? '+ EXPAND' : '— COLLAPSE'}
                </span>
              </div>

              {!isCollapsed && (
                <div className="character-card-grid">
                  {faction.characters.map((char) => {
                    const imgSrc = char.headshot || char.image;
                    return (
                      <TransitionLink
                        to={`/character/${char.id}`}
                        charId={char.id}
                        key={char.id}
                        className={`char-card tier-${char.tier.toLowerCase()}`}
                        style={{
                          '--card-bg': char.colors.bg,
                          '--card-ink': char.colors.ink,
                          '--card-acc': char.colors.accent
                        }}
                        aria-label={`${char.name} detail page`}
                      >
                        <div className="card-emblem-wrap">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={char.name}
                              className="card-thumb"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fb = e.currentTarget.parentElement?.querySelector('.card-fallback-emblem');
                                if (fb) fb.style.display = 'grid';
                              }}
                            />
                          ) : null}
                          <div
                            className="card-fallback-emblem"
                            style={{ display: imgSrc ? 'none' : 'grid', placeItems: 'center', width: '100%', height: '100%' }}
                          >
                            <Emblem
                              fxType={char.fxType}
                              accentColor={char.colors.accent}
                              kanji={char.kanji[0]}
                              size={64}
                            />
                          </div>
                        </div>

                        <div className="card-content">
                          <div className="card-top-row">
                            <span className="card-tier-tag">TIER {char.tier}</span>
                            <span className="card-kanji" title={char.kanji}>{char.kanji}</span>
                          </div>
                          <h4 className="card-name">{char.name}</h4>
                          <p className="card-rank">{char.divisionRank || char.faction}</p>
                          <p className="card-power">{char.power?.name || 'Spiritual Pressure'}</p>
                        </div>
                      </TransitionLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
