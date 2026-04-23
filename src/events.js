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

export function tickEvents(dts = 1) {
  if (state.gameState !== 'flying') return;
  state.nextEventT -= dts;
  if (state.nextEventT <= 0) {
    state.nextEventT = 280 + Math.floor(Math.random() * 320);
    if (Math.random() < 0.5) {
      const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      state.eventActive = { type: ev.type, t: ev.dur };
      showEventMsg(ev.label, ev.good);
    }
  }
}

export function applyEvent(dts = 1) {
  if (!state.eventActive) return;
  const ev = state.eventActive;
  if (ev.type === 'gust')      state.pvx = Math.min(state.pvx + 0.06 * dts, 22);
  if (ev.type === 'updraft')   state.pvy -= 0.07 * dts;
  if (ev.type === 'birdflock') { state.pvx = Math.min(state.pvx + 0.04 * dts, 22); state.pvy -= 0.03 * dts; }
  if (ev.type === 'downdraft') state.pvy += 0.10 * dts;
  if (ev.type === 'headwind')  state.pvx *= Math.pow(0.988, dts);
  if (ev.type === 'heavyair')  { state.pvx *= Math.pow(0.983, dts); state.pvy += 0.04 * dts; }
  ev.t -= dts;
  if (ev.t <= 0) state.eventActive = null;
}
