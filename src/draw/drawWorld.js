import { state } from '../state.js';
import { W, H, FL, ZONES, CLOUDS, STARS, RAMP_BASE_X } from '../constants.js';
import { rgbStr, lerpColor } from '../colors.js';

export function drawBG(ct) {
  const grad = ct.createLinearGradient(0, 0, 0, FL);
  grad.addColorStop(0, rgbStr(state.curSky));
  grad.addColorStop(1, rgbStr(state.curHor));
  ct.fillStyle = grad; ct.fillRect(0, 0, W, H);

  const z = ZONES[state.currentZone];

  if (z.type === 'meadow' || z.type === 'desert') {
    const sc = z.type === 'desert' ? '#FF8800' : '#FFE020';
    ct.fillStyle = sc; ct.beginPath(); ct.arc(W - 65, 55, 28, 0, Math.PI * 2); ct.fill();
    ct.fillStyle = z.type === 'desert' ? 'rgba(255,160,0,0.3)' : 'rgba(255,240,80,0.28)';
    ct.beginPath(); ct.arc(W - 65, 55, 42, 0, Math.PI * 2); ct.fill();
    ct.strokeStyle = z.type === 'desert' ? '#CC6600' : '#FFCC00';
    ct.lineWidth = 2.5; ct.lineCap = 'round';
    for (let a = 0; a < 8; a++) {
      const ag = a / 8 * Math.PI * 2;
      ct.beginPath(); ct.moveTo(W - 65 + Math.cos(ag) * 34, 55 + Math.sin(ag) * 34);
      ct.lineTo(W - 65 + Math.cos(ag) * 46, 55 + Math.sin(ag) * 46); ct.stroke();
    }
  }

  if (z.type === 'meadow') {
    CLOUDS.forEach(cl => {
      const ox = ((cl.bx - state.smoothCamX * 0.12) % (W + 150) + W + 150) % (W + 150) - 75;
      ct.fillStyle = 'rgba(255,255,255,0.88)';
      ct.beginPath(); ct.ellipse(ox, cl.by, cl.rx, cl.ry, 0, 0, Math.PI * 2); ct.fill();
      ct.beginPath(); ct.ellipse(ox + cl.rx * 0.45, cl.by - cl.ry * 0.5, cl.rx * 0.62, cl.ry * 0.72, 0, 0, Math.PI * 2); ct.fill();
      ct.beginPath(); ct.ellipse(ox - cl.rx * 0.38, cl.by - cl.ry * 0.3, cl.rx * 0.52, cl.ry * 0.65, 0, 0, Math.PI * 2); ct.fill();
    });
  }

  if (z.type === 'desert') {
    ct.strokeStyle = 'rgba(255,200,60,0.18)'; ct.lineWidth = 3;
    const t = state.blinkT * 0.04;
    ct.beginPath();
    for (let x = 0; x < W; x += 4) ct.lineTo(x, FL - 6 + Math.sin(x * 0.04 + t) * 3);
    ct.stroke();
    ct.fillStyle = 'rgba(180,120,30,0.28)';
    [[50, FL - 45, 80], [300, FL - 60, 60], [550, FL - 40, 90]].forEach(([mx, my, mw]) => {
      const sx = ((mx - state.smoothCamX * 0.25) % (W + 200) + W + 200) % (W + 200) - 100;
      ct.beginPath(); ct.moveTo(sx - mw, FL); ct.lineTo(sx - mw * 0.4, my);
      ct.lineTo(sx + mw * 0.4, my); ct.lineTo(sx + mw, FL); ct.closePath(); ct.fill();
    });
  }

  if (z.type === 'arctic') {
    ct.fillStyle = 'rgba(240,248,255,0.72)'; ct.beginPath(); ct.arc(120, 58, 24, 0, Math.PI * 2); ct.fill();
    ct.fillStyle = 'rgba(200,230,255,0.38)'; ct.beginPath(); ct.arc(120, 58, 36, 0, Math.PI * 2); ct.fill();
    CLOUDS.slice(0, 3).forEach(cl => {
      const ox = ((cl.bx - state.smoothCamX * 0.1) % (W + 150) + W + 150) % (W + 150) - 75;
      ct.fillStyle = 'rgba(220,235,255,0.52)';
      ct.beginPath(); ct.ellipse(ox, cl.by + 10, cl.rx * 0.9, cl.ry * 0.7, 0, 0, Math.PI * 2); ct.fill();
    });
  }

  if (z.type === 'night') {
    STARS.forEach(s => {
      const bri = 0.35 + Math.sin(state.blinkT * 0.03 + s.phase) * 0.25;
      ct.fillStyle = `rgba(255,255,255,${bri})`; ct.beginPath(); ct.arc(s.x, s.y, s.r, 0, Math.PI * 2); ct.fill();
    });
    ct.fillStyle = 'rgba(255,252,220,0.88)'; ct.beginPath(); ct.arc(130, 62, 26, 0, Math.PI * 2); ct.fill();
    ct.fillStyle = rgbStr(state.curSky); ct.beginPath(); ct.arc(148, 54, 20, 0, Math.PI * 2); ct.fill();
  }

  if (z.type === 'storm') {
    [[70, 38, 88, 32], [260, 52, 110, 38], [460, 36, 80, 28], [610, 50, 92, 34]].forEach(([bx, by, rx, ry]) => {
      const ox = ((bx - state.smoothCamX * 0.11) % (W + 150) + W + 150) % (W + 150) - 75;
      ct.fillStyle = 'rgba(40,46,56,0.8)';
      ct.beginPath(); ct.ellipse(ox, by, rx, ry, 0, 0, Math.PI * 2); ct.fill();
      ct.beginPath(); ct.ellipse(ox + rx * 0.38, by - ry * 0.42, rx * 0.62, ry * 0.72, 0, 0, Math.PI * 2); ct.fill();
    });
    if (state.blinkT % 90 < 3) {
      const lx = 120 + Math.random() * 460;
      ct.strokeStyle = 'rgba(255,255,180,0.9)'; ct.lineWidth = 1.5;
      ct.beginPath(); ct.moveTo(lx, 0); ct.lineTo(lx - 12, 70); ct.lineTo(lx + 8, 70); ct.lineTo(lx - 18, 160); ct.stroke();
      ct.globalAlpha = 0.1; ct.fillStyle = '#FFFF88'; ct.fillRect(0, 0, W, H); ct.globalAlpha = 1;
    }
  }

  if (z.type === 'space') {
    STARS.forEach(s => {
      const bri = 0.25 + Math.sin(state.blinkT * 0.02 + s.phase) * 0.2;
      ct.fillStyle = `rgba(255,255,255,${bri})`; ct.beginPath(); ct.arc(s.x, s.y, s.r, 0, Math.PI * 2); ct.fill();
    });
    ct.fillStyle = '#3A5A9A'; ct.beginPath(); ct.arc(560, 75, 34, 0, Math.PI * 2); ct.fill();
    ct.fillStyle = 'rgba(60,80,120,0.5)'; ct.beginPath(); ct.ellipse(545, 65, 20, 16, 0, 0, Math.PI * 2); ct.fill();
    ct.strokeStyle = 'rgba(80,120,180,0.4)'; ct.lineWidth = 8;
    ct.beginPath(); ct.ellipse(560, 75, 58, 13, -0.28, 0, Math.PI * 2); ct.stroke();
  }

  if (z.type === 'alien') {
    STARS.forEach(s => {
      const bri = 0.2 + Math.sin(state.blinkT * 0.025 + s.phase) * 0.15;
      ct.fillStyle = `rgba(140,255,140,${bri})`; ct.beginPath(); ct.arc(s.x, s.y, s.r, 0, Math.PI * 2); ct.fill();
    });
    [[80, 70, 38], [280, 100, 32], [500, 55, 42], [620, 130, 28]].forEach(([bx, by, sz]) => {
      const ox = ((bx - state.smoothCamX * 0.07) % (W + 160) + W + 160) % (W + 160) - 80;
      const bob = Math.sin(state.blinkT * 0.018 + bx) * 5;
      const sy = by + bob;
      ct.fillStyle = '#2A6A2A'; ct.beginPath(); ct.ellipse(ox, sy, sz, sz * 1.35, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#40A040'; ct.beginPath(); ct.ellipse(ox, sy, sz * 0.85, sz * 1.2, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = 'rgba(80,200,80,0.18)'; ct.beginPath(); ct.ellipse(ox, sy, sz * 1.3, sz * 1.7, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#050805'; ct.beginPath(); ct.ellipse(ox - sz * 0.32, sy - sz * 0.05, sz * 0.32, sz * 0.22, -0.3, 0, Math.PI * 2); ct.fill();
      ct.beginPath(); ct.ellipse(ox + sz * 0.32, sy - sz * 0.05, sz * 0.32, sz * 0.22, 0.3, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = 'rgba(120,255,120,0.35)'; ct.beginPath(); ct.ellipse(ox - sz * 0.28, sy - sz * 0.1, sz * 0.1, sz * 0.08, 0, 0, Math.PI * 2); ct.fill();
      ct.beginPath(); ct.ellipse(ox + sz * 0.36, sy - sz * 0.1, sz * 0.1, sz * 0.08, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#1A3A1A'; ct.beginPath(); ct.ellipse(ox, sy + sz * 0.6, sz * 0.4, sz * 0.18, 0, 0, Math.PI * 2); ct.fill();
    });
  }

  if (z.type === 'ufo') {
    STARS.forEach(s => {
      const bri = 0.15 + Math.sin(state.blinkT * 0.02 + s.phase) * 0.12;
      ct.fillStyle = `rgba(200,200,255,${bri})`; ct.beginPath(); ct.arc(s.x, s.y, s.r, 0, Math.PI * 2); ct.fill();
    });
    [[70, 55], [290, 85], [480, 45], [610, 100]].forEach(([bx, by]) => {
      const ox = ((bx - state.smoothCamX * 0.08) % (W + 200) + W + 200) % (W + 200) - 100;
      const bob = Math.sin(state.blinkT * 0.016 + bx * 0.01) * 7;
      const sy = by + bob;
      const beamAlpha = 0.06 + Math.sin(state.blinkT * 0.04 + bx) * 0.03;
      ct.fillStyle = `rgba(100,255,100,${beamAlpha})`;
      ct.beginPath(); ct.moveTo(ox - 14, sy + 12); ct.lineTo(ox - 50, FL); ct.lineTo(ox + 50, FL); ct.lineTo(ox + 14, sy + 12); ct.closePath(); ct.fill();
      ct.fillStyle = '#606070'; ct.beginPath(); ct.ellipse(ox, sy + 6, 42, 11, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#909098'; ct.beginPath(); ct.ellipse(ox, sy + 4, 38, 9, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#50A050'; ct.beginPath(); ct.ellipse(ox, sy - 7, 19, 14, 0, Math.PI, Math.PI * 2); ct.fill();
      ct.fillStyle = 'rgba(160,255,160,0.35)'; ct.beginPath(); ct.ellipse(ox - 5, sy - 10, 7, 5, -0.3, 0, Math.PI * 2); ct.fill();
      const lit = Math.floor(state.blinkT / 12) % 5;
      [-26, -13, 0, 13, 26].forEach((lx, li) => {
        ct.fillStyle = li === lit ? '#FFD700' : '#444';
        ct.beginPath(); ct.arc(ox + lx, sy + 10, 2.5, 0, Math.PI * 2); ct.fill();
      });
    });
  }

  if (z.type === 'planet') {
    STARS.forEach(s => {
      ct.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(state.blinkT * 0.015 + s.phase) * 0.15})`; ct.beginPath(); ct.arc(s.x, s.y, s.r, 0, Math.PI * 2); ct.fill();
    });
    [
      { bx: 90,  by: 90,  r: 54, col: '#8B3A20', ring: true,  ringCol: 'rgba(180,130,60,0.55)' },
      { bx: 420, by: 70,  r: 38, col: '#204880', ring: false, ringCol: '' },
      { bx: 560, by: 115, r: 28, col: '#1A6A30', ring: false, ringCol: '' },
      { bx: 230, by: 130, r: 22, col: '#602880', ring: false, ringCol: '' },
    ].forEach(p => {
      const ox = ((p.bx - state.smoothCamX * 0.04) % (W + 300) + W + 300) % (W + 300) - 150;
      ct.fillStyle = p.col; ct.beginPath(); ct.arc(ox, p.by, p.r, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = 'rgba(255,255,255,0.12)'; ct.beginPath(); ct.ellipse(ox - p.r * 0.28, p.by - p.r * 0.28, p.r * 0.42, p.r * 0.32, -0.5, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = 'rgba(0,0,0,0.28)'; ct.beginPath(); ct.ellipse(ox + p.r * 0.18, p.by + p.r * 0.12, p.r * 0.65, p.r * 0.75, 0.3, 0, Math.PI * 2); ct.fill();
      if (p.ring) {
        ct.save(); ct.strokeStyle = p.ringCol; ct.lineWidth = 9;
        ct.beginPath(); ct.ellipse(ox, p.by, p.r * 1.75, p.r * 0.32, -0.18, 0, Math.PI * 2); ct.stroke();
        ct.strokeStyle = 'rgba(140,100,40,0.3)'; ct.lineWidth = 5;
        ct.beginPath(); ct.ellipse(ox, p.by, p.r * 2.1, p.r * 0.38, -0.18, 0, Math.PI * 2); ct.stroke();
        ct.restore();
      }
    });
  }

  if (Math.abs(state.windX) > 0.01) {
    ct.fillStyle = 'rgba(255,255,255,0.32)'; ct.font = '12px Arial'; ct.textAlign = 'center';
    ct.fillText(state.windX > 0 ? '▶▶ wind' : '◀◀ wind', W / 2, H - 8);
    ct.textAlign = 'left';
  }
}

export function drawGround(ct) {
  ct.fillStyle = rgbStr(state.curGnd); ct.fillRect(0, FL, W, H - FL);
  ct.fillStyle = rgbStr(lerpColor(state.curGnd, { r:0, g:0, b:0 }, 0.3)); ct.fillRect(0, FL, W, 6);

  const z = ZONES[state.currentZone];
  if (z.type === 'meadow') {
    ct.fillStyle = rgbStr(lerpColor(state.curGnd, { r:255, g:255, b:255 }, 0.2));
    for (let g = 0; g < 26; g++) {
      const gx = ((g * 400 - state.smoothCamX) % (W + 60) + W + 60) % (W + 60) - 30;
      ct.beginPath(); ct.moveTo(gx, FL); ct.quadraticCurveTo(gx + 3, FL - 14, gx + 6, FL); ct.fill();
      ct.beginPath(); ct.moveTo(gx + 8, FL); ct.quadraticCurveTo(gx + 11, FL - 10, gx + 14, FL); ct.fill();
    }
  } else if (z.type === 'desert') {
    ct.strokeStyle = 'rgba(160,110,20,0.35)'; ct.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const gx = (i * 95 - state.smoothCamX * 0.15) % (W + 100);
      ct.beginPath(); ct.moveTo(gx, FL + 5); ct.quadraticCurveTo(gx + 20, FL + 2, gx + 42, FL + 5); ct.stroke();
    }
  } else if (z.type === 'arctic') {
    for (let i = 0; i < 8; i++) {
      const gx = (i * 90 - state.smoothCamX * 0.1) % (W + 90);
      ct.fillStyle = 'rgba(220,240,255,0.55)'; ct.beginPath(); ct.ellipse(gx, FL, 36, 11, 0, 0, Math.PI * 2); ct.fill();
    }
  } else {
    ct.strokeStyle = 'rgba(255,255,255,0.05)'; ct.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const gx = (i * 150 - state.smoothCamX * 0.06) % (W + 120);
      ct.beginPath(); ct.moveTo(gx, FL + 4); ct.lineTo(gx + 28, FL + 12); ct.lineTo(gx + 56, FL + 5); ct.stroke();
    }
  }

  ct.setLineDash([3, 6]);
  for (let m = 250; m < 18000; m += 250) {
    const sx = m * 5 + RAMP_BASE_X - state.smoothCamX;
    if (sx < -5 || sx > W + 5) continue;
    ct.strokeStyle = 'rgba(255,255,255,0.15)'; ct.lineWidth = 1;
    ct.beginPath(); ct.moveTo(sx, FL - 22); ct.lineTo(sx, FL); ct.stroke();
    ct.fillStyle = 'rgba(255,255,255,0.35)'; ct.font = '10px Arial'; ct.textAlign = 'center';
    ct.fillText(m + ' ft', sx, FL - 24); ct.textAlign = 'left';
  }
  ct.setLineDash([]);

  ZONES.forEach(z => {
    if (z.ft > 0) {
      const sx = z.ft * 5 + RAMP_BASE_X - state.smoothCamX;
      if (sx > 0 && sx < W) {
        ct.strokeStyle = 'rgba(255,255,255,0.18)'; ct.lineWidth = 1.5; ct.setLineDash([8, 6]);
        ct.beginPath(); ct.moveTo(sx, 0); ct.lineTo(sx, H); ct.stroke();
        ct.setLineDash([]);
        ct.fillStyle = 'rgba(255,255,255,0.35)'; ct.font = '11px Arial'; ct.textAlign = 'center';
        ct.fillText(z.name, sx, 16); ct.textAlign = 'left';
      }
    }
  });
}
