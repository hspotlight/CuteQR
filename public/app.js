'use strict';

// ===== Firebase Analytics (initialized in analytics.js → window.__cuteqrAnalytics) =====
function logEvent(eventName, params) {
  const a = typeof window !== 'undefined' && window.__cuteqrAnalytics;
  if (a) {
    a.logEvent(eventName, params);
  } else {
    console.warn('Firebase analytics not initialized');
    console.warn('Please check if firebase-config.js and firebase-init.js are loaded correctly');
    console.warn('If you are running this in a test environment, you can safely ignore this warning');
  }
}

// ===== Preset Configurations =====

const PRESETS = {
  bubbly: {
    name: 'Bubbly',
    emoji: '🫧',
    swatchBg: 'linear-gradient(135deg, #ffd6e7, #ffecd2)',
    swatchColor: '#ff8fab',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#c77dff' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#ff8fab' },
      cornersDotOptions:    { type: 'dot',           color: '#ff8fab' },
      backgroundOptions:    { color: '#ffffff' },
    },
    frameClass: 'frame-bubbly',
  },
  retro: {
    name: 'Retro',
    emoji: '📷',
    swatchBg: '#fffef9',
    swatchColor: '#8B5E3C',
    qr: {
      dotsOptions:          { type: 'square', color: '#5C3D2E' },
      cornersSquareOptions: { type: 'square', color: '#8B5E3C' },
      cornersDotOptions:    { type: 'square', color: '#8B5E3C' },
      backgroundOptions:    { color: '#FFF8F0' },
    },
    frameClass: 'frame-retro',
  },
  kawaii: {
    name: 'Kawaii',
    emoji: '🌸',
    swatchBg: 'linear-gradient(135deg, #f5f0ff, #fce4ff)',
    swatchColor: '#7c3aed',
    qr: {
      dotsOptions:          { type: 'dots', color: '#7c3aed' },
      cornersSquareOptions: { type: 'dot',  color: '#a855f7' },
      cornersDotOptions:    { type: 'dot',  color: '#ec4899' },
      backgroundOptions:    { color: '#fdf4ff' },
    },
    frameClass: 'frame-kawaii',
  },
  minimal: {
    name: 'Minimal Cute',
    emoji: '🤍',
    swatchBg: '#fff',
    swatchColor: '#f43f5e',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#f43f5e' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#f43f5e' },
      cornersDotOptions:    { type: 'dot',           color: '#f43f5e' },
      backgroundOptions:    { color: '#ffffff' },
    },
    frameClass: 'frame-minimal',
  },
  stamp: {
    name: 'Stamp',
    emoji: '📮',
    swatchBg: '#f0fdf4',
    swatchColor: '#059669',
    qr: {
      dotsOptions:          { type: 'classy', color: '#059669' },
      cornersSquareOptions: { type: 'square', color: '#065f46' },
      cornersDotOptions:    { type: 'square', color: '#065f46' },
      backgroundOptions:    { color: '#f0fdf4' },
    },
    frameClass: 'frame-stamp',
  },
  neon: {
    name: 'Neon Pop',
    emoji: '✨',
    swatchBg: '#1e1b4b',
    swatchColor: '#818cf8',
    qr: {
      dotsOptions:          { type: 'classy-rounded', color: '#818cf8' },
      cornersSquareOptions: { type: 'extra-rounded',  color: '#6366f1' },
      cornersDotOptions:    { type: 'dot',            color: '#a78bfa' },
      backgroundOptions:    { color: '#1e1b4b' },
    },
    frameClass: 'frame-neon',
  },
  cotton: {
    name: 'Cotton Candy',
    emoji: '🍭',
    swatchBg: 'linear-gradient(135deg, #ffc8e8, #c8e8ff)',
    swatchColor: '#ff6ec7',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#ff6ec7' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#60b4ff' },
      cornersDotOptions:    { type: 'dot',           color: '#ff6ec7' },
      backgroundOptions:    { color: '#ffffff' },
    },
    frameClass: 'frame-cotton',
  },
  matcha: {
    name: 'Matcha',
    emoji: '🍵',
    swatchBg: 'linear-gradient(135deg, #d4edda, #f5f0e8)',
    swatchColor: '#3a7d44',
    qr: {
      dotsOptions:          { type: 'classy',  color: '#3a7d44' },
      cornersSquareOptions: { type: 'square',  color: '#2d5a27' },
      cornersDotOptions:    { type: 'square',  color: '#2d5a27' },
      backgroundOptions:    { color: '#f5f0e8' },
    },
    frameClass: 'frame-matcha',
  },
  galaxy: {
    name: 'Galaxy',
    emoji: '🌌',
    swatchBg: 'linear-gradient(135deg, #0d0d2b, #1a1a4e)',
    swatchColor: '#f0c040',
    qr: {
      dotsOptions:          { type: 'classy-rounded', color: '#f0c040' },
      cornersSquareOptions: { type: 'extra-rounded',  color: '#e8a020' },
      cornersDotOptions:    { type: 'dot',            color: '#f0c040' },
      backgroundOptions:    { color: '#0d0d2b' },
    },
    frameClass: 'frame-galaxy',
  },
  sunrise: {
    name: 'Sunrise',
    emoji: '🌅',
    swatchBg: 'linear-gradient(135deg, #fff9c4, #ffccbc)',
    swatchColor: '#e65100',
    qr: {
      dotsOptions:          { type: 'rounded',       color: '#e65100' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#bf360c' },
      cornersDotOptions:    { type: 'dot',           color: '#e65100' },
      backgroundOptions:    { color: '#fff9c4' },
    },
    frameClass: 'frame-sunrise',
  },
  ocean: {
    name: 'Ocean',
    emoji: '🌊',
    swatchBg: 'linear-gradient(135deg, #b2ebf2, #80deea)',
    swatchColor: '#006064',
    qr: {
      dotsOptions:          { type: 'dots',   color: '#00838f' },
      cornersSquareOptions: { type: 'dot',    color: '#006064' },
      cornersDotOptions:    { type: 'dot',    color: '#006064' },
      backgroundOptions:    { color: '#e0f7fa' },
    },
    frameClass: 'frame-ocean',
  },
  sakura: {
    name: 'Sakura',
    emoji: '🌸',
    swatchBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    swatchColor: '#c2185b',
    qr: {
      dotsOptions:          { type: 'extra-rounded', color: '#e91e63' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#c2185b' },
      cornersDotOptions:    { type: 'dot',           color: '#c2185b' },
      backgroundOptions:    { color: '#fce4ec' },
    },
    frameClass: 'frame-sakura',
  },
};

// ===== State =====

let currentUrl    = '';
let currentPreset = 'bubbly';
let qrInstance    = null;

// ===== URL Validation =====

function validateUrl(url) {
  if (!url || !url.trim()) return 'Please enter a URL.';
  try {
    const u = new URL(url.trim());
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      return 'URL must start with http:// or https://';
    }
    return null;
  } catch (_) {
    return 'Please enter a valid URL (e.g. https://example.com)';
  }
}

