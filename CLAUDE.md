# CuteQR

A static single-page QR code generator with cute themed frames and styles. No backend, no auth, no database — pure HTML/CSS/JS deployed to GitHub Pages.

## Commands

```bash
npm install        # Install dev dependencies (Jest only)
npm run serve      # Serve locally at http://localhost:3000
npm test           # Run test suite
npm run test:watch # Watch mode
npm run test:coverage # With coverage report
```

## Architecture

```
public/
  index.html   — Single page app
  style.css    — All styles (cute pastel theme, frame styles, responsive)
  app.js       — All app logic (presets, QR generation, export, clipboard)

__tests__/
  setup.js     — Jest mocks (canvas, clipboard, QRCodeStyling)
  app.test.js  — Tests for validateUrl, escapeHtml, PRESETS, canvas helpers

.github/workflows/
  deploy.yml   — Test → deploy to GitHub Pages on push to main
```

## Key Concepts

### QR Library
Uses `qr-code-styling@1.5.0` from unpkg CDN. No npm install — loaded via `<script>` tag.

### Presets
Six preset objects in `PRESETS` (app.js). Each preset defines:
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
- **CSS** (`.frame-*` classes in style.css) — for the live preview
- **Canvas** (`FRAME_DRAWERS` object in app.js) — for the 1024px PNG export

When adding a new preset, update both.

## Adding a New Preset

1. Add entry to `PRESETS` in `app.js` with `name`, `emoji`, `swatchBg`, `swatchColor`, `qr`, `frameClass`
2. Add `.frame-{name}` CSS class in `style.css`
3. Add `FRAME_DRAWERS[key]` function in `app.js`
4. Add test coverage in `__tests__/app.test.js`

## Deployment

Push to `main` → GitHub Actions runs tests → deploys `./public` to GitHub Pages.

**One-time setup required:**
1. Create a GitHub repo and push this code
2. Go to repo Settings → Pages → Source: GitHub Actions
3. Push to `main` — the workflow handles the rest

The live URL will be: `https://{username}.github.io/{repo-name}/`
