import { state } from './state.js';
import { GAME_W, GAME_H, ZONES } from './constants.js';
import { hexToRgb } from './colors.js';
import { initShop, renderCatPreviews, initNameInput, initNewGameBtn } from './ui.js';
import { beginRun } from './loop.js';
import { initInput } from './input.js';

const cv = document.getElementById('c');
const wrap = document.getElementById('wrap');

function scaleToWindow() {
  const vp = window.visualViewport;
  const vw = vp ? vp.width  : document.documentElement.clientWidth;
  const vh = vp ? vp.height : document.documentElement.clientHeight;
  const scale = Math.min(vw / GAME_W, vh / GAME_H);
  const dpr = window.devicePixelRatio || 1;
  cv.width  = Math.round(GAME_W * dpr);
  cv.height = Math.round(GAME_H * dpr);
  cv.style.width  = GAME_W + 'px';
  cv.style.height = GAME_H + 'px';
  state.renderScale = dpr;
  const x = (vw - GAME_W * scale) / 2;
  const y = (vh - GAME_H * scale) / 2;
  wrap.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
  renderCatPreviews();
}
scaleToWindow();
if (window.ResizeObserver) new ResizeObserver(scaleToWindow).observe(document.documentElement);
window.addEventListener('resize', scaleToWindow);
if (window.visualViewport) window.visualViewport.addEventListener('resize', scaleToWindow);
window.addEventListener('orientationchange', () => {
  setTimeout(scaleToWindow, 50);
  setTimeout(scaleToWindow, 300);
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