// ===== Error / Feedback Helpers =====

function showError(msg) {
  const el = document.getElementById('error-msg');
  if (el) el.textContent = msg;
}

function hideError() {
  const el = document.getElementById('error-msg');
  if (el) el.textContent = '';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===== Preset UI =====

function renderPresets() {
  const grid = document.getElementById('presets-grid');
  if (!grid) return;

  grid.innerHTML = '';

  Object.entries(PRESETS).forEach(([key, preset]) => {
    const card = document.createElement('div');
    card.className = 'preset-card' + (key === currentPreset ? ' active' : '');
    card.dataset.preset = key;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', preset.name + ' style');

    const swatch = document.createElement('div');
    swatch.className = 'preset-swatch';
    swatch.style.background = preset.swatchBg;
    swatch.style.border = '2px solid ' + preset.swatchColor + '44';
    swatch.textContent = preset.emoji;

    const name = document.createElement('div');
    name.className = 'preset-name';
    name.textContent = preset.name;

    card.appendChild(swatch);
    card.appendChild(name);

    card.addEventListener('click', () => selectPreset(key));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectPreset(key);
      }
    });

    grid.appendChild(card);
  });
}

function selectPreset(key) {
  if (!PRESETS[key]) return;
  currentPreset = key;
  logEvent('preset_selected', { preset_name: key });

  document.querySelectorAll('.preset-card').forEach(card => {
    card.classList.toggle('active', card.dataset.preset === key);
  });

  if (qrInstance && currentUrl) {
    applyPresetToQR();
    updateFrameClass();
  }
}

// ===== QR Code Rendering =====

