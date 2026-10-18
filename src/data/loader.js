import karakura from './karakura.json';
import gotei13 from './gotei13.json';
import visored from './visored.json';
import espada from './espada.json';
import wandenreich from './wandenreich.json';
import royalGuard from './royalGuard.json';
import urahara from './urahara.json';

export const FACTIONS = [
  { id: 'karakura', name: 'Karakura Town & Xcution', kanji: '空座町', list: karakura, color: '#ff5a0a' },
  { id: 'gotei13', name: 'Gotei 13 Divisions', kanji: '護廷十三隊', list: gotei13, color: '#3b82f6' },
  { id: 'urahara', name: 'Urahara Shop & Shihoin', kanji: '浦原商店', list: urahara, color: '#10b981' },
  { id: 'visored', name: 'The Visored', kanji: '仮面の軍勢', list: visored, color: '#ec4899' },
  { id: 'espada', name: 'Arrancar & Espada', kanji: '十刃', list: espada, color: '#06b6d4' },
  { id: 'wandenreich', name: 'Wandenreich & Sternritter', kanji: '見えざる帝国', list: wandenreich, color: '#eab308' },
  { id: 'royalGuard', name: 'Royal Guard (Zero Division)', kanji: '王属特務', list: royalGuard, color: '#a855f7' },
];

export const ALL_CHARACTERS = [
  ...karakura,
  ...gotei13,
  ...urahara,
  ...visored,
  ...espada,
  ...wandenreich,
  ...royalGuard
];

export const TIER_A_CHARACTERS = ALL_CHARACTERS.filter(c => c.tier === 'A');
export const TIER_B_CHARACTERS = ALL_CHARACTERS.filter(c => c.tier === 'B');
export const TIER_C_CHARACTERS = ALL_CHARACTERS.filter(c => c.tier === 'C');

export function getCharacterById(id) {
  return ALL_CHARACTERS.find(c => c.id === id) || null;
}

export function getRelatedCharacters(character) {
  if (!character) return [];
  return ALL_CHARACTERS
    .filter(c => c.id !== character.id && (c.faction === character.faction || c.fxType === character.fxType))
    .slice(0, 4);
}
