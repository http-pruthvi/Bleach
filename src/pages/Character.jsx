import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById } from '../data/loader';
import { getThemeForCharacter } from '../data/themes.js';

// 12 Bespoke Tier A Layouts
import { IchigoLayout } from './layouts/IchigoLayout';
import { RukiaLayout } from './layouts/RukiaLayout';
import { OrihimeLayout } from './layouts/OrihimeLayout';
import { ChadLayout } from './layouts/ChadLayout';
import { UryuLayout } from './layouts/UryuLayout';
import { RenjiLayout } from './layouts/RenjiLayout';
import { ByakuyaLayout } from './layouts/ByakuyaLayout';
import { ToshiroLayout } from './layouts/ToshiroLayout';
import { KenpachiLayout } from './layouts/KenpachiLayout';
import { AizenLayout } from './layouts/AizenLayout';
import { YoruichiLayout } from './layouts/YoruichiLayout';
import { UraharaLayout } from './layouts/UraharaLayout';

import { GenericLayout } from './layouts/GenericLayout';
import { NotFound } from './NotFound';

export function Character() {
  const { id } = useParams();
  const character = getCharacterById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!character) {
    return <NotFound invalidWarriorId={id} />;
  }

  const theme = getThemeForCharacter(character);

  // 12 Bespoke Tier A Layouts
  if (character.id === 'ichigo') return <IchigoLayout character={character} theme={theme} />;
  if (character.id === 'rukia') return <RukiaLayout character={character} theme={theme} />;
  if (character.id === 'orihime') return <OrihimeLayout character={character} theme={theme} />;
  if (character.id === 'chad') return <ChadLayout character={character} theme={theme} />;
  if (character.id === 'uryu') return <UryuLayout character={character} theme={theme} />;
  if (character.id === 'renji') return <RenjiLayout character={character} theme={theme} />;
  if (character.id === 'byakuya') return <ByakuyaLayout character={character} theme={theme} />;
  if (character.id === 'toshiro') return <ToshiroLayout character={character} theme={theme} />;
  if (character.id === 'kenpachi') return <KenpachiLayout character={character} theme={theme} />;
  if (character.id === 'aizen') return <AizenLayout character={character} theme={theme} />;
  if (character.id === 'yoruichi') return <YoruichiLayout character={character} theme={theme} />;
  if (character.id === 'urahara') return <UraharaLayout character={character} theme={theme} />;

  // Tier B & C 6-Family Layout
  return <GenericLayout character={character} theme={theme} />;
}
