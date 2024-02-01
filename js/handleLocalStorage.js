const LOCAL_HIGH_SCORE_KEY = "local-high-score";

export function getLocalHighScore() {
  return localStorage.getItem(LOCAL_HIGH_SCORE_KEY);
}

export function setLocalHighScore(value) {
  localStorage.setItem(LOCAL_HIGH_SCORE_KEY, value);
}
