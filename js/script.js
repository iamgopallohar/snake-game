import Snake from "./Snake.js";
import { getLocalHighScore, setLocalHighScore } from "./handleLocalStorage.js";

function handleKeyboardInput(e) {
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      snake.direction = { x: 0, y: -1 };
      break;

    case "ArrowDown":
    case "s":
    case "S":
      snake.direction = { x: 0, y: 1 };
      break;

    case "ArrowLeft":
    case "a":
    case "A":
      snake.direction = { x: -1, y: 0 };
      break;

    case "ArrowRight":
    case "d":
    case "D":
      snake.direction = { x: 1, y: 0 };
      break;
  }
}

function animation(currentTime) {
  animationId = window.requestAnimationFrame(animation);
  if (lastPaintTime == undefined) {
    lastPaintTime = currentTime;
    return;
  }
  if (currentTime - lastPaintTime < 1000 / SPEED) return;
  lastPaintTime = currentTime;

  snake.update(animationId);
}

let lastPaintTime;
let animationId;
let highScore;
const GRID_SIZE = 30;
const SPEED = 8;

let localHighScore = getLocalHighScore();
if (localHighScore === null) {
  setLocalHighScore(0);
}
highScore = Number(getLocalHighScore());
console.log(typeof highScore, highScore);

const snake = new Snake({
  gameBoard: document.getElementById("gameboard"),
  GRID_SIZE,
  highScore,
});

animationId = window.requestAnimationFrame(animation);
document.addEventListener("keydown", handleKeyboardInput);
