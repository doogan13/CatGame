import { state } from './state.js';
import { UPS } from './constants.js';
import { boostMax } from './upgrades.js';
import { drawOrange, drawGray } from './draw/drawCat.js';
import { saveScore, renderLeaderboard, getPlayerName, savePlayerName } from './leaderboard.js';
import { unlockHelmet } from './unlocks.js';

export function setMsg(t) {
  document.getElementById('msg').textContent = t;
}

export function updHUD() {
  document.getElementById('hc').textContent = state.coins;
  document.getElementById('hb').textContent = state.best + ' ft';
  document.getElementById('hd').textContent = state.runDist + ' ft';
  if (state.gameState === 'flying' || state.gameState === 'done') {
    const rs = Math.hypot(state.pvx, state.pvy);
    state.displaySpeed += (rs - state.displaySpeed) * 0.15;
    const mph = Math.round(state.displaySpeed * 4.2);
    document.getElementById('spd-pill').style.display = '';
    document.getElementById('hspd').textContent = mph;
    const t = Math.min(1, mph / 180);
    const col = `rgb(255,${Math.round(255 * (1 - t * 0.85))},${Math.round(255 * (1 - t))})`;
    document.getElementById('hspd').style.color = col;
    document.getElementById('spd-bar').style.width = (t * 100) + '%';
    document.getElementById('spd-bar').style.background = col;
  } else {
    document.getElementById('spd-pill').style.display = 'none';
    state.displaySpeed = 0;
  }
}

export function updBoosts() {
  const bar = document.getElementById('boostbar');
  bar.innerHTML = '';
  for (let i = 0; i < boostMax(); i++) {
    const d = document.createElement('div');
    d.className = 'bp' + (i < state.boostLeft ? ' on' : '');
    d.textContent = '⚡';
    bar.appendChild(d);
  }
}

const doneBtn = document.getElementById('done-btn');
const doneDist = document.getElementById('done-dist');

export function showDoneBtn() {
  saveScore(state.runDist, state.catType);
  if (state.runDist >= 5000 && unlockHelmet(state.catType)) {
    const el = document.getElementById('event-msg');
    el.textContent = 'Space Helmet Unlocked!';
    el.style.color = '#FFD700';
    el.style.opacity = '1';
    setTimeout(() => el.style.opacity = '0', 5000);
  }
  doneDist.textContent = state.runDist + ' ft' + (state.runDist >= state.best ? '  New Best!' : '');
  doneBtn.style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => doneBtn.classList.add('show')));
}

export function openLeaderboard() {
  renderLeaderboard(state.runDist);
  document.getElementById('leaderboard').style.display = 'flex';
}

export function closeLeaderboard() {
  document.getElementById('leaderboard').style.display = 'none';
}

export function hideDoneBtn() {
  doneBtn.classList.remove('show');
  setTimeout(() => { doneBtn.style.display = 'none'; }, 350);
}

export function openCatSelect(mode) {
  state.selMode = mode;
  document.getElementById('sel-title').textContent = mode === 'swap' ? 'Swap Your Cat' : 'Choose Your Cat';
  document.getElementById('sel').style.display = 'flex';
  state.gameState = 'select';
}

export function openShop() {
  state.gameState = 'shop';
  document.getElementById('scoin').textContent = 'Coins: ' + state.coins;
  const g = document.getElementById('ugrid');
  g.innerHTML = '';
  UPS.forEach(u => {
    const maxed = u.val >= u.max;
    const cost = maxed ? null : u.costs[u.val];
    const can = !maxed && state.coins >= cost;
    const el = document.createElement('div');
    el.className = 'ucard' + (maxed ? ' maxed' : can ? ' affordable' : '');
    el.innerHTML = `<div class="un">${u.name}</div><div class="ud">${u.desc}</div><div class="uv">${maxed ? '✓ Maxed' : 'Cost: ' + cost}</div><div class="ulv">Level ${u.val} / ${u.max}</div>`;
    el.addEventListener('click', () => {
      if (can) { state.coins -= cost; u.val++; openShop(); }
    });
    g.appendChild(el);
  });
  document.getElementById('shop').style.display = 'flex';
}

// beginRunFn is passed in by main.js to avoid ui.js → loop.js circular import
export function initShop(beginRunFn) {
  document.getElementById('goBtn').addEventListener('click', () => {
    document.getElementById('shop').style.display = 'none';
    beginRunFn();
  });
}

export function pickCat(type, beginRunFn) {
  state.catType = type;
  document.getElementById('sel').style.display = 'none';
  if (state.selMode === 'swap') beginRunFn();
  else openShop();
}

export function initNewGameBtn() {
  const btn = document.getElementById('new-game-btn');
  let confirming = false;
  let timer = null;
  btn.addEventListener('click', () => {
    if (!confirming) {
      confirming = true;
      btn.textContent = 'Confirm Reset?';
      btn.classList.add('confirm');
      timer = setTimeout(() => {
        confirming = false;
        btn.textContent = 'New Game';
        btn.classList.remove('confirm');
      }, 3000);
    } else {
      clearTimeout(timer);
      confirming = false;
      btn.textContent = 'New Game';
      btn.classList.remove('confirm');
      state.coins = 0;
      state.best = 0;
      UPS.forEach(u => u.val = 0);
      localStorage.removeItem('catgame_helmet_orange');
      localStorage.removeItem('catgame_helmet_gray');
      updHUD();
    }
  });
}

export function initNameInput() {
  const input = document.getElementById('name-input');
  input.value = getPlayerName();
  input.addEventListener('input', () => savePlayerName(input.value));
}

export function renderCatPreviews() {
  const dpr = window.devicePixelRatio || 1;

  const pvTT = document.getElementById('pvTT');
  pvTT.width  = Math.round(120 * dpr);
  pvTT.height = Math.round(120 * dpr);
  pvTT.style.width  = '120px';
  pvTT.style.height = '120px';
  const a = pvTT.getContext('2d');
  a.setTransform(dpr, 0, 0, dpr, 0, 0);
  a.clearRect(0, 0, 120, 120);
  drawOrange(a, 56, 72, 0.92, 1, false);

  const pvHF = document.getElementById('pvHF');
  pvHF.width  = Math.round(120 * dpr);
  pvHF.height = Math.round(120 * dpr);
  pvHF.style.width  = '120px';
  pvHF.style.height = '120px';
  const b = pvHF.getContext('2d');
  b.setTransform(dpr, 0, 0, dpr, 0, 0);
  b.clearRect(0, 0, 120, 120);
  drawGray(b, 54, 72, 0.88, 1, false);
}
