import { state } from '../state.js';
import { W } from '../constants.js';

let itemT = 0;

export function drawPoop(ct, x, y) {
  ct.save(); ct.translate(x, y);
  ct.fillStyle = '#5C3A1E'; ct.beginPath(); ct.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#6B4526'; ct.beginPath(); ct.ellipse(-1, -7, 9, 7, 0, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#7A5030'; ct.beginPath(); ct.ellipse(-0.5, -13, 6, 5.5, 0, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#8B5E38'; ct.beginPath(); ct.ellipse(0, -18, 3.5, 4, 0, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = 'rgba(255,255,255,0.25)'; ct.beginPath(); ct.ellipse(-2, -15, 1.5, 2, 0.4, 0, Math.PI * 2); ct.fill();
  ct.strokeStyle = 'rgba(180,160,0,0.55)'; ct.lineWidth = 1.5; ct.lineCap = 'round';
  ct.beginPath(); ct.moveTo(-8, -22); ct.bezierCurveTo(-12, -28, -4, -30, -8, -36); ct.stroke();
  ct.beginPath(); ct.moveTo(0, -24); ct.bezierCurveTo(4, -30, 0, -34, 4, -40); ct.stroke();
  ct.beginPath(); ct.moveTo(8, -20); ct.bezierCurveTo(12, -26, 6, -30, 10, -36); ct.stroke();
  ct.fillStyle = '#222'; ct.beginPath(); ct.arc(-6, -26, 1.5, 0, Math.PI * 2); ct.fill();
  ct.beginPath(); ct.arc(5, -32, 1.5, 0, Math.PI * 2); ct.fill();
  ct.restore();
}

export function drawMouse(ct, x, y, bob) {
  ct.save(); ct.translate(x, y); ct.rotate(Math.sin(bob * 0.003) * 0.15);
  ct.strokeStyle = '#B08060'; ct.lineWidth = 1.8; ct.lineCap = 'round';
  ct.beginPath(); ct.moveTo(14, 2); ct.bezierCurveTo(22, 8, 26, -4, 20, -10); ct.stroke();
  ct.fillStyle = '#C0C0C8'; ct.beginPath(); ct.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2); ct.fill();
  ct.strokeStyle = '#8888A0'; ct.lineWidth = 1; ct.stroke();
  ct.fillStyle = 'rgba(255,255,255,0.3)'; ct.beginPath(); ct.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#C0C0C8'; ct.beginPath(); ct.ellipse(-14, 0, 9, 8, 0, 0, Math.PI * 2); ct.fill();
  ct.strokeStyle = '#8888A0'; ct.lineWidth = 1; ct.stroke();
  ct.fillStyle = '#A0A0B0'; ct.beginPath(); ct.ellipse(-18, -8, 5, 6, 0.3, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#FFB0B8'; ct.beginPath(); ct.ellipse(-18, -8, 2.5, 3.5, 0.3, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#A0A0B0'; ct.beginPath(); ct.ellipse(-10, -9, 4, 5, -0.3, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#FFB0B8'; ct.beginPath(); ct.ellipse(-10, -9, 2, 3, -0.3, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#1A1A2A'; ct.beginPath(); ct.arc(-16, -1, 2.2, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#fff'; ct.beginPath(); ct.arc(-15.2, -1.8, 0.7, 0, Math.PI * 2); ct.fill();
  ct.fillStyle = '#FF8090'; ct.beginPath(); ct.ellipse(-22, 0, 2.5, 2, 0, 0, Math.PI * 2); ct.fill();
  ct.strokeStyle = 'rgba(255,255,255,0.7)'; ct.lineWidth = 0.8; ct.lineCap = 'round';
  [[-1, -2], [-1, 0], [-1, 2], [1, -2], [1, 0], [1, 2]].forEach(([dir, oy]) => {
    ct.beginPath(); ct.moveTo(-22 + dir * 2, oy); ct.lineTo(-22 + dir * 10, oy); ct.stroke();
  });
  ct.fillStyle = '#FFD840'; ct.beginPath(); ct.arc(6, -4, 4, 0, Math.PI * 2); ct.fill();
  ct.strokeStyle = '#B89000'; ct.lineWidth = 1; ct.stroke();
  ct.fillStyle = '#7A5800'; ct.font = 'bold 5px Arial'; ct.textAlign = 'center'; ct.fillText('!', 6, -3); ct.textAlign = 'left';
  ct.restore();
}