function applyPresetToQR() {
  const preset = PRESETS[currentPreset];
  qrInstance.update({
    data: currentUrl,
    ...preset.qr,
  });
}

function updateFrameClass() {
  const wrapper = document.getElementById('qr-frame-wrapper');
  if (!wrapper) return;
  const frameClasses = Object.values(PRESETS).map(p => p.frameClass);
  wrapper.classList.remove(...frameClasses);
  wrapper.classList.add(PRESETS[currentPreset].frameClass);
}

function generateQR(url) {
  const preset = PRESETS[currentPreset];
  const preview = document.getElementById('qr-preview');
  if (!preview) return;

  preview.innerHTML = '';
  qrInstance = new QRCodeStyling({
    width: 260,
    height: 260,
    type: 'canvas',
    data: url,
    qrOptions: { errorCorrectionLevel: 'M' },
    ...preset.qr,
  });
  qrInstance.append(preview);
  logEvent('qr_generated', { preset: currentPreset, url_length: url.length });

  updateFrameClass();

  // Reveal QR, hide placeholder, show action buttons
  const placeholder = document.getElementById('qr-placeholder');
  if (placeholder) placeholder.classList.add('hidden');
  const wrapper = document.getElementById('qr-frame-wrapper');
  if (wrapper) wrapper.classList.remove('hidden');
  const actionRow = document.getElementById('action-row');
  if (actionRow) actionRow.classList.remove('hidden');
}

// ===== Canvas Frame Drawing (for export) =====

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawHeart(ctx, cx, cy, size) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.3);
  ctx.bezierCurveTo(cx, cy,           cx - s, cy,           cx - s, cy + s * 0.3);
  ctx.bezierCurveTo(cx - s, cy + s,   cx,     cy + s * 1.6, cx,     cy + s * 1.6);
  ctx.bezierCurveTo(cx,     cy + s * 1.6, cx + s, cy + s,   cx + s, cy + s * 0.3);
  ctx.bezierCurveTo(cx + s, cy,           cx,     cy,        cx,     cy + s * 0.3);
  ctx.closePath();
}

