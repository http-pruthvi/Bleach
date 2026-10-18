import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCharacterById } from '../data/loader';
import { Emblem } from '../components/Emblem';

const DIVISIONS = [
  {
    num: '01',
    kanji: '一番隊',
    name: 'First Division (Squad 1)',
    captainId: 'yamamoto',
    lieutenantId: 'sasakibe',
    duty: 'Supreme Command of the Gotei 13 & Central Strategy',
    flower: 'Chrysanthemum (菊)',
    meaning: 'Truth and Innocence (真実と無垢)',
    captainRelease: 'Ryūjin Jakka (流刃若火) • "All Things in the Universe, Turn to Ashes"',
    lieutenantRelease: 'Gonryōmaru (厳霊丸) • "Pierce"'
  },
  {
    num: '02',
    kanji: '二番隊',
    name: 'Second Division (Squad 2)',
    captainId: 'soifon',
    lieutenantId: 'omaeda',
    duty: 'Onmitsukidō / Stealth Force, Assassination & Internal Corrections',
    flower: 'Pasque Flower (翁草)',
    meaning: 'Seek Nothing (何も求めない)',
    captainRelease: 'Suzumebachi (雀蜂) • "Sting All Enemies to Death"',
    lieutenantRelease: 'Gegetsuburi (五形頭) • "Crush"'
  },
  {
    num: '03',
    kanji: '三番隊',
    name: 'Third Division (Squad 3)',
    captainId: 'gin',
    lieutenantId: 'kira',
    duty: 'Frontline Warfare & Defensive Interdiction',
    flower: 'Marigold (金盞花)',
    meaning: 'Despair (絶望)',
    captainRelease: 'Shinsō (神鎗) • "Shoot \'Em Dead"',
    lieutenantRelease: 'Wabisuke (侘助) • "Raise Your Head"'
  },
  {
    num: '04',
    kanji: '四番隊',
    name: 'Fourth Division (Squad 4)',
    captainId: 'unohana',
    lieutenantId: 'isane',
    duty: 'Medical Relief, Triage & Seireitei Maintenance',
    flower: 'Gentian (竜胆)',
    meaning: 'Those who mourn are loved (悲しんでいるあなたを愛する)',
    captainRelease: 'Minazuki (肉雫唼) • Supreme Healer & First Kenpachi',
    lieutenantRelease: 'Itegumo (凍雲) • "Run!"'
  },
  {
    num: '05',
    kanji: '五番隊',
    name: 'Fifth Division (Squad 5)',
    captainId: 'aizen',
    lieutenantId: 'hinamori',
    duty: 'Tactical Kidō Warfare & Crisis Communications',
    flower: 'Lily of the Valley (馬酔木)',
    meaning: 'Sacrifice, Danger, Pure Love (犠牲・危険・清純な愛)',
    captainRelease: 'Kyōka Suigetsu (鏡花水月) • "Shatter"',
    lieutenantRelease: 'Tobiume (飛梅) • "Snap"'
  },
  {
    num: '06',
    kanji: '六番隊',
    name: 'Sixth Division (Squad 6)',
    captainId: 'byakuya',
    lieutenantId: 'renji',
    duty: 'Internal Affairs, Noble Clan Security & Model Division Protocol',
    flower: 'Camellia (椿)',
    meaning: 'Noble Reason (気高き理性)',
    captainRelease: 'Senbonzakura (千本桜) • "Scatter"',
    lieutenantRelease: 'Zabimaru (蛇尾丸) • "Howl"'
  },
  {
    num: '07',
    kanji: '七番隊',
    name: 'Seventh Division (Squad 7)',
    captainId: 'komamura',
    lieutenantId: 'iba',
    duty: 'Martial Fortitude, Heavy Defense & High Honor Guard',
    flower: 'Japanese Iris (菖蒲)',
    meaning: 'Courage (勇気)',
    captainRelease: 'Tenken (天譴) • "Roar"',
    lieutenantRelease: 'Iba\'s Zanpakutō • Martial Honor & Yakuza Resolve'
  },
  {
    num: '08',
    kanji: '八番隊',
    name: 'Eighth Division (Squad 8)',
    captainId: 'shunsui',
    lieutenantId: 'nanao',
    duty: 'Intelligence, Reconnaissance & Strategic Reserve',
    flower: 'Bird of Paradise (極楽鳥花)',
    meaning: 'Get Everything (すべてを手に入れる)',
    captainRelease: 'Katen Kyōkotsu (花天狂骨) • "Flower Wind Rages, Flower God Weeps"',
    lieutenantRelease: 'Shinken Hakkyōken (神剣・八鏡剣) • Sacred Mirror Sword'
  },
  {
    num: '09',
    kanji: '九番隊',
    name: 'Ninth Division (Squad 9)',
    captainId: 'tosen',
    lieutenantId: 'hisagi',
    duty: 'Seireitei Security, Prison Guard & Seireitei Bulletin Editorial',
    flower: 'White Poppy (白芥子)',
    meaning: 'Oblivion (忘却)',
    captainRelease: 'Suzumushi (清虫) • "Cry"',
    lieutenantRelease: 'Kazeshini (風死) • "Reap"'
  },
  {
    num: '10',
    kanji: '十番隊',
    name: 'Tenth Division (Squad 10)',
    captainId: 'toshiro',
    lieutenantId: 'matsumoto',
    duty: 'Large-Scale Suppression & Real-World Patrol Vanguard',
    flower: 'Narcissus (水仙)',
    meaning: 'Mystery and Egoism (神秘とエゴイズム)',
    captainRelease: 'Hyōrinmaru (氷輪丸) • "Sit Upon the Frosted Heavens"',
    lieutenantRelease: 'Haineko (灰猫) • "Growl"'
  },
  {
    num: '11',
    kanji: '十一番隊',
    name: 'Eleventh Division (Squad 11)',
    captainId: 'kenpachi',
    lieutenantId: 'yachiru',
    duty: 'Direct Combat, Shock Troops & Pure Swordsmanship Vanguard',
    flower: 'Yarrow (鋸草)',
    meaning: 'Fight (戦い)',
    captainRelease: 'Nozarashi (野晒) • "Drink"',
    lieutenantRelease: 'Sanpo Kenjū (三歩剣獣) • Three-Step Sword Beasts'
  },
  {
    num: '12',
    kanji: '十二番隊',
    name: 'Twelfth Division (Squad 12)',
    captainId: 'mayuri',
    lieutenantId: 'nemu',
    duty: 'Shinigami Research & Development Institute (S.R.D.I.)',
    flower: 'Thistle (薊)',
    meaning: 'Vengeance, Strictness, Independence (復讐・厳格・独立)',
    captainRelease: 'Ashisogi Jizō (疋殺地蔵) • "Claw Out"',
    lieutenantRelease: 'Nemuri Nanagō (眠七号) • Artificial Mod-Soul Project'
  },
  {
    num: '13',
    kanji: '十三番隊',
    name: 'Thirteenth Division (Squad 13)',
    captainId: 'ukitake',
    lieutenantId: 'rukia',
    duty: 'Karakura Town Defense, World of the Living Patrol & Purification',
    flower: 'Snowdrop (待雪草)',
    meaning: 'Hope (希望)',
    captainRelease: 'Sōgyo no Kotowari (双魚理) • "All Waves, Rise Now and Become My Shield"',
    lieutenantRelease: 'Sode no Shirayuki (袖白雪) • "Dance"'
  }
];

