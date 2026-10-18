import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const manifestPath = path.join(rootDir, 'public', 'assets', 'character-assets-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const manifestMap = {};
manifest.forEach(m => { manifestMap[m.id] = m; });

const dataDir = path.join(rootDir, 'src', 'data');

// 1. Define the 15 official characters with rich lore and combat stats
const NEW_CHARACTERS = {
  wandenreich: [
    {
      id: 'asnodt',
      name: 'Äs Nödt',
      kanji: 'エス・ノト',
      aliases: ['Sternritter F', 'The Fear'],
      faction: 'Wandenreich',
      divisionRank: 'Sternritter',
      tier: 'B',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'The Fear (Schrift F)',
        release: 'Tartarforas',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Fires Reishi thorns that inflict limitless panic and terror, causing the hearts of victims to rupture.'
      },
      powerSteps: [
        {
          title: 'Schrift F',
          name: 'The Fear',
          desc: 'Injects paralyzing psychological dread into targets through Reishi thorns.',
          tags: ['Terror', 'Reishi', 'Psychological']
        },
        {
          title: 'Vollständig',
          name: 'Tartarforas',
          desc: 'Bizarre form covered in sewing stitches and endless weeping eyes that project fear directly through the optic nerve.',
          tags: ['Vollständig', 'Optic Fear']
        }
      ],
      fxType: 'shadow',
      colors: { bg: '#0b0712', ink: '#f3e8ff', accent: '#9333ea' },
      blurb: 'Sternritter F who wields The Fear. He brutally wounded Byakuya Kuchiki using his stolen Bankai before being obliterated by Rukia Kuchiki’s absolute-zero Hakka no Togame.',
      image: '/assets/characters/asnodt.png',
      headshot: '/assets/headshots/asnodt.png',
      voiceActor: 'Yoshitsugu Matsuoka',
      birthday: 'Dec. 29',
      height: '179cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'robert',
      name: 'Robert Accutrone',
      kanji: 'ロバート・アキュトロン',
      aliases: ['Sternritter N', 'Grimaniel'],
      faction: 'Wandenreich',
      divisionRank: 'Sternritter',
      tier: 'B',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'Schrift N',
        release: 'Grimaniel',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Expert gunslinger utilizing spatial acceleration and enhanced Quincy firearms.'
      },
      powerSteps: [
        {
          title: 'Vollständig',
          name: 'Grimaniel',
          desc: 'Manifests wings of light enabling near-instantaneous high-speed teleportation and close-range handgun blasts.',
          tags: ['Speed', 'Firearms', 'Vollständig']
        }
      ],
      fxType: 'light-arrows',
      colors: { bg: '#101014', ink: '#f1f5f9', accent: '#3b82f6' },
      blurb: 'A veteran Sternritter who permanently blinded Captain Shunsui Kyoraku’s right eye during the first invasion before perishing under Yhwach’s Auswählen.',
      image: '/assets/characters/robert.png',
      headshot: '/assets/headshots/robert.png',
      voiceActor: 'Takaya Hashi',
      birthday: 'N/A',
      height: '176cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'berenice',
      name: 'Berenice Gabrielli',
      kanji: 'ベレニケ・ガブリエリ',
      aliases: ['Sternritter Q', 'The Question'],
      faction: 'Wandenreich',
      divisionRank: 'Sternritter',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'The Question (Schrift Q)',
        release: 'Doubt Manipulation',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Forces opponents into endless spirals of existential doubt and self-questioning.'
      },
      powerSteps: [
        {
          title: 'Schrift Q',
          name: 'The Question',
          desc: 'Verbally bombards enemies with debilitating philosophical paradoxes.',
          tags: ['Mind', 'Debuff']
        }
      ],
      fxType: 'kido',
      colors: { bg: '#130c14', ink: '#fae8ff', accent: '#d946ef' },
      blurb: 'Sternritter Q who attempted to trap Kenpachi Zaraki in doubt, only to be promptly silenced when Kenpachi tore out his throat.',
      image: '/assets/characters/berenice.png',
      headshot: '/assets/headshots/berenice.png',
      voiceActor: 'KENN',
      birthday: 'Feb. 8',
      height: '174cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'jerome',
      name: 'Jerome Guizbatt',
      kanji: 'ジェローム・ギズバット',
      aliases: ['Sternritter R', 'The Roar'],
      faction: 'Wandenreich',
      divisionRank: 'Sternritter',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'The Roar (Schrift R)',
        release: 'Sonic Shockwave',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Transforms into an ape-like beast unleashing concussive sonic screams that rupture enemy organs.'
      },
      powerSteps: [
        {
          title: 'Schrift R',
          name: 'The Roar',
          desc: 'Generates deafening acoustic blasts capable of crushing stone and eardrums.',
          tags: ['Sonic', 'Brute']
        }
      ],
      fxType: 'blades',
      colors: { bg: '#140c06', ink: '#fed7aa', accent: '#f97316' },
      blurb: 'Sternritter R who assumed bestial form against Kenpachi Zaraki, only to be vertically bisected by Zaraki’s Zanpakuto.',
      image: '/assets/characters/jerome.png',
      headshot: '/assets/headshots/jerome.png',
      voiceActor: 'Takahiro Fujiwara',
      birthday: 'Aug. 25',
      height: '189cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'james',
      name: 'James',
      kanji: 'ジェームズ',
      aliases: ['The Superstar Fan', 'Ring Companion'],
      faction: 'Wandenreich',
      divisionRank: 'Vanguard Supporter',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'The Cheers (Schrift S Core)',
        release: 'Fanatical Revival',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Chants enthusiastic cheers that instantaneously heal and empower Mask De Masculine with infinite strength.'
      },
      powerSteps: [
        {
          title: 'Vocal Fanaticism',
          name: 'Cheering Support',
          desc: 'No matter how many times Mask is cut down, James’s cheers restore him to prime fighting form.',
          tags: ['Buff', 'Regeneration']
        }
      ],
      fxType: 'fire',
      colors: { bg: '#160808', ink: '#fecaca', accent: '#ef4444' },
      blurb: 'The diminutive hype-man whose unending adoration fueled Mask De Masculine’s invincible wrestling stardom until sliced away by Renji Abarai.',
      image: '/assets/characters/james.png',
      headshot: '/assets/headshots/james.png',
      voiceActor: 'Kenichi Suzumura',
      birthday: 'N/A',
      height: '92cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'gwenael',
      name: 'Gwenael Lee',
      kanji: 'グエナエル・リー',
      aliases: ['The Vanishing Point', 'Gremmy Creation'],
      faction: 'Wandenreich',
      divisionRank: 'Phantom Vanguard',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'Vanishing Point (Schrift V Product)',
        release: 'Memory Erasure',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Erases his form from vision, tangible existence, and even the minds and memories of opponents.'
      },
      powerSteps: [
        {
          title: 'Triple Phasing',
          name: 'Vanishing Existence',
          desc: 'Steps out of physical dimension and erases his existence from enemy memory before striking.',
          tags: ['Stealth', 'Phase']
        }
      ],
      fxType: 'illusion',
      colors: { bg: '#081014', ink: '#e0f2fe', accent: '#06b6d4' },
      blurb: 'An elusive phantom conjured into reality by Gremmy Thoumeaux’s imagination who clashed with Yachiru before Gremmy dissolved his existence.',
      image: '/assets/characters/gwenael.png',
      headshot: '/assets/headshots/gwenael.png',
      voiceActor: 'Tadashi Miyazawa',
      birthday: 'N/A',
      height: '155cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'nianzol',
      name: 'Nianzol Weizol',
      kanji: 'ニャンゾル・ワイゾル',
      aliases: ['Sternritter W', 'The Wind'],
      faction: 'Wandenreich',
      divisionRank: 'Sternritter',
      tier: 'B',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'The Wind (Schrift W)',
        release: 'Trajectory Deflection',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Instinctively bends and deflects all attacks and weapons away from him in mid-air before they can make contact.'
      },
      powerSteps: [
        {
          title: 'Schrift W',
          name: 'The Wind',
          desc: 'Warps space to divert incoming blades and spells away harmlessly.',
          tags: ['Deflection', 'Space']
        }
      ],
      fxType: 'gravity',
      colors: { bg: '#0f140e', ink: '#ecfccb', accent: '#84cc16' },
      blurb: 'The double-tongued Sternritter hiding under Yhwach’s shadow whose impenetrable defensive field was pierced and woven through by Senjumaru Shutara’s tapestry needles.',
      image: '/assets/characters/nianzol.png',
      headshot: '/assets/headshots/nianzol.png',
      voiceActor: 'Soichiro Hoshi',
      birthday: 'May 21',
      height: '156cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'ebern',
      name: 'Asguiaro Ebern',
      kanji: 'アズギエロ・イーバーン',
      aliases: ['Quincy Vanguard', 'Medallion Scout'],
      faction: 'Wandenreich',
      divisionRank: 'Scout Vanguard',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'Bankai Plunder Medallion',
        release: 'Reishi Cross Cannon',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Combines Arrancar hollow energy with Quincy Reishi artillery and Bankai stealing medallions.'
      },
      powerSteps: [
        {
          title: 'Medallion Probe',
          name: 'Bankai Sealing Attempt',
          desc: 'Attempted to seal Ichigo’s Bankai with a Wandenreich medallion, failing due to Ichigo’s inner Hollow essence.',
          tags: ['Medallion', 'Quincy Art']
        }
      ],
      fxType: 'hollow-energy',
      colors: { bg: '#120f0d', ink: '#ffedd5', accent: '#ea580c' },
      blurb: 'An Arrancar subjugated into Wandenreich service who assaulted Ichigo in Karakura Town to test the Bankai-stealing Medallion.',
      image: '/assets/characters/ebern.png',
      headshot: '/assets/headshots/ebern.png',
      voiceActor: 'Wataru Komada',
      birthday: 'Jun. 18',
      height: '181cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'luders',
      name: 'Lüdaas Friegen',
      kanji: 'リューダース・フリーゲン',
      aliases: ['War Messenger', 'Wandenreich Vanguard'],
      faction: 'Wandenreich',
      divisionRank: 'Diplomatic Vanguard',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Deceased',
      power: {
        name: 'Quincy Reishi Bow',
        release: 'War Declaration',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Specializes in stealth infiltration and formal diplomatic wartime declaration.'
      },
      powerSteps: [
        {
          title: 'Ultimatum Delivery',
          name: 'Declaration of War',
          desc: 'Delivered Yhwach’s ultimatum to Captain-Commander Yamamoto, declaring Soul Society’s destruction within 5 days.',
          tags: ['War', 'Quincy']
        }
      ],
      fxType: 'light-arrows',
      colors: { bg: '#100a12', ink: '#fce7f3', accent: '#ec4899' },
      blurb: 'The insolent Wandenreich soldier who confronted Yamamoto in the 1st Division barracks, subsequently decapitated by Yhwach for speaking of the distant future.',
      image: '/assets/characters/luders.png',
      headshot: '/assets/headshots/luders.png',
      voiceActor: 'Daiki Hamano',
      birthday: 'Aug. 12',
      height: '184cm',
      video: { type: null, src: '', title: '' }
    }
  ],
  espada: [
    {
      id: 'luppi',
      name: 'Luppi Antenor',
      kanji: 'ルピ・アンテノール',
      aliases: ['Sexta Espada (Former)', 'Mayuri Corpse Unit'],
      faction: 'Hueco Mundo / Espada',
      divisionRank: '6th Espada (Temporary)',
      tier: 'B',
      firstArc: 'Arrancar: The Arrival',
      status: 'Resurrected',
      power: {
        name: 'Trepadora (Strangle)',
        release: 'Strangle (Kubikukure)',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Sprouts eight giant, flexible Reishi tentacles capable of crushing battalions and firing multi-angled Cero.'
      },
      powerSteps: [
        {
          title: 'Resurreccion',
          name: 'Trepadora',
          desc: 'Unleashes eight devastating tentacles that constrict and smash targets with overwhelming force.',
          tags: ['Tentacles', 'Crush', 'Resurreccion']
        }
      ],
      fxType: 'hollow-energy',
      colors: { bg: '#081214', ink: '#ecfeff', accent: '#06b6d4' },
      blurb: 'The flamboyant Arrancar who briefly held the 6th Espada title before Grimmjow obliterated him; later resurrected by Mayuri Kurotsuchi to fight the Wandenreich.',
      image: '/assets/characters/luppi.png',
      headshot: '/assets/headshots/luppi.png',
      voiceActor: 'Daisuke Kishio',
      birthday: 'Jun. 5',
      height: '161cm',
      video: { type: null, src: '', title: '' }
    }
  ],
  karakura: [
    {
      id: 'masaki',
      name: 'Masaki Kurosaki',
      kanji: '黒崎 真咲',
      aliases: ['Pureblood Quincy', 'Mother of Ichigo'],
      faction: 'Karakura Town',
      divisionRank: 'Echt Quincy',
      tier: 'B',
      firstArc: 'The Thousand-Year Blood War (Flashback)',
      status: 'Deceased',
      power: {
        name: 'Blut Vene & Reishi Bow',
        release: 'Iron Blood Armor',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Master of Blut Vene defensive forcefields and rapid-fire holy spirit arrows.'
      },
      powerSteps: [
        {
          title: 'Blut Vene Mastery',
          name: 'Defensive Circulation',
          desc: 'Infuses Reishi directly into blood vessels, rendering flesh impenetrable even to Hollow White.',
          tags: ['Blut Vene', 'Pureblood Quincy']
        }
      ],
      fxType: 'light-arrows',
      colors: { bg: '#140c06', ink: '#ffedd5', accent: '#f59e0b' },
      blurb: 'The brave Echt Quincy mother of Ichigo who saved Isshin Shiba from Hollow White. Slain by Grand Fisher after losing her powers during Yhwach’s Auswählen.',
      image: '/assets/characters/masaki.png',
      headshot: '/assets/headshots/masaki.png',
      voiceActor: 'Sayaka Ohara',
      birthday: 'Jun. 9',
      height: '161cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'katagiri',
      name: 'Kanae Katagiri',
      kanji: '片桐 叶絵',
      aliases: ['Gemischt Quincy', 'Mother of Uryu'],
      faction: 'Karakura Town',
      divisionRank: 'Quincy Servant',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War (Flashback)',
      status: 'Deceased',
      power: {
        name: 'Heilig Bogen',
        release: 'Reishi Devotion',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Devoted maid of the Ishida estate wielding standard Quincy spirit archery.'
      },
      powerSteps: [
        {
          title: 'Quincy Heritage',
          name: 'Gemischt Arrow',
          desc: 'Archery technique taught within the Ishida household for clan protection.',
          tags: ['Quincy', 'Service']
        }
      ],
      fxType: 'light-arrows',
      colors: { bg: '#0d1017', ink: '#f1f5f9', accent: '#64748b' },
      blurb: 'The gentle mother of Uryu Ishida and wife of Ryuken Ishida who passed away when her spiritual power was stripped by Yhwach’s Auswählen.',
      image: '/assets/characters/katagiri.png',
      headshot: '/assets/headshots/katagiri.png',
      voiceActor: 'Mamiko Noto',
      birthday: 'Jun. 10',
      height: '162cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'ganju',
      name: 'Ganju Shiba',
      kanji: '志波 岩鷲',
      aliases: ['Crimson Bullet of West Rukongai', 'Shiba Clan Heir'],
      faction: 'Karakura Town',
      divisionRank: 'Shiba Clan Vanguard',
      tier: 'B',
      firstArc: 'Soul Society: The Sneak Entry',
      status: 'Active',
      power: {
        name: 'Seppa (Stone Earth Turning)',
        release: 'Sand Wave Burst',
        shikai: 'N/A',
        bankai: 'N/A',
        notes: 'Transforms solid stone and bedrock into loose sinking sand, complemented by custom explosive fireworks.'
      },
      powerSteps: [
        {
          title: 'Earth Alchemy',
          name: 'Seppa',
          desc: 'Turns rock walls and floors into flowing sand traps to disorient foes.',
          tags: ['Earth', 'Trap']
        },
        {
          title: 'Fireworks Artillery',
          name: 'Shiba Firecracker',
          desc: 'Detonates volatile flash powder shells for tactical shockwaves.',
          tags: ['Explosive', 'Fireworks']
        }
      ],
      fxType: 'fire',
      colors: { bg: '#150a04', ink: '#ffedd5', accent: '#d97706' },
      blurb: 'The boisterous younger brother of Kaien and Kukaku Shiba who rode into the Soul Palace alongside Ichigo to avenge his family and protect the balance of worlds.',
      image: '/assets/characters/ganju.png',
      headshot: '/assets/headshots/ganju.png',
      voiceActor: 'Wataru Takagi',
      birthday: 'Oct. 15',
      height: '182cm',
      video: { type: null, src: '', title: '' }
    }
  ],
  gotei13: [
    {
      id: 'ryunosuke',
      name: 'Ryunosuke Yuki',
      kanji: '行木 竜之介',
      aliases: ['Squad 13 Patrol Officer', 'Karakura Guard'],
      faction: 'Gotei 13',
      divisionRank: 'Squad 13 Officer',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Active',
      power: {
        name: 'Standard Zanpakuto',
        release: 'N/A',
        shikai: 'Unreleased',
        bankai: 'N/A',
        notes: 'Trained in orthodox Zanjutsu and basic Karakura patrol tracking.'
      },
      powerSteps: [
        {
          title: 'Town Defense',
          name: 'Karakura Patrol',
          desc: 'Maintains vigilance over supernatural spikes across Karakura Town alongside Shino.',
          tags: ['Patrol', 'Squad 13']
        }
      ],
      fxType: 'blades',
      colors: { bg: '#091017', ink: '#e0f2fe', accent: '#0284c7' },
      blurb: 'The nervous young Soul Reaper dispatched to Karakura Town who was rescued by Ichigo from a sudden Hollow swarm at the onset of the Blood War.',
      image: '/assets/characters/ryunosuke.png',
      headshot: '/assets/headshots/ryunosuke.png',
      voiceActor: 'Daiki Yamashita',
      birthday: 'May 9',
      height: '156cm',
      video: { type: null, src: '', title: '' }
    },
    {
      id: 'shino',
      name: 'Shino Madarame',
      kanji: '斑目 志乃',
      aliases: ['Squad 13 Patrol Officer', 'Ikkaku Blood Relative'],
      faction: 'Gotei 13',
      divisionRank: 'Squad 13 Officer',
      tier: 'C',
      firstArc: 'The Thousand-Year Blood War',
      status: 'Active',
      power: {
        name: 'Standard Zanpakuto',
        release: 'N/A',
        shikai: 'Unreleased',
        bankai: 'N/A',
        notes: 'Combative martial technique inherited from the Madarame warrior bloodline.'
      },
      powerSteps: [
        {
          title: 'Fierce Defense',
          name: 'Combat Reflexes',
          desc: 'Commands high combat spirit reminiscent of her cousin Ikkaku Madarame.',
          tags: ['Martial', 'Madarame']
        }
      ],
      fxType: 'blades',
      colors: { bg: '#140809', ink: '#ffe4e6', accent: '#e11d48' },
      blurb: 'A resolute Squad 13 Shinigami and relative of Ikkaku Madarame stationed in Karakura Town who stood her ground through the initial Hollow ambush.',
      image: '/assets/characters/shino.png',
      headshot: '/assets/headshots/shino.png',
      voiceActor: 'Asami Seto',
      birthday: 'Apr. 16',
      height: '159cm',
      video: { type: null, src: '', title: '' }
    }
  ]
};

