'use strict';

// ===== Canvas Drawing Helpers =====

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

// ===== Frame Drawers (canvas export, 1024×1024) =====
// Each function: (ctx, size, qrImg) => void
// Draw background → decorations → inner card → qrImg → emoji overlays

const FRAME_DRAWERS = {
  bubbly: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#ffd6e7');
    bg.addColorStop(1, '#ffecd2');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 60);
    ctx.fill();

    const bubbles = [
      { x: 55,        y: 55,        r: 28 },
      { x: size - 55, y: 55,        r: 20 },
      { x: 40,        y: size - 70, r: 22 },
      { x: size - 45, y: size - 55, r: 32 },
      { x: size / 2,  y: 28,        r: 14 },
      { x: size / 2,  y: size - 28, r: 14 },
    ];
    bubbles.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fill();
    });

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

    ctx.fillStyle = '#fffef9';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#FFF8F0';
    ctx.fillRect(lp, tp, qrW, qrH);

    ctx.drawImage(qrImg, lp, tp, qrW, qrH);

    ctx.strokeStyle = '#D4A77A';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(lp,        size - bp + 28);
    ctx.lineTo(size - rp, size - bp + 28);
    ctx.stroke();

    ctx.fillStyle    = '#8B5E3C';
    ctx.font         = `bold ${Math.round(size * 0.06)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CuteQR', size / 2, size - bp + 80);

    ctx.fillStyle = '#D4A77A';
    drawHeart(ctx, size / 2, size - bp + 108, 16);
    ctx.fill();
  },

  kawaii: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#f5f0ff');
    bg.addColorStop(1, '#fce4ff');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 48);
    ctx.fill();

    ctx.fillStyle = 'rgba(168,85,247,0.08)';
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        ctx.beginPath();
        ctx.arc(col * (size / 9) + 10, row * (size / 9) + 10, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 24);
    ctx.fill();

    const stars = [
      { x: 38, y: 38 }, { x: size - 38, y: 38 },
      { x: 38, y: size - 38 }, { x: size - 38, y: size - 38 },
    ];
    stars.forEach(({ x, y }) => {
      ctx.fillStyle    = '#ec4899';
      ctx.font         = `${Math.round(size * 0.04)}px serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', x, y);
    });

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);
  },

  minimal: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.11);
    const qrSz = size - pad * 2;

    ctx.fillStyle = '#ffffff';
    roundedRect(ctx, 0, 0, size, size, 40);
    ctx.fill();

    ctx.strokeStyle = '#ffb3cc';
    ctx.lineWidth   = 6;
    roundedRect(ctx, 10, 10, size - 20, size - 20, 36);
    ctx.stroke();

    ctx.strokeStyle = '#ffe0ec';
    ctx.lineWidth   = 2;
    roundedRect(ctx, 22, 22, size - 44, size - 44, 28);
    ctx.stroke();

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

    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(0, 0, size, size);

    const dotR   = 14;
    const dotGap = 36;
    ctx.fillStyle = '#ffffff';

    for (let x = dotR; x < size; x += dotGap) {
      ctx.beginPath(); ctx.arc(x, 0,    dotR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x, size, dotR, 0, Math.PI * 2); ctx.fill();
    }
    for (let y = dotR; y < size; y += dotGap) {
      ctx.beginPath(); ctx.arc(0,    y, dotR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(size, y, dotR, 0, Math.PI * 2); ctx.fill();
    }

    ctx.strokeStyle = '#86efac';
    ctx.lineWidth   = 4;
    ctx.strokeRect(dotR * 2, dotR * 2, size - dotR * 4, size - dotR * 4);

    ctx.fillStyle    = '#059669';
    ctx.font         = `900 ${Math.round(size * 0.04)}px sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCAN ME ✦', size / 2, dotR * 2 + 22);

    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(pad - 8, pad - 8, qrSz + 16, qrSz + 16);

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.fillStyle = '#059669';
    ctx.font      = `bold ${Math.round(size * 0.035)}px sans-serif`;
    ctx.fillText('CuteQR', size / 2, size - dotR * 2 - 16);
  },

  neon: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.12);
    const qrSz = size - pad * 2;

    ctx.fillStyle = '#1e1b4b';
    roundedRect(ctx, 0, 0, size, size, 32);
    ctx.fill();

    ctx.strokeStyle = 'rgba(99,102,241,0.15)';
    ctx.lineWidth   = 1;
    const gridStep  = Math.round(size / 12);
    for (let x = 0; x <= size; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
    }
    for (let y = 0; y <= size; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
    }

    ctx.shadowColor  = '#6366f1';
    ctx.shadowBlur   = 30;
    ctx.strokeStyle  = '#818cf8';
    ctx.lineWidth    = 4;
    roundedRect(ctx, 10, 10, size - 20, size - 20, 28);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.shadowColor  = '#a78bfa';
    ctx.shadowBlur   = 20;
    ctx.strokeStyle  = '#6366f1';
    ctx.lineWidth    = 2;
    roundedRect(ctx, pad - 14, pad - 14, qrSz + 28, qrSz + 28, 14);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

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

    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#ffc8e8');
    bg.addColorStop(1, '#c8e8ff');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 60);
    ctx.fill();

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

  forest: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    const bg = ctx.createRadialGradient(size / 2, size / 2, qrSz * 0.4, size / 2, size / 2, size * 0.8);
    bg.addColorStop(0, '#2d6a4f');
    bg.addColorStop(1, '#1b4332');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 36);
    ctx.fill();

    for (let i = 0; i < 18; i++) {
      const ex = Math.abs(Math.sin(i * 1.7)) * size;
      const ey = Math.abs(Math.sin(i * 2.9)) * size;
      ctx.beginPath();
      ctx.ellipse(ex, ey, 18, 10, i * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fill();
    }

    ctx.shadowColor = 'rgba(27,67,50,0.35)';
    ctx.shadowBlur  = 18;
    ctx.fillStyle   = 'rgba(216,243,220,0.92)';
    roundedRect(ctx, pad - 14, pad - 14, qrSz + 28, qrSz + 28, 20);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#95d5b2';
    ctx.lineWidth   = 3;
    roundedRect(ctx, 10, 10, size - 20, size - 20, 30);
    ctx.stroke();

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.052)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌿', 40,        40);
    ctx.fillText('🍄', size - 40, 40);
    ctx.fillText('🌱', 40,        size - 40);
    ctx.fillText('🌿', size - 40, size - 40);
  },

  candy: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    ctx.fillStyle = '#ffffff';
    roundedRect(ctx, 0, 0, size, size, 48);
    ctx.fill();

    const borders = [
      { color: '#ff595e', offset: 5 },
      { color: '#8ac926', offset: 17 },
      { color: '#1982c4', offset: 29 },
    ];
    borders.forEach(({ color, offset }) => {
      ctx.strokeStyle = color;
      ctx.lineWidth   = 10;
      roundedRect(ctx, offset, offset, size - offset * 2, size - offset * 2, 44 - offset);
      ctx.stroke();
    });

    ctx.shadowColor = 'rgba(214,40,40,0.15)';
    ctx.shadowBlur  = 16;
    ctx.fillStyle   = 'rgba(255,255,255,0.95)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 22);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.055)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌈', 42,        42);
    ctx.fillText('⭐', size - 42, 42);
    ctx.fillText('🍬', 42,        size - 42);
    ctx.fillText('🌟', size - 42, size - 42);
  },

  parchment: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.13);
    const qrSz = size - pad * 2;

    ctx.fillStyle = '#e8d5a3';
    roundedRect(ctx, 0, 0, size, size, 8);
    ctx.fill();

    const vignette = ctx.createRadialGradient(size / 2, size / 2, qrSz * 0.4, size / 2, size / 2, size * 0.8);
    vignette.addColorStop(0, 'rgba(101,67,33,0)');
    vignette.addColorStop(1, 'rgba(101,67,33,0.38)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = 'rgba(139,90,43,0.07)';
    ctx.lineWidth   = 1;
    const lineStep  = Math.round(size / 13);
    for (let y = lineStep; y < size; y += lineStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
    }

    ctx.fillStyle = '#f5e6c8';
    ctx.fillRect(pad - 10, pad - 10, qrSz + 20, qrSz + 20);
    ctx.strokeStyle = '#8b5a2b';
    ctx.lineWidth   = 3;
    ctx.strokeRect(pad - 10, pad - 10, qrSz + 20, qrSz + 20);
    ctx.strokeStyle = '#c9a96e';
    ctx.lineWidth   = 1;
    ctx.strokeRect(pad - 6, pad - 6, qrSz + 12, qrSz + 12);

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.fillStyle    = '#6b4226';
    ctx.font         = `${Math.round(size * 0.042)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', 32,        32);
    ctx.fillText('✦', size - 32, 32);
    ctx.fillText('✦', 32,        size - 32);
    ctx.fillText('✦', size - 32, size - 32);

    ctx.fillStyle = '#5c2e00';
    ctx.font      = `italic bold ${Math.round(size * 0.038)}px serif`;
    ctx.fillText('~ Scan Me ~', size / 2, size - 30);
  },

  arctic: (ctx, size, qrImg) => {
    const pad  = Math.round(size * 0.12);
    const qrSz = size - pad * 2;

    const bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, '#e8f4f8');
    bg.addColorStop(1, '#b8dce8');
    ctx.fillStyle = bg;
    roundedRect(ctx, 0, 0, size, size, 28);
    ctx.fill();

    const snowflakes = [
      { cx: 36,        cy: 36,        r: 22 },
      { cx: size - 36, cy: 36,        r: 22 },
      { cx: 36,        cy: size - 36, r: 22 },
      { cx: size - 36, cy: size - 36, r: 22 },
      { cx: size / 2,  cy: 28,        r: 16 },
      { cx: size / 2,  cy: size - 28, r: 16 },
    ];
    ctx.strokeStyle = 'rgba(0,95,134,0.15)';
    ctx.lineWidth   = 2;
    snowflakes.forEach(({ cx, cy, r }) => {
      for (let arm = 0; arm < 6; arm++) {
        const angle = (arm / 6) * Math.PI * 2;
        const ex    = cx + Math.cos(angle) * r;
        const ey    = cy + Math.sin(angle) * r;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
        const bx1 = cx + Math.cos(angle) * r * 0.65 + Math.cos(angle + Math.PI / 3) * r * 0.25;
        const by1 = cy + Math.sin(angle) * r * 0.65 + Math.sin(angle + Math.PI / 3) * r * 0.25;
        const bx2 = cx + Math.cos(angle) * r * 0.65 + Math.cos(angle - Math.PI / 3) * r * 0.25;
        const by2 = cy + Math.sin(angle) * r * 0.65 + Math.sin(angle - Math.PI / 3) * r * 0.25;
        ctx.beginPath(); ctx.moveTo(bx1, by1); ctx.lineTo(bx2, by2); ctx.stroke();
      }
    });

    ctx.shadowColor = 'rgba(0,95,134,0.2)';
    ctx.shadowBlur  = 16;
    ctx.fillStyle   = 'rgba(240,249,252,0.92)';
    roundedRect(ctx, pad - 12, pad - 12, qrSz + 24, qrSz + 24, 10);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(0,95,134,0.25)';
    ctx.lineWidth   = 2;
    const corners = [
      [0, 40, 40, 0], [size, 40, size - 40, 0],
      [0, size - 40, 40, size], [size, size - 40, size - 40, size],
    ];
    corners.forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });

    ctx.strokeStyle = '#7ec8e3';
    ctx.lineWidth   = 2.5;
    roundedRect(ctx, 8, 8, size - 16, size - 16, 22);
    ctx.stroke();

    ctx.drawImage(qrImg, pad, pad, qrSz, qrSz);

    ctx.font         = `${Math.round(size * 0.05)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❄️', 38,        38);
    ctx.fillText('❄️', size - 38, size - 38);
  },
};

// ===== Dual export (browser global + CommonJS for Jest) =====
if (typeof module !== 'undefined') {
  module.exports = { FRAME_DRAWERS, roundedRect, drawHeart };
}
