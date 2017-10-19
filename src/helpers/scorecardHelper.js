const storageKey = "scorecard";

export function createNewScorecard() {
    let holes = [];
    for (let i = 0; i < 18; i++) {
      holes.push({
        id: i,
        name: `Hole ${i+1}`,
        par: 3,
        score: 0
      });
    }
    return holes;
}

export function storeScorecard(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getStoredScorecard() {
  let data = localStorage.getItem(storageKey);
  if(data === null) return createNewScorecard();
  return JSON.parse(data);
}