// Update all 7 faction files
const FACTION_FILES = [
  'karakura.json',
  'gotei13.json',
  'urahara.json',
  'visored.json',
  'espada.json',
  'wandenreich.json',
  'royalGuard.json'
];

let totalCharactersCount = 0;

for (const file of FACTION_FILES) {
  const filePath = path.join(dataDir, file);
  const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const factionKey = file.replace('.json', '');

  // If there are new characters for this faction, append them if not already present
  if (NEW_CHARACTERS[factionKey]) {
    NEW_CHARACTERS[factionKey].forEach(nc => {
      if (!list.some(existing => existing.id === nc.id)) {
        list.push(nc);
        console.log(`Added new character: ${nc.name} (${nc.id}) to ${file}`);
      }
    });
  }

  // Update every character in list with image, headshot, and metadata from manifest
  list.forEach(c => {
    c.image = `/assets/characters/${c.id}.png`;
    c.headshot = `/assets/headshots/${c.id}.png`;

    const m = manifestMap[c.id];
    if (m) {
      if (m.voiceActor && !c.voiceActor) c.voiceActor = m.voiceActor;
      if (m.birthday && !c.birthday) c.birthday = m.birthday;
      if (m.height && !c.height) c.height = m.height;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
  totalCharactersCount += list.length;
  console.log(`Updated ${file} (now contains ${list.length} characters)`);
}

console.log(`\nAll factions updated! Total character roster across all files: ${totalCharactersCount}`);
