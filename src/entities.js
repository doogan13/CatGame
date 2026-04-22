import { state } from './state.js';
import { FL } from './constants.js';

export function mkItems() {
  state.items = [];
  for (let i = 0; i < 140; i++) {
    const wx = 600 + i * 130 + Math.random() * 70;
    const r = Math.random();
    const onGnd = r > 0.5;
    const wy = onGnd ? FL - 8 : 65 + Math.random() * (FL - 200);
    const type = r < 0.27 ? 'coin'
               : r < 0.47 ? 'bird'
               : r < 0.63 ? 'mouse'
               : r < 0.88 ? 'spring'
               : 'poop';
    state.items.push({ wx, wy, type, hit: false, onGnd, bob: Math.random() * Math.PI * 2, r2: type === 'poop' ? 14 : 12 });
  }
}
