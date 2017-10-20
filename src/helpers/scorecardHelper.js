const storageKey = "scorecard";

export function createNewScorecard(size) {
  size = def(size, 18);
  let holes = range(size).map(i => createNewScorecardItem(i));
  return holes;
}

export function storeScorecard(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getStoredScorecard() {
  let data = localStorage.getItem(storageKey);
  if (data === null) return createNewScorecard();
  return JSON.parse(data);
}


export function createNewScorecardItem(id, name, par, score) {
  name = def(name, `Hole ${id + 1}`);
  par = def(par, 3);
  score = def(score, 0);
  return { id, name, par: 3, score: 0 };
}

function def(param, defaultValue) {
  return param == null ? defaultValue : param;
}

function range(len) {
  let a = [];
  for(let i = 0; i < len; i++) a.push(i);
  return a;
}