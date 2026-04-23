export const state = {
  // game flow
  gameState: 'select',
  catType: 'orange',
  phase: 'angle',
  selMode: 'initial',
  raf: null,

  // economy
  coins: 0,
  best: 0,
  runDist: 0,

  // physics / position
  px: 0, py: 0, pvx: 0, pvy: 0,
  camX: 0, smoothCamX: 0,
  onGround: false,
  coyoteT: 0,

  // animation timers
  blinkT: 0,
  boostLeft: 0,
  boostFlash: 0,
  displaySpeed: 0,
  gliderT: 0,
  nextEventT: 240,
  eventActive: null,
  zoneHazardT: 0,

  // collections
  items: [],
  sparks: [],
  trails: [],

  // aim / ramp
  rampAngle: 0.32,
  rampDir: 1,
  powVal: 0,
  powDir: 1,
  sledT: 0,
  sledV: 0,

  // zone / environment
  currentZone: 0,
  zoneTagTimer: 0,
  windX: 0,
  windTarget: 0,

  // lerped zone colors — initialized in main.js after hexToRgb is available
  curSky: null,
  curGnd: null,
  curHor: null,

  renderScale: 1,
};
