import { state } from './state.js';
import { GAME_W, GAME_H, ZONES } from './constants.js';
import { hexToRgb } from './colors.js';
import { initShop, renderCatPreviews, initNameInput, initNewGameBtn } from './ui.js';
import { beginRun } from './loop.js';
import { initInput } from './input.js';

const cv = document.getElementById('c');
const wrap = document.getElementById('wrap');

function scaleToWindow() {
  const scale = Math.min(window.innerWidth / GAME_W, window.innerHeight / GAME_H);
  const dpr = window.devicePixelRatio || 1;
  state.renderScale = scale * dpr;
  cv.width  = Math.round(GAME_W * state.renderScale);
  cv.height = Math.round(GAME_H * state.renderScale);
  cv.style.width  = GAME_W + 'px';
  cv.style.height = GAME_H + 'px';
  wrap.style.transform = `scale(${scale})`;
  renderCatPreviews();
}
scaleToWindow();
window.addEventListener('resize', scaleToWindow);
window.addEventListener('orientationchange', () => setTimeout(scaleToWindow, 100));

document.getElementById('fs-btn').addEventListener('click', () => {
  const el = document.documentElement;
  if (!document.fullscreenElement) {
    (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullscreen).call(el);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || document.mozExitFullscreen).call(document);
  }
});

// Initialize zone colors (hexToRgb lives in colors.js so can't be done at state.js parse time)
state.curSky = hexToRgb(ZONES[0].sky);
state.curGnd = hexToRgb(ZONES[0].gnd);
state.curHor = hexToRgb(ZONES[0].hor);

// Wire shop "Launch!" button — passes beginRun to avoid ui.js → loop.js circular import
initShop(beginRun);
initNameInput();
initNewGameBtn();

// Attach all input event listeners
initInput();
