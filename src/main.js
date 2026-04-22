import { state } from './state.js';
import { GAME_W, GAME_H, ZONES } from './constants.js';
import { hexToRgb } from './colors.js';
import { initShop, renderCatPreviews, initNameInput, initNewGameBtn } from './ui.js';
import { beginRun } from './loop.js';
import { initInput } from './input.js';

const cv = document.getElementById('c');
const wrap = document.getElementById('wrap');

function scaleToWindow() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.min(vw / GAME_W, vh / GAME_H);
  const dpr = window.devicePixelRatio || 1;
  const cssW = Math.round(GAME_W * scale);
  const cssH = Math.round(GAME_H * scale);
  cv.style.width  = cssW + 'px';
  cv.style.height = cssH + 'px';
  cv.width  = Math.round(cssW * dpr);
  cv.height = Math.round(cssH * dpr);
  state.renderScale = scale * dpr;
  wrap.style.transform = '';
  renderCatPreviews();
}
scaleToWindow();
if (window.ResizeObserver) {
  new ResizeObserver(scaleToWindow).observe(document.body);
} else {
  window.addEventListener('resize', scaleToWindow);
  window.addEventListener('orientationchange', () => setTimeout(scaleToWindow, 300));
}

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
