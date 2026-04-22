import { state } from './state.js';
import { ZONES } from './constants.js';

export function hexToRgb(h) {
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  };
}

export function lerpColor(a, b, t) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

export function rgbStr(c) {
  return `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`;
}

export function updateZoneColors() {
  const z = ZONES[state.currentZone];
  state.curSky = lerpColor(state.curSky, hexToRgb(z.sky), 0.025);
  state.curGnd = lerpColor(state.curGnd, hexToRgb(z.gnd), 0.025);
  state.curHor = lerpColor(state.curHor, hexToRgb(z.hor), 0.025);
}

export function checkZone() {
  const zoneTag = document.getElementById('zonetag');
  let z = 0;
  for (let i = 0; i < ZONES.length; i++) {
    if (state.runDist >= ZONES[i].ft) z = i;
  }
  if (z !== state.currentZone) {
    state.currentZone = z;
    zoneTag.textContent = ZONES[z].name;
    zoneTag.style.opacity = '1';
    state.zoneTagTimer = 140;
    if (['desert', 'storm', 'arctic'].includes(ZONES[z].type)) {
      state.windTarget = (Math.random() - 0.5) * 0.14;
    } else {
      state.windTarget = 0;
    }
  }
  if (state.zoneTagTimer > 0) {
    state.zoneTagTimer--;
    if (state.zoneTagTimer === 0) zoneTag.style.opacity = '0';
  }
  state.windX += (state.windTarget - state.windX) * 0.015;
  updateZoneColors();
}
