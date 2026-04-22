const key = cat => `catgame_helmet_${cat}`;

export function helmetUnlocked(cat) {
  return localStorage.getItem(key(cat)) === '1';
}

export function unlockHelmet(cat) {
  if (helmetUnlocked(cat)) return false;
  try { localStorage.setItem(key(cat), '1'); } catch {}
  return true;
}
