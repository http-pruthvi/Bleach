# BLEACH // Thousand Blades Fan Tribute (Full Cast Edition)

A cinematic, scroll-driven fan tribute web application celebrating the full cast of over 100 characters from the manga and anime series **BLEACH** by Tite Kubo.

Built with **React 18**, **React Router v7**, **Vite**, **GSAP + ScrollTrigger**, **Lenis**, and procedural **Canvas 2D / Web Audio API** synthesis.

---

## 🎨 Theme DNA System

Every character in the 122-warrior roster owns a distinct **Theme DNA** object controlling their visual and motion identity:
- **Palette**: Signature background, ink, accent, alt accent, and reishi glow (`bg`, `ink`, `accent`, `alt`, `glow`) with strict WCAG AA contrast enforcement (`>= 4.5:1`).
- **Typography**: Display & body font pairings with custom tracking, weight, and Japanese kanji rendering (`'outline' | 'solid' | 'brush' | 'thin'`).
- **Texture**: Procedural background textures:
  `'halftone'` (manga screentone dots) | `'ink-wash'` (soft sumi-e clouds) | `'paper-grain'` (manga paper grain) | `'scanlines'` (lab grid lines) | `'frost-noise'` (sub-zero crystalline grain) | `'cracked-stone'` (ground fractures) | `'starfield'` (reishi particles) | `'sakura-silk'` (silk weave) | `'mirror-shards'` (geometric glass tessellation).
- **Transitions**: 12 bespoke signature GSAP timelines for Tier A, plus parameterized archetype transitions for Tier B & C.
- **Dividers**: Custom SVG section dividers (`slash`, `ice-edge`, `petal-curve`, `crack-line`, `chain-link`, `lightning`, `hexagon`, `torn-paper`).
- **Cursors**: Responsive custom manga cursors (`crescent`, `snowflake`, `petal`, `fist`, `reticle`, `chain-link`, `blade`, `ripple`, `lightning`, `shadow`).
- **Rhythm & Easing**: Custom motion curves (`power4.inOut`, `expo.out`, `steps(6)`, `back.out(1.4)`, `elastic.out`).

### Curated Google Fonts List (Lazy Loaded per Route)
Fonts are requested dynamically on demand via `src/utils/fontLoader.js` and cached to ensure zero render-blocking requests:
1. `Dela Gothic One`: Heavy manga impact display (*Ichigo, Kenpachi, Grimmjow*).
2. `Cinzel`: Regal classical serif (*Byakuya, Toshiro, Haschwalth, Yhwach*).
3. `Cormorant Garamond`: Delicate aristocratic serif (*Rukia, Unohana, Gin*).
4. `Syne`: Avant-garde modern display (*Aizen, Ulquiorra*).
5. `Bebas Neue`: High-impact condensed sans (*Chad, Renji, Yamamoto, Bazz-B*).
6. `Playfair Display`: Luminous warm serif (*Orihime*).
7. `Rajdhani`: Tactical angular Quincy display (*Uryu*).
8. `Montserrat`: High-speed agile sans (*Yoruichi, Soi Fon*).
9. `Shippori Mincho`: Classical Japanese brush serif (*Urahara, Shunsui, Ichibei*).
10. `Space Grotesk`: Technological / bio-adaptive sans (*Mayuri, BG9*).
11. `Orbitron`: Digital spirit-wave display (*Yukio*).
12. `Marcellus`: Divine ceremonial serif (*Royal Guard*).
13. `Inter` & `Plus Jakarta Sans`: Standard responsive body typography.

---

## ⚡ Highlights & Architecture

- **Full Cast Database (Data-Driven)**: 122 canonical characters modeled across 7 factions in `src/data/` (`karakura.json`, `gotei13.json`, `urahara.json`, `visored.json`, `espada.json`, `wandenreich.json`, `royalGuard.json`).
- **Three Tiers of Treatment**:
  - **Tier A (12 Characters)**: Ichigo, Rukia, Orihime, Chad, Uryu, Renji, Byakuya, Toshiro, Kenpachi, Aizen, Yoruichi, and Urahara. Pinned scroll scenes on the Home page, custom signature Canvas FX, and comprehensive detail pages.
  - **Tier B (74 Notable Characters)**: Faction grid cards + full detail pages featuring combat profiles, 3-4 step power breakdowns, official video slots / procedural power reels, and shared generic FX presets.
  - **Tier C (36 Roster Combatants)**: Compact roster entries with faction, kanji, division/rank, and power summary.
- **Dev Gallery (`/themes`)**: Interactive gallery showing every warrior's theme DNA swatches, contrast scores, typography specimen, divider, texture, and a live transition preview button.
- **Gotei 13 Organization Chart (`/gotei13`)**: Squads 1 through 13 with Captains and Lieutenants in hierarchical alignment and direct click-through to combat dossiers.
- **Global Search (`/` Shortcut)**: Instant modal search in `GlobalSearch.jsx` searching name, kanji, aliases, and Zanpakuto.
- **Artwork & Licensing Notice**:
  > **IMPORTANT NOTICE REGARDING ARTWORK**:
  > Character images are optional per character. Local image files located in `/public/assets/characters/<id>.png` are intended for **local or private fan use only** unless replaced by licensed, original, or authorized artwork. If an image is missing, the site automatically generates an algorithmic vector emblem.
- **Procedural Web Audio Engine**: Zero external voice or copyrighted sound clips. Synthesizes blade clashes, kido hums, hollow cero blasts, ice crystals, and lightning bolts in real-time via the Web Audio API.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v22.20)
- npm 9+

### Commands
```bash
# Install dependencies
npm install

# Validate data schema, required fields, unique IDs, Theme DNA uniqueness, and WCAG AA contrast (>= 4.5:1)
npm run validate

# Run local development server
npm run dev

# Run full end-to-end Puppeteer test suite
npm run test:e2e

# Compile optimized production bundle
npm run build
```

---

## 📜 Legal & License Notice

This fan tribute project is non-commercial. **BLEACH** and all related characters, terminology, and trademarks belong to **Tite Kubo**, **Shueisha**, and **Studio Pierrot**.
