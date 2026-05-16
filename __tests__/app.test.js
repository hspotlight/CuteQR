'use strict';

const { validateUrl, escapeHtml, logEvent } = require('../public/app');

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

// ===== logEvent =====

describe('logEvent', () => {
  test('does not throw when firebase is not loaded (Jest environment)', () => {
    expect(() => logEvent('test_event', { foo: 'bar' })).not.toThrow();
  });
});
