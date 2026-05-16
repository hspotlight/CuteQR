# Skill: Add or Modify a Preset Config Entry

Use this skill to add a new theme or edit an existing theme's colors, dot style, or frameClass.

## Files to touch

| File | What to change |
|---|---|
| `public/presets.js` | Add/edit PRESETS entry |
| `__tests__/presets.test.js` | Update count + key list |

Canvas drawing logic lives in `frame-drawers.js` — do not touch it here.

---

## PRESETS entry schema

```js
key: {
  name: 'Display Name',    // string, unique
  emoji: '🎯',             // single emoji
  swatchBg: 'linear-gradient(135deg, #hex1, #hex2)',
  swatchColor: '#hex',
  frameClass: 'frame-key', // must match CSS class, unique
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

## Test update (`__tests__/presets.test.js`)

```js
// Change toHaveLength(N) → toHaveLength(N + added)
// Append new keys to the end of the toEqual([...]) array
```

---

## Checklist

- [ ] Entry added to `public/presets.js` (after the last existing entry)
- [ ] Count + key list updated in `__tests__/presets.test.js`
- [ ] `pnpm test` passes