export function drawItems(ct) {
  itemT += 16;
  state.items.forEach(it => {
    if (it.hit) return;
    const sx = it.wx - state.smoothCamX;
    if (sx < -40 || sx > W + 40) return;
    const bob = it.onGnd ? 0 : Math.sin(itemT * 0.003 + it.bob) * 5;
    const sy = it.wy + bob;
    if (it.type === 'coin') {
      ct.fillStyle = '#FFD700'; ct.beginPath(); ct.arc(sx, sy, 10, 0, Math.PI * 2); ct.fill();
      ct.strokeStyle = '#A87800'; ct.lineWidth = 2; ct.stroke();
      ct.fillStyle = '#7A5000'; ct.font = 'bold 10px Arial'; ct.textAlign = 'center';
      ct.fillText('$', sx, sy + 4); ct.textAlign = 'left';
    } else if (it.type === 'bird') {
      const flap = Math.sin(itemT * 0.014 + it.bob) * 0.55;
      ct.save(); ct.translate(sx, sy);
      ct.fillStyle = '#5AAAF0';
      ct.save(); ct.rotate(flap);
      ct.beginPath(); ct.moveTo(0, 0); ct.bezierCurveTo(-5, -11, -18, -9, -19, 0); ct.bezierCurveTo(-16, 5, -5, 4, 0, 2); ct.closePath(); ct.fill();
      ct.restore();
      ct.save(); ct.scale(-1, 1); ct.rotate(flap);
      ct.beginPath(); ct.moveTo(0, 0); ct.bezierCurveTo(-5, -11, -18, -9, -19, 0); ct.bezierCurveTo(-16, 5, -5, 4, 0, 2); ct.closePath(); ct.fill();
      ct.restore();
      ct.fillStyle = '#2860B0'; ct.beginPath(); ct.moveTo(-8, 3); ct.lineTo(-18, 8); ct.lineTo(-11, 1); ct.closePath(); ct.fill();
      ct.fillStyle = '#3A80D0'; ct.beginPath(); ct.ellipse(0, 0, 10, 7, 0, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#FFB020'; ct.beginPath(); ct.moveTo(9, -1); ct.lineTo(17, 1); ct.lineTo(9, 3); ct.closePath(); ct.fill();
      ct.fillStyle = '#111'; ct.beginPath(); ct.arc(5, -2, 2, 0, Math.PI * 2); ct.fill();
      ct.fillStyle = '#fff'; ct.beginPath(); ct.arc(5.7, -2.5, 0.7, 0, Math.PI * 2); ct.fill();
      ct.restore();
    } else if (it.type === 'mouse') {
      drawMouse(ct, sx, sy, itemT + it.bob * 1000);
    } else if (it.type === 'spring') {
      ct.fillStyle = '#2090D8'; ct.beginPath(); ct.roundRect(sx - 13, sy - 11, 26, 22, 6); ct.fill();
      ct.strokeStyle = '#fff'; ct.lineWidth = 3; ct.lineCap = 'round';
      ct.beginPath(); ct.moveTo(sx - 7, sy + 5); ct.lineTo(sx, sy - 6); ct.lineTo(sx + 7, sy + 5); ct.stroke();
    } else if (it.type === 'poop') {
      drawPoop(ct, sx, it.wy);
    }
  });
}

export function drawSparks(ct) {
  state.sparks = state.sparks.filter(p => p.life > 0);
  state.sparks.forEach(p => {
    ct.globalAlpha = (p.life / p.ml) * (p.life / p.ml);
    ct.fillStyle = p.c; ct.beginPath(); ct.arc(p.x - state.smoothCamX, p.y, p.r, 0, Math.PI * 2); ct.fill();
    p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.r *= 0.94; p.life--;
  });
  ct.globalAlpha = 1;
}
