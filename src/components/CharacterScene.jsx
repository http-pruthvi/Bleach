import React, { useEffect, useRef, useState } from 'react';
import { TransitionLink } from './TransitionLink';
import { useCanvasFx } from '../fx/useCanvasFx';
import { getFxForCharacter } from '../fx/presets';
import { getThemeForCharacter } from '../data/themes.js';
import { Emblem } from './Emblem';
import { TextureOverlay } from './TextureOverlay';

export function CharacterScene({ character, index }) {
  const sceneRef = useRef(null);
  const pinRef = useRef(null);
  const [inView, setInView] = useState(false);

  const theme = getThemeForCharacter(character);
  const fxFactory = getFxForCharacter(character);
  const { canvasRef, triggerAction } = useCanvasFx({
    fxFactory,
    character,
    inView,
    interactive: true
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="char-scene"
      id={character.id}
      ref={sceneRef}
      style={{
        '--scene-bg': theme.palette.bg,
        '--scene-ink': theme.palette.ink,
        '--scene-acc': theme.palette.accent,
        '--scene-font': `"${theme.type.display}", serif`,
        '--kanji-len': character.kanji.length,
        zIndex: index + 2
      }}
      data-cursor={theme.cursor}
      aria-label={character.name}
    >
      <div
        className="scene-pin"
        ref={pinRef}
        onClick={(e) => {
          if (e.target !== canvasRef.current && !e.target.closest('a') && !e.target.closest('button')) {
            const rect = pinRef.current.getBoundingClientRect();
            triggerAction(e.clientX - rect.left, e.clientY - rect.top);
          }
        }}
      >
        <TextureOverlay texture={theme.texture} accent={theme.palette.accent} />
        <canvas className="scene-canvas" ref={canvasRef} aria-hidden="true" />

        {/* Character Figure or Emblem */}
        <div className="scene-fig" aria-hidden="true">
          <div className="fig-slab" />
          {character.image ? (
            <img src={character.image} alt={character.name} loading="lazy" />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <Emblem
                fxType={character.fxType}
                accentColor={theme.palette.accent}
                kanji={character.kanji[0]}
                size={280}
              />
            </div>
          )}
        </div>

        {/* Giant Vertical Kanji */}
        <div className="scene-kanji" aria-hidden="true">
          <span className="outline">{character.kanji}</span>
          <span className="fill">{character.kanji}</span>
        </div>

        {/* Narrative Copy Column */}
        <div className="scene-copy">
          <div className="copy-meta">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{character.divisionRank || character.faction}</span>
          </div>

          <h2 className="char-title" style={{ fontFamily: `"${theme.type.display}", serif` }}>
            {character.name}
          </h2>

          <div className="char-tags">
            <span className="power-pill">
              {character.power?.name || 'ZANPAKUTO'}
            </span>
            <TransitionLink
              to={`/character/${character.id}`}
              charId={character.id}
              className="detail-btn"
              aria-label={`View power breakdown for ${character.name}`}
            >
              <span>卍解</span> Bankai / Power →
            </TransitionLink>
          </div>

          <p className="char-blurb">{character.blurb}</p>

          <div className="char-hint">
            <span>◆</span>
            <span>Click canvas to unleash technique</span>
          </div>
        </div>
      </div>
    </section>
  );
}
