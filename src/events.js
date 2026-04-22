import { state } from './state.js';

const EVENTS = [
  { type: 'gust',      label: 'Tailwind!',   dur: 120, good: true  },
  { type: 'updraft',   label: 'Updraft!',    dur: 80,  good: true  },
  { type: 'birdflock', label: 'Bird Flock!', dur: 100, good: true  },
  { type: 'downdraft', label: 'Downdraft!',  dur: 70,  good: false },
  { type: 'headwind',  label: 'Headwind!',   dur: 130, good: false },
  { type: 'heavyair',  label: 'Heavy Air!',  dur: 110, good: false },
];

let _msgTimer = null;

export function showEventMsg(label, good) {
  const el = document.getElementById('event-msg');
  el.textContent = label;
  el.style.color = good ? '#80FF90' : '#FF8080';
  el.style.opacity = '1';
  clearTimeout(_msgTimer);
  _msgTimer = setTimeout(() => el.style.opacity = '0', 2200);
}

export function tickEvents() {
  if (state.gameState !== 'flying') return;
  state.nextEventT--;
  if (state.nextEventT <= 0) {
    state.nextEventT = 280 + Math.floor(Math.random() * 320);
    if (Math.random() < 0.5) {
      const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      state.eventActive = { type: ev.type, t: ev.dur };
      showEventMsg(ev.label, ev.good);
    }
  }
}

export function applyEvent() {
  if (!state.eventActive) return;
  const ev = state.eventActive;
  if (ev.type === 'gust')      state.pvx = Math.min(state.pvx + 0.14, 22);
  if (ev.type === 'updraft')   state.pvy -= 0.17;
  if (ev.type === 'birdflock') { state.pvx = Math.min(state.pvx + 0.09, 22); state.pvy -= 0.07; }
  if (ev.type === 'downdraft') state.pvy += 0.24;
  if (ev.type === 'headwind')  state.pvx *= 0.982;
  if (ev.type === 'heavyair')  { state.pvx *= 0.977; state.pvy += 0.08; }
  ev.t--;
  if (ev.t <= 0) state.eventActive = null;
}
