const STORAGE_KEY = 'pkmn-battle-stats';

function getStats() {
  let raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { wins: 0, losses: 0 };
  try {
    return JSON.parse(raw);
  } catch (e) {
    return { wins: 0, losses: 0 };
  }
}

function setStats(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function incrementWins() {
  let stats = getStats();
  stats.wins++;
  setStats(stats);
  return stats;
}

export function incrementLosses() {
  let stats = getStats();
  stats.losses++;
  setStats(stats);
  return stats;
}

export function resetStats() {
  let stats = { wins: 0, losses: 0 };
  setStats(stats);
  return stats;
}

export function getCurrentStats() {
  return getStats();
}
