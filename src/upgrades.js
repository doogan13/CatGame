import { state } from './state.js';
import { UPS } from './constants.js';

const U = (id) => UPS.find(u => u.id === id);

export const maxPow  = () => 30 + U('pow').val * 10;
export const bounceR = () => 0.36 + U('bnc').val * 0.11;
export const boostMax= () => 2   + U('bst').val;
export const glide   = () => 0.9984 - U('gli').val * 0.0006;
export const magR    = () => 30  + U('mag').val * 38;
export const catR    = () => state.catType === 'orange' ? 26 : 18;
