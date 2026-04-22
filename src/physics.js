import { state } from './state.js';
import { FL, RAMP_BASE_X, W } from './constants.js';
import { glide, bounceR, magR, catR } from './upgrades.js';
import { checkZone } from './colors.js';

export function burst(wx, wy, col, n, pw) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = pw * Math.random();
    state.sparks.push({
      x: wx, y: wy,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 1.5,
      r: 2.5 + Math.random() * 5,
      c: col,
      life: 26 + Math.random() * 20,
      ml: 46,
    });
  }
}

export function addTrail() {
  if (state.gameState !== 'flying') return;
  state.trails.push({ x: state.px, y: state.py, life: 14, ml: 14 });
  if (state.trails.length > 30) state.trails.shift();
}

// updHUD and showDoneBtn are passed as callbacks to avoid circular imports
export function physics(updHUD, showDoneBtn) {
  if (state.gameState !== 'flying') return;

  state.pvx += state.windX * 0.4;
  state.px += state.pvx;
  state.py += state.pvy;
  state.pvy += 0.31;
  state.pvx *= glide();
  if (Math.abs(state.pvx) > 22) state.pvx *= 0.975;

  const mr = magR(), cr = catR();
  state.items.forEach(it => {
    if (it.hit) return;
    const dx = state.px - it.wx, dy = state.py - it.wy;
    const dist = Math.hypot(dx, dy);
    if (it.type === 'coin' && dist < mr) {
      it.wx += (state.px - it.wx) * 0.12;
      it.wy += (state.py - it.wy) * 0.12;
    }
    if (dist < cr + it.r2) {
      it.hit = true;
      if (it.type === 'coin') {
        state.coins++;
        burst(it.wx, it.wy, '#FFD700', 7, 3);
      } else if (it.type === 'bat') {
        state.pvy -= 3.5;
        burst(it.wx, it.wy, '#9030C0', 9, 3.5);
      } else if (it.type === 'mouse') {
        state.pvx = Math.min(state.pvx + 5, 20);
        state.pvy -= 1.5;
        burst(it.wx, it.wy, '#FFD840', 10, 4);
        burst(it.wx, it.wy, '#C0C0C8', 8, 3);
      } else if (it.type === 'spring') {
        state.pvy = -8;
        burst(it.wx, it.wy, '#40A0E0', 10, 4);
      } else if (it.type === 'poop') {
        state.pvx *= 0.5;
        state.pvy += 3;
        burst(it.wx, it.wy, '#6B4526', 8, 2);
        burst(it.wx, it.wy, '#A0A000', 6, 2.5);
      }
      updHUD();
    }
  });

  const fl = FL - cr;
  if (state.py >= fl) {
    state.py = fl;
    state.onGround = true;
    if (Math.abs(state.pvy) > 2) {
      state.pvy = -Math.abs(state.pvy) * bounceR();
      state.pvx *= 0.76;
      burst(state.px, state.py, '#70C030', 6, 2.5);
    } else {
      state.pvy = 0;
    }
  } else {
    state.onGround = false;
  }

  const targetCamX = Math.max(0, state.px - W * 0.3);
  state.camX = targetCamX;
  state.smoothCamX += (state.camX - state.smoothCamX) * 0.08;

  state.runDist = Math.max(0, Math.round((state.px - RAMP_BASE_X) / 5));
  checkZone();
  updHUD();
  addTrail();

  if (state.pvx < 0.4 && state.onGround && Math.abs(state.pvy) < 0.5) {
    state.gameState = 'done';
    if (state.runDist > state.best) state.best = state.runDist;
    state.coins += Math.floor(state.runDist / 8);
    updHUD();
    showDoneBtn();
  }
}
