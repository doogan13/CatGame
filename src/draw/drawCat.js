export function drawOrange(c, x, y, sc, dir, bl) {
  c.save(); c.translate(x, y); c.scale(dir, 1); const s = sc;
  c.strokeStyle = '#C05010'; c.lineWidth = s * 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(-s * 16, s * 6); c.bezierCurveTo(-s * 48, s * 4, -s * 55, -s * 26, -s * 36, -s * 40); c.stroke();
  c.strokeStyle = '#F08040'; c.lineWidth = s * 5; c.beginPath(); c.moveTo(-s * 16, s * 6); c.bezierCurveTo(-s * 48, s * 4, -s * 55, -s * 26, -s * 36, -s * 40); c.stroke();
  c.fillStyle = '#F4914A'; c.beginPath(); c.ellipse(0, 0, s * 26, s * 20, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#FAE0B0'; c.beginPath(); c.ellipse(s * 5, s * 5, s * 15, s * 12, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#C05010'; c.lineWidth = s * 2.5; c.lineCap = 'round';
  [[-s * 12, -s * 17, -s * 9, s * 11], [-s * 2, -s * 19, s * 1, s * 12], [s * 9, -s * 17, s * 11, s * 11]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
  c.fillStyle = '#E07030'; c.beginPath(); c.ellipse(s * 20, s * 15, s * 10, s * 6, -0.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#FAE0B0'; c.beginPath(); c.ellipse(s * 24, s * 19, s * 7, s * 5, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#E07030'; c.beginPath(); c.ellipse(-s * 18, s * 16, s * 9, s * 6, 0.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#FAE0B0'; c.beginPath(); c.ellipse(-s * 18, s * 22, s * 6, s * 4, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#F4914A'; c.beginPath(); c.ellipse(s * 20, -s * 18, s * 21, s * 19, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#D06020'; c.beginPath(); c.moveTo(s * 7, -s * 29); c.lineTo(s * 1, -s * 50); c.lineTo(s * 20, -s * 36); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(s * 28, -s * 29); c.lineTo(s * 35, -s * 50); c.lineTo(s * 42, -s * 34); c.closePath(); c.fill();
  c.fillStyle = '#F0A090'; c.beginPath(); c.moveTo(s * 9, -s * 31); c.lineTo(s * 5, -s * 44); c.lineTo(s * 18, -s * 37); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(s * 29, -s * 31); c.lineTo(s * 34, -s * 44); c.lineTo(s * 40, -s * 35); c.closePath(); c.fill();
  c.strokeStyle = '#C05010'; c.lineWidth = s * 2;
  [[s * 12, -s * 6, s * 12, -s * 30], [s * 20, -s * 4, s * 20, -s * 32], [s * 28, -s * 6, s * 28, -s * 30]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
  c.strokeStyle = '#C05010'; c.lineWidth = s * 1.8; c.beginPath(); c.moveTo(s * 12, -s * 30); c.lineTo(s * 16, -s * 24); c.lineTo(s * 20, -s * 30); c.lineTo(s * 24, -s * 24); c.lineTo(s * 28, -s * 30); c.stroke();
  c.fillStyle = '#FAE0C0'; c.beginPath(); c.ellipse(s * 32, -s * 14, s * 10, s * 8, 0, 0, Math.PI * 2); c.fill();
  if (bl) {
    c.strokeStyle = '#5A2A08'; c.lineWidth = s * 2.5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(s * 13, -s * 20); c.lineTo(s * 19, -s * 20); c.stroke();
    c.beginPath(); c.moveTo(s * 24, -s * 20); c.lineTo(s * 30, -s * 20); c.stroke();
  } else {
    c.fillStyle = '#C8C020'; c.beginPath(); c.ellipse(s * 16, -s * 21, s * 5, s * 6, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(s * 27, -s * 21, s * 5, s * 6, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1A0E04'; c.beginPath(); c.ellipse(s * 16, -s * 21, s * 2, s * 5, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(s * 27, -s * 21, s * 2, s * 5, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(s * 18, -s * 24, s * 1.8, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(s * 29, -s * 24, s * 1.8, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#5A2A08'; c.lineWidth = s * 1; c.beginPath(); c.ellipse(s * 16, -s * 21, s * 5, s * 6, 0, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.ellipse(s * 27, -s * 21, s * 5, s * 6, 0, 0, Math.PI * 2); c.stroke();
  }
  c.fillStyle = '#E05878'; c.beginPath(); c.moveTo(s * 32, -s * 18); c.lineTo(s * 28, -s * 12); c.lineTo(s * 36, -s * 12); c.closePath(); c.fill();
  c.strokeStyle = '#904040'; c.lineWidth = s * 1.5; c.lineCap = 'round';
  c.beginPath(); c.moveTo(s * 32, -s * 12); c.quadraticCurveTo(s * 26, -s * 6, s * 22, -s * 8); c.stroke();
  c.beginPath(); c.moveTo(s * 32, -s * 12); c.quadraticCurveTo(s * 38, -s * 6, s * 42, -s * 8); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = s * 1.2; c.lineCap = 'round';
  [[-1, s * 4], [-1, 0], [1, s * 4], [1, 0]].forEach(([d, oy]) => { c.beginPath(); c.moveTo(s * 32 + d * s * 4, -s * 13 + oy); c.lineTo(s * 32 + d * s * 20, -s * 13 + oy); c.stroke(); });
  c.restore();
}

export function drawGray(c, x, y, sc, dir, bl) {
  c.save(); c.translate(x, y); c.scale(dir, 1); const s = sc;
  c.strokeStyle = '#505470'; c.lineWidth = s * 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-s * 12, s * 5); c.bezierCurveTo(-s * 38, s * 2, -s * 44, -s * 20, -s * 26, -s * 32); c.stroke();
  c.strokeStyle = '#9A9EB8'; c.lineWidth = s * 4; c.beginPath(); c.moveTo(-s * 12, s * 5); c.bezierCurveTo(-s * 38, s * 2, -s * 44, -s * 20, -s * 26, -s * 32); c.stroke();
  c.fillStyle = '#9A9EB8'; c.beginPath(); c.ellipse(0, 0, s * 19, s * 15, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#D0D4E8'; c.beginPath(); c.ellipse(s * 3, s * 4, s * 11, s * 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#686C88'; c.lineWidth = s * 2; c.lineCap = 'round';
  [[-s * 8, -s * 12, -s * 6, s * 8], [-s * 1, -s * 13, s * 0, s * 9], [s * 7, -s * 12, s * 7, s * 8]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
  c.fillStyle = '#8A8EA8'; c.beginPath(); c.ellipse(s * 15, s * 11, s * 7, s * 5, -0.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#D0D4E8'; c.beginPath(); c.ellipse(s * 18, s * 15, s * 5, s * 4, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#8A8EA8'; c.beginPath(); c.ellipse(-s * 13, s * 12, s * 7, s * 5, 0.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#D0D4E8'; c.beginPath(); c.ellipse(-s * 13, s * 17, s * 5, s * 4, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#9A9EB8'; c.beginPath(); c.ellipse(s * 15, -s * 13, s * 16, s * 14, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#787C96'; c.beginPath(); c.moveTo(s * 4, -s * 21); c.lineTo(s * 0, -s * 37); c.lineTo(s * 14, -s * 25); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(s * 21, -s * 21); c.lineTo(s * 26, -s * 37); c.lineTo(s * 31, -s * 24); c.closePath(); c.fill();
  c.fillStyle = '#E8A0B8'; c.beginPath(); c.moveTo(s * 6, -s * 23); c.lineTo(s * 3, -s * 33); c.lineTo(s * 12, -s * 26); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(s * 22, -s * 23); c.lineTo(s * 25, -s * 33); c.lineTo(s * 29, -s * 25); c.closePath(); c.fill();
  c.strokeStyle = '#686C88'; c.lineWidth = s * 1.8;
  [[s * 9, -s * 4, s * 9, -s * 22], [s * 15, -s * 3, s * 15, -s * 23], [s * 21, -s * 4, s * 21, -s * 22]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
  c.strokeStyle = '#686C88'; c.lineWidth = s * 1.6; c.beginPath(); c.moveTo(s * 9, -s * 22); c.lineTo(s * 12, -s * 17); c.lineTo(s * 15, -s * 22); c.lineTo(s * 18, -s * 17); c.lineTo(s * 21, -s * 22); c.stroke();
  c.fillStyle = '#E0E4F4'; c.beginPath(); c.ellipse(s * 24, -s * 10, s * 8, s * 6, 0, 0, Math.PI * 2); c.fill();
  if (bl) {
    c.strokeStyle = '#303055'; c.lineWidth = s * 2.2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(s * 9, -s * 14); c.lineTo(s * 14, -s * 14); c.stroke();
    c.beginPath(); c.moveTo(s * 18, -s * 14); c.lineTo(s * 23, -s * 14); c.stroke();
  } else {
    c.fillStyle = '#C4C418'; c.beginPath(); c.ellipse(s * 11, -s * 15, s * 4, s * 5, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(s * 20, -s * 15, s * 4, s * 5, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#0E0C1E'; c.beginPath(); c.ellipse(s * 11, -s * 15, s * 1.8, s * 4, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(s * 20, -s * 15, s * 1.8, s * 4, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(s * 13, -s * 18, s * 1.4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(s * 22, -s * 18, s * 1.4, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#404060'; c.lineWidth = s * 0.9; c.beginPath(); c.ellipse(s * 11, -s * 15, s * 4, s * 5, 0, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.ellipse(s * 20, -s * 15, s * 4, s * 5, 0, 0, Math.PI * 2); c.stroke();
  }
  c.fillStyle = '#D06888'; c.beginPath(); c.moveTo(s * 24, -s * 13); c.lineTo(s * 21, -s * 8); c.lineTo(s * 27, -s * 8); c.closePath(); c.fill();
  c.strokeStyle = '#806070'; c.lineWidth = s * 1.3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(s * 24, -s * 8); c.quadraticCurveTo(s * 19, -s * 3, s * 16, -s * 5); c.stroke();
  c.beginPath(); c.moveTo(s * 24, -s * 8); c.quadraticCurveTo(s * 29, -s * 3, s * 32, -s * 5); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = s * 1; c.lineCap = 'round';
  [[-1, s * 3], [-1, 0], [1, s * 3], [1, 0]].forEach(([d, oy]) => { c.beginPath(); c.moveTo(s * 24 + d * s * 3, -s * 10 + oy); c.lineTo(s * 24 + d * s * 15, -s * 10 + oy); c.stroke(); });
  c.restore();
}

export function drawHelmet(c, catType, dir = 1) {
  const isOrange = catType === 'orange';
  const hx = isOrange ? 19 : 13;
  const hy = isOrange ? -20 : -13;
  const hr = isOrange ? 27 : 19;

  c.save();
  c.scale(dir, 1);

  // collar
  c.fillStyle = '#B0B0C0';
  c.beginPath(); c.ellipse(hx, hy + hr * 0.72, hr * 0.72, hr * 0.2, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#888898'; c.lineWidth = 1.5; c.stroke();

  // glass dome
  c.fillStyle = 'rgba(180,220,255,0.13)';
  c.strokeStyle = 'rgba(160,215,255,0.8)';
  c.lineWidth = 2.5;
  c.beginPath(); c.arc(hx, hy, hr, 0, Math.PI * 2); c.fill(); c.stroke();

  // main highlight
  c.fillStyle = 'rgba(255,255,255,0.28)';
  c.beginPath(); c.ellipse(hx - hr * 0.28, hy - hr * 0.3, hr * 0.28, hr * 0.2, -0.5, 0, Math.PI * 2); c.fill();

  // side glint
  c.fillStyle = 'rgba(255,255,255,0.12)';
  c.beginPath(); c.ellipse(hx + hr * 0.42, hy + hr * 0.08, hr * 0.11, hr * 0.2, 0.3, 0, Math.PI * 2); c.fill();

  c.restore();
}

export function drawCat(c, x, y, type, sc, dir, bl) {
  if (type === 'orange') drawOrange(c, x, y, sc, dir, bl);
  else drawGray(c, x, y, sc, dir, bl);
}