const FRAME_DRAWERS = {
  bubbly: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    // Gradient background
    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#ffd6e7');
    bg.addColorStop(1, '#ffecd2');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 60);
    ctx.fill();

    // Bubble decorations
    const bubbles = [
      { x: 55,       y: 55,       r: 28 },
      { x: size - 55, y: 55,       r: 20 },
      { x: 40,       y: size - 70, r: 22 },
      { x: size - 45, y: size - 55, r: 32 },
      { x: size / 2, y: 28,       r: 14 },
      { x: size / 2, y: size - 28, r: 14 },
    ];
    bubbles.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fill();
    });

    // White card shadow
    ctx.shadowColor = 'rgba(199,125,255,0.2)';
    ctx.shadowBlur  = 20;
    ctx.fillStyle   = '#ffffff';
    roundedRect(ctx, pad - 16, pad - 16, qrSz + 32, qrSz + 32, 28);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);
  },

  retro: (ctx, size, qrImg) => {
    const lp = 80, rp = 80, tp = 80, bp = 200;
    const qrW = size - lp - rp;
    const qrH = size - tp - bp;

    // White polaroid background
    ctx.fillStyle = '#fffef9';
    ctx.fillRect(0, 0, size, size);

    // Slightly warm inner area
    ctx.fillStyle = '#FFF8F0';
    ctx.fillRect(lp, tp, qrW, qrH);

    // QR code
    ctx.drawImage(qrImg, lp, tp, qrW, qrH);

    // Separator line
    ctx.strokeStyle = '#D4A77A';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(lp,       size - bp + 28);
    ctx.lineTo(size - rp, size - bp + 28);
    ctx.stroke();

    // App name text
    ctx.fillStyle   = '#8B5E3C';
    ctx.font        = `bold ${Math.round(size * 0.06)}px serif`;
    ctx.textAlign   = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CuteQR', size / 2, size - bp + 80);

    // Small heart
    ctx.fillStyle = '#D4A77A';
    drawHeart(ctx, size / 2, size - bp + 108, 16);
    ctx.fill();
  },

  kawaii: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    // Lavender gradient background
    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#f5f0ff');
    bg.addColorStop(1, '#fce4ff');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 48);
    ctx.fill();

    // Dot pattern
    ctx.fillStyle = 'rgba(168,85,247,0.08)';
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        ctx.beginPath();
        ctx.arc(col * (size / 9) + 10, row * (size / 9) + 10, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // White card
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 24);
    ctx.fill();

    // Stars in corners
    const stars = [
      { x: 38, y: 38 }, { x: size - 38, y: 38 },
      { x: 38, y: size - 38 }, { x: size - 38, y: size - 38 },
    ];
    stars.forEach(({ x, y }) => {
      ctx.fillStyle = '#ec4899';
      ctx.font      = `${Math.round(size * 0.04)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', x, y);
    });

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);
  },

  minimal: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.11);
    const qrSz = size - pad * 2;

    // White background
    ctx.fillStyle = '#ffffff';
    roundedRect(ctx, 0, 0, size, size, 40);
    ctx.fill();

    // Pink border
    ctx.strokeStyle = '#ffb3cc';
    ctx.lineWidth   = 6;
    roundedRect(ctx, 10, 10, size - 20, size - 20, 36);
    ctx.stroke();

    // Inner border
    ctx.strokeStyle = '#ffe0ec';
    ctx.lineWidth   = 2;
    roundedRect(ctx, 22, 22, size - 44, size - 44, 28);
    ctx.stroke();

    // Heart corners
    const heartPositions = [
      { x: 38, y: 38 }, { x: size - 38, y: 38 },
      { x: 38, y: size - 38 }, { x: size - 38, y: size - 38 },
    ];
    heartPositions.forEach(({ x, y }) => {
      ctx.fillStyle = '#f43f5e';
      drawHeart(ctx, x - 10, y - 12, 20);
      ctx.fill();
    });

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);
  },

  stamp: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    // Mint background
    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(0, 0, size, size);

    // Perforated edge simulation
    const dotR   = 14;
    const dotGap = 36;
    ctx.fillStyle = '#ffffff';

    // Top & bottom perforations
    for (let x = dotR; x < size; x += dotGap) {
      ctx.beginPath(); ctx.arc(x, 0,    dotR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x, size, dotR, 0, Math.PI * 2); ctx.fill();
    }
    // Left & right perforations
    for (let y = dotR; y < size; y += dotGap) {
      ctx.beginPath(); ctx.arc(0,    y, dotR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(size, y, dotR, 0, Math.PI * 2); ctx.fill();
    }

    // Green frame line
    ctx.strokeStyle = '#86efac';
    ctx.lineWidth   = 4;
    ctx.strokeRect(dotR * 2, dotR * 2, size - dotR * 4, size - dotR * 4);

    // "SCAN ME" text at top
    ctx.fillStyle    = '#059669';
    ctx.font         = `900 ${Math.round(size * 0.04)}px sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCAN ME ✦', size / 2, dotR * 2 + 22);

    // Inner white card
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(pad - 8, pad - 8, qrSz + 16, qrSz + 16);

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    // "CuteQR" at bottom
    ctx.fillStyle = '#059669';
    ctx.font      = `bold ${Math.round(size * 0.035)}px sans-serif`;
    ctx.fillText('CuteQR', size / 2, size - dotR * 2 - 16);
  },

  neon: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.12);
    const qrSz = size - pad * 2;

    // Dark background
    ctx.fillStyle = '#1e1b4b';
    roundedRect(ctx, 0, 0, size, size, 32);
    ctx.fill();

    // Grid lines
    ctx.strokeStyle = 'rgba(99,102,241,0.15)';
    ctx.lineWidth   = 1;
    const gridStep  = Math.round(size / 12);
    for (let x = 0; x <= size; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
    }
    for (let y = 0; y <= size; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
    }

    // Glow border
    ctx.shadowColor  = '#6366f1';
    ctx.shadowBlur   = 30;
    ctx.strokeStyle  = '#818cf8';
    ctx.lineWidth    = 4;
    roundedRect(ctx, 10, 10, size - 20, size - 20, 28);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Inner glow frame around QR
    ctx.shadowColor  = '#a78bfa';
    ctx.shadowBlur   = 20;
    ctx.strokeStyle  = '#6366f1';
    ctx.lineWidth    = 2;
    roundedRect(ctx, pad - 14, pad - 14, qrSz + 28, qrSz + 28, 14);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    // Corner sparkles
    ctx.font         = `${Math.round(size * 0.04)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#a78bfa';
    ctx.fillText('✦', 36,        36);
    ctx.fillText('✦', size - 36, 36);
    ctx.fillText('✦', 36,        size - 36);
    ctx.fillText('✦', size - 36, size - 36);
  },

  cotton: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    // Cotton candy gradient
    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#ffc8e8');
    bg.addColorStop(1, '#c8e8ff');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 60);
    ctx.fill();

    // Diagonal stripes
    ctx.save();
    ctx.beginPath();
    roundedRect(ctx, 0, 0, size, size, 60);
    ctx.clip();
    ctx.globalAlpha = 0.1;
    for (let i = -size; i < size * 2; i += 44) {
      ctx.fillStyle = (Math.floor(i / 44) % 2 === 0) ? '#ff6ec7' : '#60b4ff';
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(i - size, -size * 2, 22, size * 4);
      ctx.restore();
    }
    ctx.restore();

    // White card
    ctx.shadowColor = 'rgba(255,110,199,0.2)';
    ctx.shadowBlur  = 18;
    ctx.fillStyle   = 'rgba(255,255,255,0.88)';
    roundedRect(ctx, pad - 14, pad - 14, qrSz + 28, qrSz + 28, 24);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.055)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍭', 42,        42);
    ctx.fillText('🍬', size - 42, size - 42);
  },

  matcha: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#d4edda');
    bg.addColorStop(1, '#f5f0e8');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 40);
    ctx.fill();

    ctx.strokeStyle = '#a5d6a7';
    ctx.lineWidth   = 5;
    roundedRect(ctx, 14, 14, size - 28, size - 28, 34);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 20);
    ctx.fill();

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.055)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍵', size - 44, 44);
  },

  galaxy: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.12);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#0d0d2b');
    bg.addColorStop(1, '#1a1a4e');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 40);
    ctx.fill();

    // Stars (deterministic)
    for (let i = 0; i < 90; i++) {
      const xi = Math.abs(Math.sin(i * 1.1) * size);
      const yi = Math.abs(Math.sin(i * 2.3) * size);
      const ri = Math.abs(Math.sin(i * 3.7)) * 3 + 0.5;
      ctx.beginPath();
      ctx.arc(xi, yi, ri, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.abs(Math.sin(i * 4.1)) * 0.5})`;
      ctx.fill();
    }

    ctx.shadowColor = '#f0c040';
    ctx.shadowBlur  = 22;
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth   = 3;
    roundedRect(ctx, 12, 12, size - 24, size - 24, 34);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.fillStyle    = '#f0c040';
    ctx.font         = `${Math.round(size * 0.04)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', 32,        32);
    ctx.fillText('✦', size - 32, 32);
    ctx.fillText('✦', 32,        size - 32);
    ctx.fillText('✦', size - 32, size - 32);
  },

  sunrise: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0,   '#fff9c4');
    bg.addColorStop(0.5, '#ffe0b2');
    bg.addColorStop(1,   '#ffccbc');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 40);
    ctx.fill();

    // Subtle sun rays from top center
    ctx.save();
    const cx = size / 2, cy = -size * 0.1;
    ctx.globalAlpha = 0.07;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * size * 1.5, cy + Math.sin(angle) * size * 1.5);
      ctx.strokeStyle = '#ff6f00';
      ctx.lineWidth   = 28;
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 20);
    ctx.fill();

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.055)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌅', size / 2, size - 38);
  },

  ocean: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0,   '#e0f7fa');
    bg.addColorStop(0.5, '#b2ebf2');
    bg.addColorStop(1,   '#80deea');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 40);
    ctx.fill();

    // Wave layers
    ctx.save();
    ctx.globalAlpha = 0.18;
    for (let w = 0; w < 3; w++) {
      const baseY = size - 55 + w * 22;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= size; x += 50) {
        ctx.quadraticCurveTo(x + 25, baseY - 22, x + 50, baseY);
      }
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fillStyle = '#00838f';
      ctx.fill();
    }
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 20);
    ctx.fill();

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.052)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌊', 40,        size - 40);
    ctx.fillText('🐚', size - 40, size - 40);
  },

  sakura: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#fce4ec');
    bg.addColorStop(1, '#fdf6f8');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 56);
    ctx.fill();

    ctx.strokeStyle = '#f8bbd0';
    ctx.lineWidth   = 5;
    roundedRect(ctx, 12, 12, size - 24, size - 24, 48);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 22);
    ctx.fill();

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    const blossomsPos = [
      { x: 34, y: 34 }, { x: size - 34, y: 34 },
      { x: 34, y: size - 34 }, { x: size - 34, y: size - 34 },
      { x: size / 2, y: 24 },
    ];
    ctx.font         = `${Math.round(size * 0.042)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    blossomsPos.forEach(({ x, y }) => ctx.fillText('🌸', x, y));
  },
};

