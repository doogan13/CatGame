import { state } from './state.js';
import { doFire, beginRun } from './loop.js';
import { openCatSelect, openShop, pickCat, setMsg, updBoosts, hideDoneBtn } from './ui.js';
import { burst } from './physics.js';

function onDown() {
  if (state.gameState === 'aim' && state.phase === 'angle') {
    state.phase = 'power';
    state.powVal = 0;
    state.powDir = 1;
    setMsg('Release To Ignite!');
    return;
  }
  if (state.gameState === 'flying' && state.boostLeft > 0) {
    state.boostLeft--;
    state.pvx += 2.0;
    state.pvy -= 1.0;
    state.boostFlash = 10;
    burst(state.px, state.py, '#FF8000', 8, 3);
    updBoosts();
  }
}

function onUp() {
  if (state.gameState === 'aim' && state.phase === 'power') doFire();
}

export function initInput() {
  const cv = document.getElementById('c');

  cv.addEventListener('mousedown', onDown);
  cv.addEventListener('mouseup', onUp);
  cv.addEventListener('mouseleave', onUp);
  cv.addEventListener('touchstart', e => { e.preventDefault(); onDown(); }, { passive: false });
  cv.addEventListener('touchend',   e => { e.preventDefault(); onUp();   }, { passive: false });

  document.addEventListener('keydown', e => {
    if (e.code !== 'Space') return;
    e.preventDefault();
    if (state.gameState === 'flying' && state.onGround) {
      state.pvy = -13;
      state.pvx *= 1.05;
      burst(state.px, state.py, '#FFE040', 14, 5);
    }
  });

  document.getElementById('done-relaunch').addEventListener('click', () => {
    hideDoneBtn(); cancelAnimationFrame(state.raf); beginRun();
  });
  document.getElementById('done-swapcat').addEventListener('click', () => {
    hideDoneBtn(); cancelAnimationFrame(state.raf); openCatSelect('swap');
  });
  document.getElementById('done-shop-btn').addEventListener('click', () => {
    hideDoneBtn(); cancelAnimationFrame(state.raf); openShop();
  });

  document.getElementById('btnTT').addEventListener('click', () => pickCat('orange', beginRun));
  document.getElementById('btnHF').addEventListener('click', () => pickCat('gray',   beginRun));
}
