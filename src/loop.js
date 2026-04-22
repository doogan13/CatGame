import { state } from './state.js';
import { RAMP_MIN, RAMP_MAX, RAMP_SPEED, POW_SPEED, FL, W, H, RAMP_BASE_X } from './constants.js';
import { ZONES } from './constants.js';
import { maxPow, boostMax, catR } from './upgrades.js';
import { hexToRgb } from './colors.js';
import { physics, burst } from './physics.js';
import { mkItems } from './entities.js';
import { setMsg, updHUD, updBoosts, showDoneBtn, hideDoneBtn } from './ui.js';
import { drawCat } from './draw/drawCat.js';
import { drawBG, drawGround } from './draw/drawWorld.js';
import { drawRamp, drawRocketSled, drawAimUI, getSledPos, getRampTip } from './draw/drawRamp.js';
import { drawTrail } from './draw/drawEffects.js';
import { drawItems, drawSparks } from './draw/drawItems.js';

const cv = document.getElementById('c');
const ct = cv.getContext('2d');

export function beginRun() {
  state.gameState = 'aim';
  state.phase = 'angle';
  state.rampAngle = RAMP_MIN;
  state.rampDir = 1;
  state.powVal = 0;
  state.powDir = 1;
  state.sledT = 0;
  state.sledV = 0;
  state.camX = 0;
  state.smoothCamX = 0;
  state.runDist = 0;
  state.sparks = [];
  state.trails = [];
  state.blinkT = 0;
  state.onGround = false;
  state.currentZone = 0;
  state.windX = 0;
  state.windTarget = 0;
  state.displaySpeed = 0;
  document.getElementById('zonetag').style.opacity = '0';
  hideDoneBtn();
  state.curSky = hexToRgb(ZONES[0].sky);
  state.curGnd = hexToRgb(ZONES[0].gnd);
  state.curHor = hexToRgb(ZONES[0].hor);
  state.boostLeft = boostMax();
  mkItems();
  setMsg('Click To Lock Angle');
  updBoosts();
  updHUD();
  if (state.raf) cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(loop);
}

export function doFire() {
  state.sledT = 0;
  state.sledV = 0;
  state.phase = 'launching';
}

export function loop() {
  state.blinkT++;
  ct.setTransform(state.renderScale, 0, 0, state.renderScale, 0, 0);

  if (state.gameState === 'aim') {
    if (state.phase === 'angle') {
      state.rampAngle += RAMP_SPEED * state.rampDir;
      if (state.rampAngle >= RAMP_MAX) { state.rampAngle = RAMP_MAX; state.rampDir = -1; }
      if (state.rampAngle <= RAMP_MIN) { state.rampAngle = RAMP_MIN; state.rampDir = 1; }
    }
    if (state.phase === 'power') {
      state.powVal += POW_SPEED * state.powDir;
      if (state.powVal >= 1) { state.powVal = 1; state.powDir = -1; }
      if (state.powVal <= 0) { state.powVal = 0; state.powDir = 1; }
    }
    if (state.phase === 'launching') {
      const ms = 0.022 + state.powVal * 0.018;
      state.sledV += 0.0006;
      if (state.sledV > ms) state.sledV = ms;
      state.sledT += state.sledV;
      const sp = getSledPos(Math.min(state.sledT, 1.0));
      if (state.sledT > 0.2) burst(sp.x, sp.y, '#FF8000', 2, 1.5 + state.sledV * 30);
      if (state.sledT >= 1.0) {
        const tip = getRampTip();
        const power = maxPow() * (0.3 + state.powVal * 0.7);
        state.px = tip.x + Math.cos(state.rampAngle) * 20;
        state.py = tip.y - Math.sin(state.rampAngle) * 20 - catR();
        state.pvx = Math.cos(state.rampAngle) * power;
        state.pvy = -Math.sin(state.rampAngle) * power;
        state.gameState = 'flying';
        state.onGround = false;
        burst(tip.x, tip.y, '#FFE040', 28, 8);
        burst(tip.x, tip.y, '#FF6000', 16, 6);
        setMsg('Click To Boost · Space To Ground Smash!');
        updBoosts();
        state.raf = requestAnimationFrame(loop);
        return;
      }
    }
  }

  physics(updHUD, showDoneBtn);

  ct.clearRect(0, 0, W, H);
  drawBG(ct);
  drawGround(ct);

  if (state.gameState === 'aim') {
    drawRamp(ct);
    if (state.phase === 'launching') {
      const sp = getSledPos(Math.min(state.sledT, 1.0));
      drawRocketSled(ct, sp.x, sp.y, state.rampAngle, state.sledV * 30, true);
    } else {
      const sp = getSledPos(0.15);
      const thrust = state.phase === 'power' ? state.powVal * 0.25 : 0;
      drawRocketSled(ct, sp.x, sp.y, state.rampAngle, thrust, true);
    }
    drawAimUI(ct);
  }

  drawTrail(ct);
  drawItems(ct);
  drawSparks(ct);

  if (state.gameState === 'flying' || state.gameState === 'done') {
    const va = Math.atan2(state.pvy, state.pvx);
    ct.save();
    ct.translate(state.px - state.smoothCamX, state.py);
    ct.rotate(va * 0.18);
    drawCat(ct, 0, 0, state.catType,
      state.catType === 'orange' ? 0.9 : 0.68,
      state.pvx > 0.1 ? 1 : -1,
      state.blinkT % 130 < 4);
    ct.restore();
  }

  if (state.boostFlash > 0) {
    ct.globalAlpha = state.boostFlash / 20;
    ct.fillStyle = '#FF8800';
    ct.fillRect(0, 0, W, H);
    ct.globalAlpha = 1;
    state.boostFlash--;
  }

  if (state.gameState !== 'done' && state.gameState !== 'shop' && state.gameState !== 'select') {
    state.raf = requestAnimationFrame(loop);
  }
}
