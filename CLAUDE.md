# CuteQR

A static single-page QR code generator with cute themed frames and styles. No backend, no auth, no database — pure HTML/CSS/JS deployed to GitHub Pages.

## Commands

```bash
pnpm install          # Install dev dependencies (Jest only)
pnpm run serve        # Serve locally at http://localhost:3000
pnpm test             # Run test suite
pnpm run test:watch   # Watch mode
pnpm run test:coverage # With coverage report
```

## Architecture

```
public/
  index.html        — Single page app
  style.css         — All styles (cute pastel theme, frame styles, responsive)
  presets.js        — PRESETS config only (colors, dot types, frameClass) — pure data
  frame-drawers.js  — FRAME_DRAWERS canvas functions + roundedRect/drawHeart helpers
  app.js            — App logic: QR generation, export, clipboard, event handlers

__tests__/
  setup.js              — Jest mocks (canvas, clipboard, QRCodeStyling)
  presets.test.js       — Tests for PRESETS config
  frame-drawers.test.js — Tests for FRAME_DRAWERS, roundedRect, drawHeart
  app.test.js           — Tests for validateUrl, escapeHtml, logEvent

.github/workflows/
  deploy.yml   — Test → deploy to GitHub Pages on push to main

.claude/skills/
  add-preset.md — Skill: how to add or modify a QR preset (read this first)
```

## Key Concepts

### QR Library
Uses `qr-code-styling@1.5.0` from unpkg CDN. No npm install — loaded via `<script>` tag.

### Firebase Analytics
Loaded via CDN compat builds (`firebase-app-compat.js` + `firebase-analytics-compat.js`). Config is in `FIREBASE_CONFIG` at the top of `app.js` — replace the `YOUR_*` placeholder values with real credentials before deploying.

The `logEvent()` wrapper is a no-op when `firebase` is not defined (e.g. in Jest), so tests are unaffected. Tracked events: `preset_selected`, `qr_generated`, `qr_saved`, `qr_copied`.

### Presets
Sixteen preset objects in `PRESETS` (`public/presets.js`). Each preset defines:
- `qr` — options passed directly to `QRCodeStyling` (dot type, colors, corner styles)
- `frameClass` — CSS class applied to the wrapper div for the preview
- `swatchBg/swatchColor` — used to render the preset selector thumbnail

### Export Flow
1. User clicks Save/Copy
2. `buildExportCanvas()` creates a fresh 1024×1024 canvas
3. Renders a new `QRCodeStyling` at 665×665 into a hidden div
4. The matching `FRAME_DRAWERS[preset]` function draws the frame + QR onto the export canvas
5. `canvas.toDataURL()` → download, or `canvas.toBlob()` → `ClipboardItem`

### Frame Styles (CSS preview vs canvas export)
Each preset has two implementations:
- **CSS** (`.frame-*` classes in `style.css`) — for the live preview
- **Canvas** (`FRAME_DRAWERS` object in `frame-drawers.js`) — for the 1024px PNG export

When adding a new preset, update both.

## Adding a New Preset

> Use the `.claude/skills/add-preset.md` skill — it has the full schema, checklist, and helper function docs.

Short version:
1. Add entry to `PRESETS` in **`public/presets.js`** (config only — colors, dot type, frameClass)
2. Add `FRAME_DRAWERS[key]` function in **`public/frame-drawers.js`**
3. Add `.frame-{name}` CSS class in `style.css`
4. Update the preset count and key list in `__tests__/presets.test.js`

## Deployment

Push to `main` → GitHub Actions runs tests → deploys `./public` to GitHub Pages.

**One-time setup required:**
1. Create a GitHub repo and push this code
2. Go to repo Settings → Pages → Source: GitHub Actions
3. Push to `main` — the workflow handles the rest

The live URL will be: `https://{username}.github.io/{repo-name}/`
