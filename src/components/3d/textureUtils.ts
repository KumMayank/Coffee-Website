import * as THREE from 'three';

// Generate Latte Art Texture (Heart / Rosette on Espresso Crema)
export function createLatteArtTexture(type: 'heart' | 'tulip' | 'plain' = 'heart'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const cx = 512;
  const cy = 512;
  const r = 500;

  // 1. Base Crema Gradient
  const cremaGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, r);
  cremaGrad.addColorStop(0, '#5C381E');
  cremaGrad.addColorStop(0.35, '#824F29');
  cremaGrad.addColorStop(0.7, '#A56838');
  cremaGrad.addColorStop(0.9, '#C48A54');
  cremaGrad.addColorStop(1, '#6F3E1B');

  ctx.fillStyle = cremaGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Micro Crema bubbles & marbling
  ctx.fillStyle = 'rgba(230, 180, 120, 0.12)';
  for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * (r - 40);
    const rad = 2 + Math.random() * 8;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Milk Foam Art Pattern
  ctx.save();
  ctx.translate(cx, cy);

  if (type === 'heart') {
    // Elegant Heart Shape Latte Art
    ctx.fillStyle = '#FFF5E8';
    ctx.shadowColor = 'rgba(110, 60, 25, 0.4)';
    ctx.shadowBlur = 18;

    // Draw Heart
    ctx.beginPath();
    const topCurveHeight = 160;
    ctx.moveTo(0, 140);
    // Left curve
    ctx.bezierCurveTo(-260, 40, -260, -180, 0, -80);
    // Right curve
    ctx.bezierCurveTo(260, -180, 260, 40, 0, 140);
    ctx.fill();

    // Inner heart ring
    ctx.fillStyle = '#FFFAF2';
    ctx.beginPath();
    ctx.moveTo(0, 110);
    ctx.bezierCurveTo(-180, 30, -180, -130, 0, -50);
    ctx.bezierCurveTo(180, -130, 180, 30, 0, 110);
    ctx.fill();

    // Heart tip pull line
    ctx.strokeStyle = '#D49B6A';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -140);
    ctx.lineTo(0, 180);
    ctx.stroke();

    // Tiny dots at top
    ctx.fillStyle = '#FFF5E8';
    for (let d = 1; d <= 3; d++) {
      ctx.beginPath();
      ctx.arc(0, 180 + d * 35, 12 - d * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Tulip / Rosette Layered Art
    ctx.fillStyle = '#FFF5E8';
    for (let tier = 0; tier < 4; tier++) {
      const yOffset = -120 + tier * 70;
      const scale = 1 - tier * 0.12;
      ctx.beginPath();
      ctx.ellipse(0, yOffset, 140 * scale, 75 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // Pull line
    ctx.strokeStyle = '#D49B6A';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(0, -180);
    ctx.lineTo(0, 200);
    ctx.stroke();
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate Bag Label Texture
export function createBagLabelTexture(title: string, sub: string, accentHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Matte dark charcoal background
  ctx.fillStyle = '#18120F';
  ctx.fillRect(0, 0, 1024, 1024);

  // Gold foil border
  ctx.strokeStyle = accentHex || '#C08A55';
  ctx.lineWidth = 8;
  ctx.strokeRect(60, 60, 904, 904);

  // Inner subtle border
  ctx.strokeStyle = 'rgba(243, 231, 216, 0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, 864, 864);

  // Brand Name
  ctx.fillStyle = '#C08A55';
  ctx.font = 'bold 36px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  ctx.fillText('[ CODE WITH GANDHI ]', 512, 180);

  // Subtitle
  ctx.fillStyle = '#D8C6B2';
  ctx.font = '24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('SINGLE ORIGIN ROASTERY', 512, 230);

  // Decorative divider
  ctx.beginPath();
  ctx.moveTo(350, 270);
  ctx.lineTo(674, 270);
  ctx.strokeStyle = '#C08A55';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Coffee Title
  ctx.fillStyle = '#F3E7D8';
  ctx.font = 'bold 54px "Playfair Display", serif';
  ctx.fillText(title.toUpperCase(), 512, 420);

  // Details
  ctx.fillStyle = '#C08A55';
  ctx.font = '32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(sub.toUpperCase(), 512, 490);

  // Tasting Notes Box
  ctx.fillStyle = 'rgba(42, 29, 23, 0.8)';
  ctx.fillRect(160, 560, 704, 160);
  ctx.strokeStyle = 'rgba(192, 138, 85, 0.4)';
  ctx.strokeRect(160, 560, 704, 160);

  ctx.fillStyle = '#F3E7D8';
  ctx.font = '26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TASTING NOTES: JASMINE • BERGAMOT • PEACH', 512, 630);
  ctx.fillStyle = '#D8C6B2';
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ELEVATION: 2,100M  •  PROCESS: NATURAL ANAEROBIC', 512, 680);

  // Net weight & seal
  ctx.fillStyle = '#C08A55';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('NET WT. 250G / 8.8 OZ  •  WHOLE BEAN', 512, 840);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
