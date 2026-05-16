# Skill: Add or Modify QR Preset

Use this skill whenever the user wants to add a new QR theme or modify an existing one.

## Files to touch (and ONLY these)

| File | What to change |
|---|---|
| `public/presets.js` | Add/edit the PRESETS config entry (colors, dot type, frameClass) |
| `public/frame-drawers.js` | Add/edit the FRAME_DRAWERS canvas drawing function |
| `public/style.css` | Add/edit the `.frame-{key}` CSS class |
| `__tests__/presets.test.js` | Update the preset count + key list |

**Never touch `public/app.js`** for preset changes.

---

## PRESETS entry schema (`public/presets.js`)

```js
key: {
  name: 'Display Name',          // string, unique
  emoji: '🎯',                   // single emoji
  swatchBg: 'linear-gradient(135deg, #hex1, #hex2)',
  swatchColor: '#hex',
  frameClass: 'frame-key',       // must match CSS class, unique
  qr: {
    dotsOptions:          { type: '<dot-type>',    color: '#rrggbb' },
    cornersSquareOptions: { type: '<corner-type>', color: '#rrggbb' },
    cornersDotOptions:    { type: '<dot-type>',    color: '#rrggbb' },
    backgroundOptions:    { color: '#rrggbb' },
  },
},
```

Valid dot types: `rounded`, `dots`, `classy`, `classy-rounded`, `extra-rounded`, `square`
Valid corner types: `dot`, `extra-rounded`, `square`

---

## FRAME_DRAWERS function (`public/frame-drawers.js`)

```js
key: (ctx, size, qrImg) => {
  // size is always 1024 (export canvas)
  const pad  = Math.round(size * 0.13);
  const qrSz = size - pad * 2;

  // 1. Draw background
  // 2. Draw decorations (gradients, shapes, emoji)
  // 3. Draw inner card (with shadow — always reset ctx.shadowBlur = 0 after)
  // 4. ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);  ← QR always last before overlays
  // 5. Draw emoji overlays on top (optional)
},
```

Helpers available in the same file: `roundedRect(ctx, x, y, w, h, r)`, `drawHeart(ctx, cx, cy, size)`

---

## CSS frame class (`public/style.css`)

```css
.frame-key {
  background: ...;
  padding: 22px–24px;
  border-radius: Npx;
  box-shadow: ...;
  position: relative;  /* required for ::before/::after */
}
.frame-key::before { content: '🎯'; position: absolute; top: 6px; left: 8px; font-size: 1.2rem; opacity: .85; }
.frame-key::after  { content: '🎯'; position: absolute; bottom: 6px; right: 8px; font-size: 1.2rem; opacity: .85; }
```

---

## Test update (`__tests__/presets.test.js`)

```js
// Change toHaveLength(N) → toHaveLength(N + added)
// Append new keys to the end of the toEqual([...]) array
```

---

## Checklist

- [ ] PRESETS entry added to `public/presets.js`
- [ ] FRAME_DRAWERS function added to `public/frame-drawers.js` (same key, same order as PRESETS)
- [ ] CSS `.frame-{key}` added to `public/style.css`
- [ ] Count + key list updated in `__tests__/presets.test.js`
- [ ] `pnpm test` passes
