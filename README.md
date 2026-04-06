# CuteQR

A static single-page QR code generator with cute themed frames and styles. No backend, no auth, no database — pure HTML/CSS/JS deployed to GitHub Pages.

## Features

- 12 preset styles (Bubbly, Retro, Kawaii, Minimal, Stamp, Neon, Cotton, Matcha, Galaxy, Sunrise, Ocean, Sakura)
- Live preview with themed frames
- Export as 1024×1024 PNG (Save or Copy to clipboard)
- Firebase Analytics event tracking
- Zero backend — fully static, works offline after load

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io) (or npm/yarn)
- Node.js 18+

### Install & Run

```bash
pnpm install       # Install dev dependencies (Jest only)
pnpm run serve     # Serve locally at http://localhost:3000
```

### Run Tests

```bash
pnpm test                  # Run test suite
pnpm run test:watch        # Watch mode
pnpm run test:coverage     # With coverage report
```

## Firebase Analytics Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable Google Analytics when prompted
3. Copy your web app config and replace the placeholder values in `public/app.js`:

```js
const FIREBASE_CONFIG = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_PROJECT_ID.firebaseapp.com',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId:             'YOUR_APP_ID',
  measurementId:     'YOUR_MEASUREMENT_ID',
};
```

### Tracked Events

| Event | Fired when |
|---|---|
| `preset_selected` | User picks a style |
| `qr_generated` | QR code renders successfully |
| `qr_saved` | User downloads PNG |
| `qr_copied` | User copies to clipboard |

## Deployment

Push to `main` → GitHub Actions runs tests → deploys `./public` to GitHub Pages.

**One-time setup:**
1. Create a GitHub repo and push this code
2. Go to repo Settings → Pages → Source: GitHub Actions
3. Push to `main` — the workflow handles the rest

Live URL: `https://{username}.github.io/{repo-name}/`

## Architecture

```
public/
  index.html   — Single page app
  style.css    — All styles (pastel theme, frame styles, responsive)
  app.js       — All logic (presets, QR generation, Firebase analytics, export)

__tests__/
  setup.js     — Jest mocks (canvas, clipboard, QRCodeStyling)
  app.test.js  — Tests for validateUrl, escapeHtml, PRESETS, canvas helpers, logEvent

.github/workflows/
  deploy.yml   — Test → deploy to GitHub Pages on push to main
```
