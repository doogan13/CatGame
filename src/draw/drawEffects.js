import { state } from '../state.js';
import { catR } from '../upgrades.js';

export function drawTrail(ct) {
  state.trails = state.trails.filter(t => t.life > 0);
  state.trails.forEach((t, i) => {
    ct.globalAlpha = (t.life / t.ml) * 0.22 * (i / state.trails.length);
    ct.fillStyle = '#FFD080';
    ct.beginPath();
    ct.arc(t.x - state.smoothCamX, t.y, catR() * 0.55 * (t.life / t.ml), 0, Math.PI * 2);
    ct.fill();
    t.life--;
  });
  ct.globalAlpha = 1;
}
