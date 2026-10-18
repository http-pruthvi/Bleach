# Bleach Tribute Character Data & Video Configuration

This directory contains the canonical data for the Bleach tribute website, divided by faction across seven JSON files:

- `karakura.json`: Karakura Town residents, Ichigo's circle, and Xcution (Fullbringers)
- `gotei13.json`: Soul Society Gotei 13 divisions (captains, lieutenants, and seated officers past and present)
- `urahara.json`: Urahara Shop and Shihoin clan
- `visored.json`: The Visored group
- `espada.json`: Arrancar, Espada 1–10, and key Fracciones
- `wandenreich.json`: Wandenreich Emperor, Grandmaster, and the Sternritter
- `royalGuard.json`: Zero Division / Royal Guard

---

## Video Configuration

Each character record contains a `video` field formatted as:

```json
"video": {
  "type": "youtube" | "file" | null,
  "src": "string",
  "title": "string"
}
```

### Options:

1. **`null` (Default)**:
   - When `type` is `null` (or empty), the website automatically renders an original procedural canvas "Power Reel" cinematic animation tailored to that character's element (Getsuga arcs, ice growth, petals vortex, lightning, etc.) with a subtle caption indicating an official clip slot is available.
   - Example:
     ```json
     "video": {
       "type": null,
       "src": "",
       "title": "Procedural Power Reel"
     }
     ```

2. **`youtube` (Official or Licensed Uploads)**:
   - Sets a privacy-enhanced embed via `youtube-nocookie.com`.
   - The embed is lazy-loaded behind a poster image and play button, and the iframe is only loaded upon user interaction.
   - Supply the 11-character YouTube video ID in `src`:
     ```json
     "video": {
       "type": "youtube",
       "src": "dQw4w9WgXcQ",
       "title": "Official Bleach Anime PV - VIz Media"
     }
     ```

3. **`file` (Local Offline MP4 Video)**:
   - Renders a native `<video controls playsInline preload="none">` element.
   - Store the `.mp4` file in `public/videos/<id>.mp4` and pass `/videos/<id>.mp4` in `src`:
     ```json
     "video": {
       "type": "file",
       "src": "/videos/ichigo.mp4",
       "title": "Ichigo Kurosaki Combat Highlights"
     }
     ```

---

## Validation & Testing

Run data validation before building:
```bash
npm run validate
```
This script ensures:
- All required fields (`id`, `name`, `kanji`, `tier`, `power`, `colors`, etc.) are present and valid.
- IDs are unique across all factions.
- Color combinations satisfy WCAG AA contrast (minimum 4.5:1 ratio between `bg` and `ink`).
- `video` follows the required shape.
