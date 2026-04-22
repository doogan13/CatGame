import { state } from '../state.js';
import { RAMP_BASE_X, RAMP_BASE_Y, RAMP_LEN, FL } from '../constants.js';
import { maxPow, catR } from '../upgrades.js';
import { drawCat } from './drawCat.js';

export function getRampTip() {
  return {
    x: RAMP_BASE_X + Math.cos(-state.rampAngle) * RAMP_LEN,
    y: RAMP_BASE_Y + Math.sin(-state.rampAngle) * RAMP_LEN,
  };
}

export function getSledPos(t) {
  return {
    x: RAMP_BASE_X + Math.cos(-state.rampAngle) * RAMP_LEN * t,
    y: RAMP_BASE_Y + Math.sin(-state.rampAngle) * RAMP_LEN * t,
  };
}

export function drawRocketSled(ct, sx, sy, ang, thrust, withCat) {
  ct.save(); ct.translate(sx, sy); ct.rotate(-ang);
  if (thrust > 0) {
    const fl = 0.8 + Math.random() * 0.2, flen = (40 + thrust * 55) * fl;
    const g = ct.createRadialGradient(-44, 0, 2, -44, 0, 28);
    g.addColorStop(0, 'rgba(255,255,200,0.95)');
    g.addColorStop(0.3, 'rgba(255,150,0,0.85)');
    g.addColorStop(0.7, 'rgba(255,50,0,0.5)');
    g.addColorStop(1, 'rgba(255,0,0,0)');
    ct.fillStyle = g;
    ct.beginPath(); ct.moveTo(-28, 8); ct.bezierCurveTo(-28 - flen * 0.4, 14, -28 - flen * 0.8, 6, -28 - flen, 0); ct.bezierCurveTo(-28 - flen * 0.8, -6, -28 - flen * 0.4, -14, -28, -8); ct.closePath(); ct.fill();
  }
  ct.fillStyle = '#CC2820'; ct.beginPath(); ct.roundRect(-28, -14, 70, 28, 6); ct.fill();
  ct.strokeStyle = '#881810'; ct.lineWidth = 2; ct.stroke();
  ct.fillStyle = 'rgba(255,100,80,0.3)'; ct.beginPath(); ct.roundRect(-26, -12, 66, 12, 4); ct.fill();
  ct.fillStyle = '#FFD700';
  [[-20, -10], [-20, 10], [30, -10], [30, 10]].forEach(([rx, ry]) => { ct.beginPath(); ct.arc(rx, ry, 2.5, 0, Math.PI * 2); ct.fill(); });
  ct.fillStyle = '#FF6040'; ct.beginPath(); ct.moveTo(42, -10); ct.lineTo(62, 0); ct.lineTo(42, 10); ct.closePath(); ct.fill();
  ct.strokeStyle = '#CC3020'; ct.lineWidth = 1.5; ct.stroke();
  [-9, 9].forEach(ry => {
    ct.fillStyle = '#444466'; ct.beginPath(); ct.roundRect(-44, ry - 5, 22, 10, 4); ct.fill();
    ct.strokeStyle = '#222244'; ct.lineWidth = 1.5; ct.stroke();
    ct.fillStyle = '#CC2820';
    ct.beginPath(); ct.moveTo(-44, ry - 5); ct.lineTo(-50, ry - 12); ct.lineTo(-40, ry - 5); ct.closePath(); ct.fill();
    ct.beginPath(); ct.moveTo(-44, ry + 5); ct.lineTo(-50, ry + 12); ct.lineTo(-40, ry + 5); ct.closePath(); ct.fill();
  });
  ct.strokeStyle = '#888'; ct.lineWidth = 4; ct.lineCap = 'round'; ct.beginPath(); ct.moveTo(-26, 14); ct.lineTo(40, 14); ct.stroke();
  if (withCat) {
    ct.strokeStyle = 'rgba(80,40,0,0.6)'; ct.lineWidth = 3;
    ct.beginPath(); ct.moveTo(-10, -14); ct.lineTo(-10, 14); ct.stroke();
    ct.beginPath(); ct.moveTo(10, -14); ct.lineTo(10, 14); ct.stroke();
    ct.fillStyle = '#FFD700';
    ct.beginPath(); ct.roundRect(-13, -4, 6, 8, 2); ct.fill();
    ct.beginPath(); ct.roundRect(7, -4, 6, 8, 2); ct.fill();
    drawCat(ct, 8, -16, state.catType, state.catType === 'orange' ? 0.72 : 0.55, 1, false);
  }
  ct.restore();
}

