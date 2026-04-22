const KEY = 'catgame_lb';
const NAME_KEY = 'catgame_player';

export function getPlayerName() {
  return localStorage.getItem(NAME_KEY) || '';
}

export function savePlayerName(name) {
  try { localStorage.setItem(NAME_KEY, name.trim()); } catch {}
}

export function saveScore(dist, cat) {
  const name = getPlayerName() || 'Anonymous';
  const scores = getScores();
  scores.push({ dist, cat, name, date: new Date().toLocaleDateString() });
  scores.sort((a, b) => b.dist - a.dist);
  try { localStorage.setItem(KEY, JSON.stringify(scores.slice(0, 10))); } catch {}
}

export function getScores() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}

export function renderLeaderboard(latestDist) {
  const scores = getScores();
  const list = document.getElementById('lb-list');
  list.innerHTML = '';
  if (scores.length === 0) {
    list.innerHTML = '<div style="color:#888;text-align:center;padding:12px;">No runs yet!</div>';
    return;
  }
  let markedLatest = false;
  scores.forEach((s, i) => {
    const isLatest = !markedLatest && s.dist === latestDist;
    if (isLatest) markedLatest = true;
    const row = document.createElement('div');
    row.className = 'lb-row' + (isLatest ? ' lb-me' : '');
    row.innerHTML =
      `<span class="lb-rank">#${i + 1}</span>` +
      `<span class="lb-dist">${s.dist} ft</span>` +
      `<span class="lb-cat">${s.name || 'Anonymous'}</span>` +
      `<span class="lb-date">${s.date}</span>`;
    list.appendChild(row);
  });
}
