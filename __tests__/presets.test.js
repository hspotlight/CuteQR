'use strict';

const { PRESETS } = require('../public/presets');

// ===== PRESETS =====

describe('PRESETS configuration', () => {
  const REQUIRED_QR_KEYS = ['dotsOptions', 'cornersSquareOptions', 'cornersDotOptions', 'backgroundOptions'];

  test('has all sixteen presets', () => {
    const keys = Object.keys(PRESETS);
    expect(keys).toHaveLength(16);
    expect(keys).toEqual([
      'bubbly', 'retro', 'kawaii', 'minimal', 'stamp', 'neon',
      'cotton', 'matcha', 'galaxy', 'sunrise', 'ocean', 'sakura',
      'forest', 'candy', 'parchment', 'arctic',
    ]);
  });

  Object.entries(PRESETS).forEach(([key, preset]) => {
    describe(`preset: ${key}`, () => {
      test('has a name string', () => {
        expect(typeof preset.name).toBe('string');
        expect(preset.name.length).toBeGreaterThan(0);
      });

      test('has an emoji', () => {
        expect(typeof preset.emoji).toBe('string');
        expect(preset.emoji.length).toBeGreaterThan(0);
      });

      test('has a frameClass', () => {
        expect(typeof preset.frameClass).toBe('string');
        expect(preset.frameClass).toMatch(/^frame-/);
      });

      test('has swatchBg and swatchColor', () => {
        expect(typeof preset.swatchBg).toBe('string');
        expect(typeof preset.swatchColor).toBe('string');
      });

      test('has qr config with all required keys', () => {
        REQUIRED_QR_KEYS.forEach(k => {
          expect(preset.qr).toHaveProperty(k);
        });
      });

      test('dotsOptions has type and color', () => {
        expect(preset.qr.dotsOptions).toHaveProperty('type');
        expect(preset.qr.dotsOptions).toHaveProperty('color');
        expect(preset.qr.dotsOptions.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });

      test('backgroundOptions has a valid color', () => {
        expect(preset.qr.backgroundOptions.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  test('all frameClass values are unique', () => {
    const classes = Object.values(PRESETS).map(p => p.frameClass);
    expect(new Set(classes).size).toBe(classes.length);
  });

  test('all preset names are unique', () => {
    const names = Object.values(PRESETS).map(p => p.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