export function drawRamp(ct) {
  const tip = getRampTip();
  for (let i = 0; i < 8; i++) {
    const t0 = i / 8, t1 = (i + 1) / 8;
    const x0 = RAMP_BASE_X + Math.cos(-state.rampAngle) * RAMP_LEN * t0;
    const y0 = RAMP_BASE_Y + Math.sin(-state.rampAngle) * RAMP_LEN * t0;
    const x1 = RAMP_BASE_X + Math.cos(-state.rampAngle) * RAMP_LEN * t1;
    const y1 = RAMP_BASE_Y + Math.sin(-state.rampAngle) * RAMP_LEN * t1;
    ct.fillStyle = i % 2 === 0 ? '#8B6040' : '#7A5030';
    const perp = { x: Math.sin(-state.rampAngle) * 8, y: -Math.cos(-state.rampAngle) * 8 };
    ct.beginPath();
    ct.moveTo(x0 - perp.x, y0 - perp.y); ct.lineTo(x1 - perp.x, y1 - perp.y);
    ct.lineTo(x1 + perp.x, y1 + perp.y); ct.lineTo(x0 + perp.x, y0 + perp.y);
    ct.closePath(); ct.fill();
  }
  ct.strokeStyle = '#5A3818'; ct.lineWidth = 5; ct.lineCap = 'round';
  ct.beginPath(); ct.moveTo(RAMP_BASE_X, RAMP_BASE_Y); ct.lineTo(tip.x, tip.y); ct.stroke();
  const ro = 6, rx = Math.sin(-state.rampAngle) * ro, ry2 = -Math.cos(-state.rampAngle) * ro;
  [[1], [-1]].forEach(([s]) => {
    ct.strokeStyle = '#AAA'; ct.lineWidth = 3; ct.beginPath();
    ct.moveTo(RAMP_BASE_X + rx * s, RAMP_BASE_Y + ry2 * s);
    ct.lineTo(tip.x + rx * s, tip.y + ry2 * s); ct.stroke();
  });
  ct.fillStyle = '#5A4030'; ct.beginPath(); ct.roundRect(RAMP_BASE_X - 12, RAMP_BASE_Y - 8, 28, 20, 4); ct.fill();
  ct.fillStyle = '#888'; ct.beginPath(); ct.arc(RAMP_BASE_X, RAMP_BASE_Y, 8, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#CCC'; ct.beginPath(); ct.arc(RAMP_BASE_X, RAMP_BASE_Y, 4, 0, Math.PI * 2); ct.fill();
  const mx = RAMP_BASE_X + Math.cos(-state.rampAngle) * RAMP_LEN * 0.55;
  const my = RAMP_BASE_Y + Math.sin(-state.rampAngle) * RAMP_LEN * 0.55;
  ct.strokeStyle = '#5A4030'; ct.lineWidth = 8; ct.lineCap = 'round';
  ct.beginPath(); ct.moveTo(mx, my); ct.lineTo(mx + 18, RAMP_BASE_Y + 2); ct.stroke();
  ct.strokeStyle = '#8A7050'; ct.lineWidth = 5;
  ct.beginPath(); ct.moveTo(mx, my); ct.lineTo(mx + 18, RAMP_BASE_Y + 2); ct.stroke();
}

export function drawAimUI(ct) {
  if (state.phase === 'angle') {
    let tx = getRampTip().x, ty = getRampTip().y;
    let tvx = Math.cos(state.rampAngle) * maxPow() * 0.38;
    let tvy = -Math.sin(state.rampAngle) * maxPow() * 0.38;
    ct.fillStyle = 'rgba(255,255,100,0.4)';
    for (let i = 0; i < 24; i++) {
      tx += tvx; ty += tvy; tvy += 0.32; tvx *= 0.99;
      if (ty > FL) break;
      if (i % 2 === 0) { ct.beginPath(); ct.arc(tx, ty, 3, 0, Math.PI * 2); ct.fill(); }
    }
    ct.fillStyle = 'rgba(255,255,255,0.75)'; ct.font = 'bold 13px Arial'; ct.textAlign = 'center';
    ct.fillText('click to lock angle · ' + Math.round(state.rampAngle * (180 / Math.PI)) + '°', RAMP_BASE_X + RAMP_LEN * 0.5, FL + 36);
    ct.textAlign = 'left';
  }
  if (state.phase === 'power') {
    const bx = RAMP_BASE_X + 40, by = FL + 14, bw = 140, bh = 20;
    ct.fillStyle = 'rgba(0,0,0,0.45)'; ct.beginPath(); ct.roundRect(bx, by, bw, bh, 8); ct.fill();
    ct.fillStyle = `hsl(${120 - state.powVal * 120},100%,50%)`;
    ct.beginPath(); ct.roundRect(bx + 2, by + 2, (bw - 4) * state.powVal, bh - 4, 6); ct.fill();
    ct.fillStyle = '#fff'; ct.font = 'bold 11px Arial'; ct.textAlign = 'center';
    ct.fillText('FUEL ' + Math.round(state.powVal * 100) + '%', bx + bw / 2, by + 14);
    ct.textAlign = 'left';
    ct.fillStyle = 'rgba(255,255,255,0.7)'; ct.font = 'bold 13px Arial'; ct.textAlign = 'center';
    ct.fillText('release to ignite!', bx + bw / 2, by - 5);
    ct.textAlign = 'left';
  }
}