export function Gotei13Chart() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredDivisions = useMemo(() => {
    if (!filterQuery.trim()) return DIVISIONS;
    const q = filterQuery.toLowerCase().trim();
    return DIVISIONS.filter(div => {
      const captain = getCharacterById(div.captainId);
      const lieutenant = getCharacterById(div.lieutenantId);
      return (
        div.num.includes(q) ||
        div.name.toLowerCase().includes(q) ||
        div.duty.toLowerCase().includes(q) ||
        div.flower.toLowerCase().includes(q) ||
        div.meaning.toLowerCase().includes(q) ||
        div.kanji.includes(q) ||
        captain?.name.toLowerCase().includes(q) ||
        captain?.kanji.includes(q) ||
        lieutenant?.name.toLowerCase().includes(q) ||
        lieutenant?.kanji.includes(q)
      );
    });
  }, [filterQuery]);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-global-search'));
  };

  return (
    <div className="gotei13-chart-page">
      <header className="chart-header">
        <div className="chart-top-bar">
          <div className="chart-top-actions">
            <Link to="/" className="detail-back-btn">← Back to Main Page</Link>
            <button
              type="button"
              className="chart-search-btn"
              onClick={handleOpenSearch}
              aria-label="Open global search modal"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>SEARCH ALL WARRIORS [/]</span>
            </button>
          </div>
          <span className="chart-stats-badge">13 SQUADS • 26 OFFICERS</span>
        </div>

        <div>
          <span className="roster-tag">SOUL SOCIETY HIERARCHY // 護廷十三隊</span>
          <h1 className="roster-title">GOTEI 13 ORGANIZATION CHART</h1>
          <p className="roster-subtitle">
            Command hierarchy and division philosophies of the Thirteen Court Guard Squads. Click any Captain or Lieutenant to inspect their full combat dossier.
          </p>
        </div>

        <div className="chart-filter-bar">
          <input
            type="text"
            className="chart-filter-input"
            placeholder="Filter by officer name, squad number, duty, or flower (e.g. Kenpachi, Medical, 11)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            aria-label="Filter Gotei 13 squads"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear Filter ({filteredDivisions.length} matches)
            </button>
          )}
        </div>
      </header>

      <div className="divisions-grid">
        {filteredDivisions.map(div => {
          const captain = getCharacterById(div.captainId);
          const lieutenant = getCharacterById(div.lieutenantId);

          return (
            <div key={div.num} className="division-card">
              <span className="div-watermark-kanji" aria-hidden="true">{div.kanji}</span>

              <div className="div-card-header">
                <div className="div-header-top">
                  <span className="div-number-pill">{div.kanji} // SQUAD {div.num}</span>
                  <span className="div-flower-tag">{div.flower}</span>
                </div>
                <h3 className="div-duty">{div.duty}</h3>
                <span className="div-philosophy">Philosophy: "{div.meaning}"</span>
              </div>

              <div className="officers-tier-stack">
                {/* Captain Card */}
                {captain && (
                  <Link
                    to={`/character/${captain.id}`}
                    className="officer-row captain"
                    style={{ '--off-accent': captain.colors?.accent || '#ff5a0a' }}
                    title={`View ${captain.name}'s combat profile`}
                  >
                    <div className="officer-thumb">
                      {(captain.image || captain.headshot) ? (
                        <img
                          src={captain.image || captain.headshot}
                          alt={captain.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentElement.querySelector('.officer-fallback-emblem');
                            if (fallback) fallback.style.display = 'grid';
                          }}
                        />
                      ) : null}
                      <div className="officer-fallback-emblem" style={{ display: (captain.image || captain.headshot) ? 'none' : 'grid' }}>
                        <Emblem fxType={captain.fxType} accentColor={captain.colors?.accent || '#ff5a0a'} kanji={captain.kanji?.[0] || '隊'} size={36} />
                      </div>
                    </div>

                    <div className="officer-info">
                      <div className="officer-meta-row">
                        <span className="officer-badge">CAPTAIN</span>
                        <span className="officer-kanji-tag">隊長</span>
                      </div>
                      <span className="officer-name">{captain.name}</span>
                      <span className="officer-power">{div.captainRelease || captain.power?.name || 'Zanpakuto'}</span>
                    </div>

                    <span className="officer-chevron" aria-hidden="true">→</span>
                  </Link>
                )}

                {/* Lieutenant Card */}
                {lieutenant && (
                  <Link
                    to={`/character/${lieutenant.id}`}
                    className="officer-row lieutenant"
                    style={{ '--off-accent': lieutenant.colors?.accent || '#3b82f6' }}
                    title={`View ${lieutenant.name}'s combat profile`}
                  >
                    <div className="officer-thumb">
                      {(lieutenant.image || lieutenant.headshot) ? (
                        <img
                          src={lieutenant.image || lieutenant.headshot}
                          alt={lieutenant.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentElement.querySelector('.officer-fallback-emblem');
                            if (fallback) fallback.style.display = 'grid';
                          }}
                        />
                      ) : null}
                      <div className="officer-fallback-emblem" style={{ display: (lieutenant.image || lieutenant.headshot) ? 'none' : 'grid' }}>
                        <Emblem fxType={lieutenant.fxType} accentColor={lieutenant.colors?.accent || '#3b82f6'} kanji={lieutenant.kanji?.[0] || '副'} size={36} />
                      </div>
                    </div>

                    <div className="officer-info">
                      <div className="officer-meta-row">
                        <span className="officer-badge">LIEUTENANT</span>
                        <span className="officer-kanji-tag">副隊長</span>
                      </div>
                      <span className="officer-name">{lieutenant.name}</span>
                      <span className="officer-power">{div.lieutenantRelease || lieutenant.power?.name || 'Zanpakuto'}</span>
                    </div>

                    <span className="officer-chevron" aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
