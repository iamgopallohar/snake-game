import Snake from "./Snake.js";
import { getLocalHighScore, setLocalHighScore } from "./handleLocalStorage.js";

function handleKeyboardInput(e) {
  if (!snake || snake?.gameOver) return;
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

const gameBoard = document.getElementById("gameboard");
let lastPaintTime;
let animationId;
let highScore;
const GRID_SIZE = 30;
const SPEED = 8;

let localHighScore = getLocalHighScore();
if (localHighScore === null) setLocalHighScore(0);
highScore = Number(getLocalHighScore());
let snake = new Snake({ gameBoard, GRID_SIZE, highScore });

document.querySelector("[data-play-button]").addEventListener("click", () => {
  if (snake.gameOver) {
    document.querySelectorAll(".snake-element").forEach((element) => {
      element.remove();
    });
    snake = new Snake({ gameBoard, GRID_SIZE, highScore });
  }
  animationId = window.requestAnimationFrame(animation);
  document.querySelector(".modal").classList.remove("show");
});
document.addEventListener("keydown", handleKeyboardInput);
