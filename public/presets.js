'use strict';

// ===== Preset Configurations =====
// Pure data — QR style options and CSS frame class per theme.
// Canvas drawing logic lives in frame-drawers.js.

const PRESETS = {
  bubbly: {
    name: 'Bubbly',
    emoji: '🫧',
    swatchBg: 'linear-gradient(135deg, #ffd6e7, #ffecd2)',
    swatchColor: '#ff8fab',
    frameClass: 'frame-bubbly',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#c77dff' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#ff8fab' },
      cornersDotOptions:    { type: 'dot',           color: '#ff8fab' },
      backgroundOptions:    { color: '#ffffff' },
    },
  },
  retro: {
    name: 'Retro',
    emoji: '📷',
    swatchBg: '#fffef9',
    swatchColor: '#8B5E3C',
    frameClass: 'frame-retro',
    qr: {
      dotsOptions:          { type: 'square', color: '#5C3D2E' },
      cornersSquareOptions: { type: 'square', color: '#8B5E3C' },
      cornersDotOptions:    { type: 'square', color: '#8B5E3C' },
      backgroundOptions:    { color: '#FFF8F0' },
    },
  },
  kawaii: {
    name: 'Kawaii',
    emoji: '🌸',
    swatchBg: 'linear-gradient(135deg, #f5f0ff, #fce4ff)',
    swatchColor: '#7c3aed',
    frameClass: 'frame-kawaii',
    qr: {
      dotsOptions:          { type: 'dots', color: '#7c3aed' },
      cornersSquareOptions: { type: 'dot',  color: '#a855f7' },
      cornersDotOptions:    { type: 'dot',  color: '#ec4899' },
      backgroundOptions:    { color: '#fdf4ff' },
    },
  },
  minimal: {
    name: 'Minimal Cute',
    emoji: '🤍',
    swatchBg: '#fff',
    swatchColor: '#f43f5e',
    frameClass: 'frame-minimal',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#f43f5e' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#f43f5e' },
      cornersDotOptions:    { type: 'dot',           color: '#f43f5e' },
      backgroundOptions:    { color: '#ffffff' },
    },
  },
  stamp: {
    name: 'Stamp',
    emoji: '📮',
    swatchBg: '#f0fdf4',
    swatchColor: '#059669',
    frameClass: 'frame-stamp',
    qr: {
      dotsOptions:          { type: 'classy', color: '#059669' },
      cornersSquareOptions: { type: 'square', color: '#065f46' },
      cornersDotOptions:    { type: 'square', color: '#065f46' },
      backgroundOptions:    { color: '#f0fdf4' },
    },
  },
  neon: {
    name: 'Neon Pop',
    emoji: '✨',
    swatchBg: '#1e1b4b',
    swatchColor: '#818cf8',
    frameClass: 'frame-neon',
    qr: {
      dotsOptions:          { type: 'classy-rounded', color: '#818cf8' },
      cornersSquareOptions: { type: 'extra-rounded',  color: '#6366f1' },
      cornersDotOptions:    { type: 'dot',            color: '#a78bfa' },
      backgroundOptions:    { color: '#1e1b4b' },
    },
  },
  cotton: {
    name: 'Cotton Candy',
    emoji: '🍭',
    swatchBg: 'linear-gradient(135deg, #ffc8e8, #c8e8ff)',
    swatchColor: '#ff6ec7',
    frameClass: 'frame-cotton',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#ff6ec7' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#60b4ff' },
      cornersDotOptions:    { type: 'dot',           color: '#ff6ec7' },
      backgroundOptions:    { color: '#ffffff' },
    },
  },
  matcha: {
    name: 'Matcha',
    emoji: '🍵',
    swatchBg: 'linear-gradient(135deg, #d4edda, #f5f0e8)',
    swatchColor: '#3a7d44',
    frameClass: 'frame-matcha',
    qr: {
      dotsOptions:          { type: 'classy',  color: '#3a7d44' },
      cornersSquareOptions: { type: 'square',  color: '#2d5a27' },
      cornersDotOptions:    { type: 'square',  color: '#2d5a27' },
      backgroundOptions:    { color: '#f5f0e8' },
    },
  },
  galaxy: {
    name: 'Galaxy',
    emoji: '🌌',
    swatchBg: 'linear-gradient(135deg, #0d0d2b, #1a1a4e)',
    swatchColor: '#f0c040',
    frameClass: 'frame-galaxy',
    qr: {
      dotsOptions:          { type: 'classy-rounded', color: '#f0c040' },
      cornersSquareOptions: { type: 'extra-rounded',  color: '#e8a020' },
      cornersDotOptions:    { type: 'dot',            color: '#f0c040' },
      backgroundOptions:    { color: '#0d0d2b' },
    },
  },
  sunrise: {
    name: 'Sunrise',
    emoji: '🌅',
    swatchBg: 'linear-gradient(135deg, #fff9c4, #ffccbc)',
    swatchColor: '#e65100',
    frameClass: 'frame-sunrise',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#e65100' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#bf360c' },
      cornersDotOptions:    { type: 'dot',           color: '#e65100' },
      backgroundOptions:    { color: '#fff9c4' },
    },
  },
  ocean: {
    name: 'Ocean',
    emoji: '🌊',
    swatchBg: 'linear-gradient(135deg, #b2ebf2, #80deea)',
    swatchColor: '#006064',
    frameClass: 'frame-ocean',
    qr: {
      dotsOptions:          { type: 'dots',   color: '#00838f' },
      cornersSquareOptions: { type: 'dot',    color: '#006064' },
      cornersDotOptions:    { type: 'dot',    color: '#006064' },
      backgroundOptions:    { color: '#e0f7fa' },
    },
  },
  sakura: {
    name: 'Sakura',
    emoji: '🌸',
    swatchBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    swatchColor: '#c2185b',
    frameClass: 'frame-sakura',
    qr: {
      dotsOptions:          { type: 'extra-rounded', color: '#e91e63' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#c2185b' },
      cornersDotOptions:    { type: 'dot',           color: '#c2185b' },
      backgroundOptions:    { color: '#fce4ec' },
    },
  },
  forest: {
    name: 'Forest Moss',
    emoji: '🌿',
    swatchBg: 'linear-gradient(135deg, #1b4332, #40916c)',
    swatchColor: '#95d5b2',
    frameClass: 'frame-forest',
    qr: {
      dotsOptions:          { type: 'classy',        color: '#1b4332' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#2d6a4f' },
      cornersDotOptions:    { type: 'dot',           color: '#1b4332' },
      backgroundOptions:    { color: '#d8f3dc' },
    },
  },
  candy: {
    name: 'Rainbow Candy',
    emoji: '🌈',
    swatchBg: 'linear-gradient(135deg, #ff595e, #ffca3a, #6a4c93)',
    swatchColor: '#ff595e',
    frameClass: 'frame-candy',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#d62828' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#9b2226' },
      cornersDotOptions:    { type: 'dot',           color: '#d62828' },
      backgroundOptions:    { color: '#ffffff' },
    },
  },
  parchment: {
    name: 'Old Parchment',
    emoji: '📜',
    swatchBg: 'linear-gradient(135deg, #c9a96e, #e8d5a3)',
    swatchColor: '#6b4226',
    frameClass: 'frame-parchment',
    qr: {
      dotsOptions:          { type: 'classy',  color: '#3d1f00' },
      cornersSquareOptions: { type: 'square',  color: '#5c2e00' },
      cornersDotOptions:    { type: 'square',  color: '#3d1f00' },
      backgroundOptions:    { color: '#f5e6c8' },
    },
  },
  arctic: {
    name: 'Arctic Frost',
    emoji: '❄️',
    swatchBg: 'linear-gradient(135deg, #e8f4f8, #b8dce8)',
    swatchColor: '#0077a8',
    frameClass: 'frame-arctic',
    qr: {
      dotsOptions:          { type: 'square', color: '#005f86' },
      cornersSquareOptions: { type: 'square', color: '#003d57' },
      cornersDotOptions:    { type: 'square', color: '#005f86' },
      backgroundOptions:    { color: '#f0f9fc' },
    },
  },
};

// ===== Dual export (browser global + CommonJS for Jest) =====
if (typeof module !== 'undefined') {
  module.exports = { PRESETS };
}
