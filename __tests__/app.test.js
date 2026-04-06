'use strict';

const { validateUrl, escapeHtml, PRESETS, roundedRect, drawHeart, logEvent } = require('../public/app');

// ===== validateUrl =====

describe('validateUrl', () => {
  test('returns error for empty string', () => {
    expect(validateUrl('')).toBe('Please enter a URL.');
  });

  test('returns error for whitespace only', () => {
    expect(validateUrl('   ')).toBe('Please enter a URL.');
  });

  test('returns error for null/undefined', () => {
    expect(validateUrl(null)).toBe('Please enter a URL.');
    expect(validateUrl(undefined)).toBe('Please enter a URL.');
  });

  test('returns error for non-URL text', () => {
    expect(validateUrl('not a url')).toBeTruthy();
  });

  test('returns error for ftp:// protocol', () => {
    expect(validateUrl('ftp://example.com')).toBe('URL must start with http:// or https://');
  });

  test('returns null for valid http URL', () => {
    expect(validateUrl('http://example.com')).toBeNull();
  });

  test('returns null for valid https URL', () => {
    expect(validateUrl('https://example.com')).toBeNull();
  });

  test('returns null for URL with path and query', () => {
    expect(validateUrl('https://example.com/path?foo=bar&baz=1')).toBeNull();
  });

  test('returns null for URL with trailing whitespace (trimmed)', () => {
    expect(validateUrl('  https://example.com  ')).toBeNull();
  });

  test('returns error for URL without TLD-like structure', () => {
    expect(validateUrl('notaurl')).not.toBeNull();
  });
});

// ===== escapeHtml =====

describe('escapeHtml', () => {
  test('escapes & character', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  test('escapes < and > characters', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  test('escapes double quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });

  test('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#039;s');
  });

  test('handles XSS attempt', () => {
    const xss = '<img src=x onerror="alert(1)">';
    expect(escapeHtml(xss)).not.toContain('<img');
    expect(escapeHtml(xss)).toContain('&lt;img');
  });

  test('returns empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });

  test('converts non-string to string', () => {
    expect(escapeHtml(123)).toBe('123');
  });

  test('leaves safe text unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });
});

// ===== PRESETS =====

describe('PRESETS configuration', () => {
  const REQUIRED_QR_KEYS = ['dotsOptions', 'cornersSquareOptions', 'cornersDotOptions', 'backgroundOptions'];

  test('has all twelve presets', () => {
    const keys = Object.keys(PRESETS);
    expect(keys).toHaveLength(12);
    expect(keys).toEqual(['bubbly', 'retro', 'kawaii', 'minimal', 'stamp', 'neon', 'cotton', 'matcha', 'galaxy', 'sunrise', 'ocean', 'sakura']);
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
        expect(typeof preset.qr.dotsOptions.color).toBe('string');
        expect(preset.qr.dotsOptions.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });

      test('backgroundOptions has a valid color', () => {
        expect(preset.qr.backgroundOptions).toHaveProperty('color');
        expect(preset.qr.backgroundOptions.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  test('all frameClass values are unique', () => {
    const classes = Object.values(PRESETS).map(p => p.frameClass);
    const unique  = new Set(classes);
    expect(unique.size).toBe(classes.length);
  });

  test('all preset names are unique', () => {
    const names  = Object.values(PRESETS).map(p => p.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});

// ===== roundedRect =====

describe('roundedRect', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      beginPath:        jest.fn(),
      moveTo:           jest.fn(),
      lineTo:           jest.fn(),
      quadraticCurveTo: jest.fn(),
      closePath:        jest.fn(),
    };
  });

  test('calls beginPath', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.beginPath).toHaveBeenCalledTimes(1);
  });

  test('calls closePath', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.closePath).toHaveBeenCalledTimes(1);
  });

  test('calls moveTo once for the start point', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.moveTo).toHaveBeenCalledTimes(1);
  });

  test('calls quadraticCurveTo four times (one per corner)', () => {
    roundedRect(ctx, 0, 0, 100, 100, 10);
    expect(ctx.quadraticCurveTo).toHaveBeenCalledTimes(4);
  });
});

// ===== drawHeart =====

describe('drawHeart', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      beginPath:      jest.fn(),
      moveTo:         jest.fn(),
      bezierCurveTo:  jest.fn(),
      closePath:      jest.fn(),
    };
  });

  test('calls beginPath', () => {
    drawHeart(ctx, 50, 50, 20);
    expect(ctx.beginPath).toHaveBeenCalled();
  });

  test('calls bezierCurveTo four times', () => {
    drawHeart(ctx, 50, 50, 20);
    expect(ctx.bezierCurveTo).toHaveBeenCalledTimes(4);
  });

  test('calls closePath', () => {
    drawHeart(ctx, 50, 50, 20);
    expect(ctx.closePath).toHaveBeenCalled();
  });
});

// ===== logEvent =====

describe('logEvent', () => {
  test('does not throw when firebase is not loaded (Jest environment)', () => {
    expect(() => logEvent('test_event', { foo: 'bar' })).not.toThrow();
  });
});
