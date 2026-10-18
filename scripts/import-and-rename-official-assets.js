import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const officialDir = 'C:/Users/pruthvi/Downloads/CHARACTER _ TV Animation Series BLEACH_ Thousand-Year Blood War Official Website_files';
const officialHtmlPath = 'C:/Users/pruthvi/Downloads/CHARACTER _ TV Animation Series BLEACH_ Thousand-Year Blood War Official Website.html';

const destCharsDir = path.join(rootDir, 'public', 'assets', 'characters');
const destHeadshotsDir = path.join(rootDir, 'public', 'assets', 'headshots');
const destBackupDir = path.join(rootDir, 'public', 'assets', 'characters_backup');
const destOfficialDir = path.join(rootDir, 'public', 'assets', 'official');
const dataDir = path.join(rootDir, 'src', 'data');

[destCharsDir, destHeadshotsDir, destBackupDir, destOfficialDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Load MANUAL_MAP from test-mapping.js
const MANUAL_MAP = {
  'Ichigo Kurosaki': 'ichigo',
  'Orihime Inoue': 'orihime',
  'Yasutora Sado (Chad)': 'chad',
  'Kisuke Urahara': 'urahara',
  'Yoruichi Shihoin': 'yoruichi',
  'Isshin Kurosaki': 'isshin',
  'Ryuken Ishida': 'ryuken',
  'Masaki Kurosaki': 'masaki',
  'Kanae Katagiri': 'katagiri',
  'Syunsui Kyoraku': 'shunsui',
  'Nanao Ise': 'nanao',
  'Soi Fon': 'soifon',
  'Marechiyo Omaeda': 'omaeda',
  'Rojuro Ohtoribashi': 'rose',
  'Izuru Kira': 'kira',
  'Isane Kotetsu': 'isane',
  'Shinji Hirako': 'shinji',
  'Momo Hinamori': 'hinamori',
  'Byakuya Kuchiki': 'byakuya',
  'Renji Abarai': 'renji',
  'Sajin Komamura': 'komamura',
  'Tetsuzaemon Iba': 'iba',
  'Kensei Muguruma': 'kensei',
  'Shuhei Hisagi': 'hisagi',
  'Toshiro Hitsugaya': 'toshiro',
  'Rangiku Matsumoto': 'matsumoto',
  'Kenpachi Zaraki': 'kenpachi',
  'Yachiru Kusajishi': 'yachiru',
  'Ikkaku Madarame': 'ikkaku',
  'Yumichika Ayasegawa': 'yumichika',
  'Mayuri Kurotsuchi': 'mayuri',
  'Nemu Kurotsuchi': 'nemu',
  'Akon': 'akon',
  'Jushiro Ukitake': 'ukitake',
  'Rukia Kuchiki': 'rukia',
  'Ryunosuke Yuki': 'ryunosuke',
  'Shino Madarame': 'shino',
  'Sosuke Aizen': 'aizen',
  'Ganju Shiba': 'ganju',
  'Yushiro Sakimune Shihoin': 'yushiro',
  'Shigekuni Genryusai Yamamoto': 'yamamoto',
  'Chojiro Tadaoki Sasakibe': 'sasakibe',
  'Retsu Unohana': 'unohana',
  'Ichibe Hyosube': 'ichibei',
  'Oh-Etsu Nimaiya': 'nimaiya',
  'Tenjiro Kirinji': 'kirinji',
  'Senjumaru Shutara': 'senjumaru',
  'Kirio Hikifune': 'hikifune',
  'Yhwach': 'yhwach',
  'Uryu Ishida': 'uryu',
  'Jugram Haschwalth': 'haschwalth',
  'Pernida Parnkgjas': 'pernida',
  'Askin Nakk Le Vaar': 'askin',
  'Bambietta Basterbine': 'bambietta',
  'Äs Nödt': 'asnodt',
  'Liltotto Lamperd': 'liltotto',
  'Bazz-B': 'bazzb',
  'Cang Du': 'cangdu',
  'Quilge Opie': 'quilge',
  'BG9': 'bg9',
  'PePe Waccabrada': 'pepe',
  'Gerard Valkyrie': 'gerard',
  'Robert Accutrone': 'robert',
  'Driscoll Berci': 'driscoll',
  'Meninas McAllon': 'meninas',
  'Berenice Gabrielli': 'berenice',
  'Jerome Guizbatt': 'jerome',
  'Mask De Masculine': 'mask',
  'James': 'james',
  'Candice Catnipp': 'candice',
  'NaNaNa Najahkoop': 'nanana',
  'Gremmy Thoumeaux': 'gremmy',
  'Gwenael Lee': 'gwenael',
  'Nianzol Weizol': 'nianzol',
  'Lille Barro': 'lille',
  'Loyd Loyd/Royd Loyd': 'royd',
  'Giselle Gewelle': 'giselle',
  'Asguiaro Ebern': 'ebern',
  'Lüdaas Friegen': 'luders',
  'Nel Tu': 'nelliel',
  'Dordoni Alessandro Del Socaccio': 'dordoni',
  'Cirucci Sanderwicci': 'cirucci',
  'Charlotte Chuhlhourne': 'charlotte',
  'Luppi Antenor': 'luppi'
};

async function main() {
  console.log('=== IMPORTING & RENAMING OFFICIAL BLEACH TYBW ASSETS ===');

  // 1. Backup existing characters directory
  const existingChars = fs.readdirSync(destCharsDir);
  existingChars.forEach(f => {
    fs.copyFileSync(path.join(destCharsDir, f), path.join(destBackupDir, f));
  });
  console.log(`Backed up ${existingChars.length} existing character images to ${destBackupDir}`);

  // 2. Parse official HTML file
  const html = fs.readFileSync(officialHtmlPath, 'utf-8');
  const chunks = html.split('p-chara_data__container');

  const manifest = [];
  const officialDataMap = {};

  for (let i = 1; i < chunks.length; i++) {
    const block = chunks[i];
    const charaMatch = block.match(/chara_(\d+)\.png/);
    const faceMatch = block.match(/face_(\d+)\.png/);
    const nameMatch = block.match(/p-chara_data__name-text">([\s\S]*?)<\/div>/);
    const cvMatch = block.match(/p-chara_data__cv-text">([^<]+)<\/div>/);
    const txtMatch = block.match(/p-chara_data__txt">([\s\S]*?)<\/div>/);
    const bdayMatch = block.match(/Birthday<\/dt><dd[^>]*>([^<]+)<\/dd>/);
    const heightMatch = block.match(/Height<\/dt><dd[^>]*>([^<]+)<\/dd>/);
    const zanMatch = block.match(/Zanpakuto<\/dt><dd[^>]*>([^<]+)<\/dd>/);
    const affMatch = block.match(/Affiliation<\/dt><dd[^>]*>([^<]+)<\/dd>/);

    const rawName = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'UNKNOWN';
    const id = MANUAL_MAP[rawName];

    if (!id) {
      console.warn(`Warning: Unmapped character name: "${rawName}"`);
      continue;
    }

    const charaSrc = charaMatch ? `chara_${charaMatch[1]}.png` : null;
    const faceSrc = faceMatch ? `face_${faceMatch[1]}.png` : null;
    const cv = cvMatch ? cvMatch[1].trim() : null;
    const blurb = txtMatch ? txtMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : null;
    const birthday = bdayMatch ? bdayMatch[1].trim() : null;
    const height = heightMatch ? heightMatch[1].trim() : null;
    const zanpakuto = zanMatch ? zanMatch[1].trim() : null;
    const affiliation = affMatch ? affMatch[1].trim() : null;

    // Copy character full image (renamed to <id>.png)
    if (charaSrc) {
      const srcFile = path.join(officialDir, charaSrc);
      if (fs.existsSync(srcFile)) {
        // Copy to public/assets/characters/<id>.png
        fs.copyFileSync(srcFile, path.join(destCharsDir, `${id}.png`));
        // Also copy to human-readable official archive
        fs.copyFileSync(srcFile, path.join(destOfficialDir, `${id}_fullbody.png`));
      }
    }

    // Copy headshot image (renamed to <id>.png)
    if (faceSrc) {
      const srcFile = path.join(officialDir, faceSrc);
      if (fs.existsSync(srcFile)) {
        // Copy to public/assets/headshots/<id>.png
        fs.copyFileSync(srcFile, path.join(destHeadshotsDir, `${id}.png`));
        // Also copy to human-readable official archive
        fs.copyFileSync(srcFile, path.join(destOfficialDir, `${id}_headshot.png`));
      }
    }

    const entry = {
      id,
      name: rawName,
      officialCharaSource: charaSrc,
      officialFaceSource: faceSrc,
      characterImage: `/assets/characters/${id}.png`,
      headshotImage: faceSrc ? `/assets/headshots/${id}.png` : null,
      voiceActor: cv,
      birthday,
      height,
      zanpakuto,
      affiliation,
      lore: blurb
    };

    manifest.push(entry);
    officialDataMap[id] = entry;
  }

  // Handle Uryu Ishida headshot if faceSrc is null
  if (!fs.existsSync(path.join(destHeadshotsDir, 'uryu.png'))) {
    // If backup has uryu or chara_02 exists, copy backup or use chara_02
    const backupUryu = path.join(destBackupDir, 'uryu.png');
    if (fs.existsSync(backupUryu)) {
      fs.copyFileSync(backupUryu, path.join(destHeadshotsDir, 'uryu.png'));
    }
    officialDataMap['uryu'].headshotImage = '/assets/headshots/uryu.png';
  }

  // Save manifest
  fs.writeFileSync(
    path.join(rootDir, 'public', 'assets', 'character-assets-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );
  console.log(`Saved official assets manifest with ${manifest.length} characters.`);

  console.log('Asset copying and renaming completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