// ===== Export Canvas =====

async function buildExportCanvas() {
  const exportSize = 1024;
  const qrSize     = Math.round(exportSize * 0.65);

  // Render QR at high resolution
  const exportQR = new QRCodeStyling({
    width:  qrSize,
    height: qrSize,
    type:   'canvas',
    data:   currentUrl,
    qrOptions: { errorCorrectionLevel: 'M' },
    ...PRESETS[currentPreset].qr,
  });

  const tempDiv = document.createElement('div');
  tempDiv.style.cssText = 'position:absolute;left:-9999px;';
  document.body.appendChild(tempDiv);
  exportQR.append(tempDiv);

  // Wait for canvas to render
  await new Promise(resolve => setTimeout(resolve, 300));

  const qrCanvas = tempDiv.querySelector('canvas');
  if (!qrCanvas) {
    document.body.removeChild(tempDiv);
    throw new Error('QR canvas not found');
  }

  // Draw onto export canvas with frame
  const canvas = document.createElement('canvas');
  canvas.width  = exportSize;
  canvas.height = exportSize;
  const ctx     = canvas.getContext('2d');

  const drawer = FRAME_DRAWERS[currentPreset];
  if (drawer) {
    await drawer(ctx, exportSize, qrCanvas);
  } else {
    ctx.drawImage(qrCanvas, 0, 0, exportSize, exportSize);
  }

  document.body.removeChild(tempDiv);
  return canvas;
}

