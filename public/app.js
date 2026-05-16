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
  module.exports = { validateUrl, escapeHtml, logEvent };
}
