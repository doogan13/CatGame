export const GAME_W = 680;
export const GAME_H = 520;
export const W = GAME_W;
export const H = GAME_H;
export const FL = H - 60;

export const RAMP_BASE_X = 60;
export const RAMP_BASE_Y = FL;
export const RAMP_LEN = 200;
export const RAMP_SPEED = 0.007;
export const RAMP_MIN = 0.12;
export const RAMP_MAX = 0.72;
export const POW_SPEED = 0.022;

export const ZONES = [
  { ft:0,    name:'Backyard',    sky:'#87CEEB', hor:'#A8D8F8', gnd:'#5BB030', type:'meadow' },
  { ft:500,  name:'Countryside', sky:'#70C0E0', hor:'#A0D4F4', gnd:'#4AA828', type:'meadow' },
  { ft:1000, name:'Desert',      sky:'#E8B840', hor:'#F0D070', gnd:'#C8A040', type:'desert' },
  { ft:1500, name:'Arctic',      sky:'#C8E4F8', hor:'#E0F4FF', gnd:'#D8EEF8', type:'arctic' },
  { ft:2000, name:'Night Sky',   sky:'#0C1428', hor:'#182040', gnd:'#182840', type:'night'  },
  { ft:3000, name:'Storm',       sky:'#3C4450', hor:'#485058', gnd:'#384040', type:'storm'  },
  { ft:4000, name:'Space',       sky:'#080812', hor:'#100820', gnd:'#181020', type:'space'  },
  { ft:5000, name:'Deep Space',  sky:'#040408', hor:'#080414', gnd:'#100C18', type:'space'  },
];

export const CLOUDS = Array.from({ length: 6 }, (_, i) => ({
  bx: 80 + i * 120,
  by: 28 + (i % 3) * 18,
  rx: 38 + (i % 3) * 14,
  ry: 16 + (i % 2) * 8,
}));

export const STARS = Array.from({ length: 80 }, (_, i) => ({
  x:     (i * 137 + 29) % W,
  y:     (i * 89  + 11) % (H * 0.8),
  r:     i % 7 === 0 ? 2 : 1,
  phase: i * 0.7,
}));

// UPS vals are mutated in-place by shop purchases
export const UPS = [
  { id:'pow', name:'Rocket Fuel',  desc:'Bigger thrust',       costs:[80,160,320,600], val:0, max:4 },
  { id:'bnc', name:'Bounce',       desc:'Keep more speed',     costs:[60,130,280,500], val:0, max:4 },
  { id:'bst', name:'Air Boosts',   desc:'More boost charges',  costs:[70,150,300],     val:0, max:3 },
  { id:'gli', name:'Aerodynamics', desc:'Less air resistance', costs:[100,220,420],    val:0, max:3 },
  { id:'mag', name:'Magnet',       desc:'Attract coins',       costs:[90,200],         val:0, max:2 },
];