// ===== Save / Copy =====

async function saveImage() {
  const btn = document.getElementById('save-btn');
  if (btn) { btn.textContent = '⏳ Saving...'; btn.disabled = true; }

  try {
    const canvas = await buildExportCanvas();
    const link   = document.createElement('a');
    link.download = 'cuteqr.png';
    link.href     = canvas.toDataURL('image/png');
    link.click();
    logEvent('qr_saved', { preset: currentPreset });
  } catch (err) {
    showError('Could not save image. Please try again.');
    console.error(err);
  } finally {
    if (btn) { btn.textContent = '💾 Save PNG'; btn.disabled = false; }
  }
}

async function copyToClipboard() {
  const btn = document.getElementById('copy-btn');
  if (btn) { btn.textContent = '⏳ Copying...'; btn.disabled = true; }

  try {
    const canvas = await buildExportCanvas();
    const blob   = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);

    const success = document.getElementById('copy-success');
    if (success) {
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 2500);
    }
    logEvent('qr_copied', { preset: currentPreset });
  } catch (err) {
    showError('Could not copy. Your browser may not support clipboard image copying.');
    console.error(err);
  } finally {
    if (btn) { btn.textContent = '📋 Copy'; btn.disabled = false; }
  }
}

// ===== Auto-Generate (debounced) =====

let autoGenTimer = null;

function scheduleAutoGen() {
  clearTimeout(autoGenTimer);
  autoGenTimer = setTimeout(() => {
    const input = document.getElementById('url-input');
    if (!input) return;
    const url = input.value.trim();
    if (!url) { hideError(); return; }
    const err = validateUrl(url);
    if (err) { showError(err); return; }
    hideError();
    currentUrl = url;
    generateQR(currentUrl);
  }, 500);
}

// ===== Init =====

function init() {
  renderPresets();

  const urlInput = document.getElementById('url-input');
  const saveBtn  = document.getElementById('save-btn');
  const copyBtn  = document.getElementById('copy-btn');

  if (urlInput) {
    urlInput.addEventListener('input', () => {
      if (document.getElementById('error-msg')?.textContent) hideError();
      scheduleAutoGen();
    });
    urlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        clearTimeout(autoGenTimer);
        const url = urlInput.value.trim();
        const err = validateUrl(url);
        if (err) { showError(err); return; }
        hideError();
        currentUrl = url;
        generateQR(currentUrl);
      }
    });
  }

  if (saveBtn) saveBtn.addEventListener('click', saveImage);
  if (copyBtn) copyBtn.addEventListener('click', copyToClipboard);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ===== Test Exports (Jest compatibility) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateUrl, escapeHtml, PRESETS, roundedRect, drawHeart, logEvent };
}
