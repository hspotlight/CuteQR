# Skill: Add or Modify a Frame Drawer

Use this skill to add or edit the canvas drawing function for a preset theme.

## File to touch

| File | What to change |
|---|---|
| `public/frame-drawers.js` | Add/edit FRAME_DRAWERS function |

Preset config lives in `presets.js` — do not touch it here.

---

## Function signature

```js
key: (ctx, size, qrImg) => {
  // size is always 1024 (export canvas)
  const pad  = Math.round(size * 0.13);  // adjust per design
  const qrSz = size - pad * 2;

  // 1. Draw background
  // 2. Draw decorations (gradients, shapes, emoji)
  // 3. Draw inner card — always reset shadow after:
  //    ctx.shadowColor = '...'; ctx.shadowBlur = N;
  //    roundedRect(...); ctx.fill();
  //    ctx.shadowBlur = 0;
  // 4. ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);  ← QR always before overlays
  // 5. Emoji overlays on top (optional)
},
```

Helpers available in the same file:
- `roundedRect(ctx, x, y, w, h, r)` — draws a rounded rectangle path
- `drawHeart(ctx, cx, cy, size)` — draws a heart path

**The key must match the corresponding PRESETS key in `presets.js` and appear in the same order.**

---

## Checklist

- [ ] Function added to `FRAME_DRAWERS` in `public/frame-drawers.js`
- [ ] Key matches the PRESETS entry and is in the same order
- [ ] `ctx.shadowBlur` reset to 0 after any shadow usage
- [ ] `ctx.drawImage(qrImg, ...)` called before emoji overlays
- [ ] `pnpm test` passes (frame-drawers.test.js checks every key has a drawer)
