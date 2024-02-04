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
const SPEED = 10;

let localHighScore = getLocalHighScore();
if (localHighScore === null) setLocalHighScore(0);
highScore = Number(getLocalHighScore());
let snake = new Snake({ gameBoard, GRID_SIZE, highScore });

const playButton = document.querySelector("[data-play-button]");

playButton.addEventListener("click", (e) => {
  if (snake.gameOver) {
    document.querySelectorAll(".snake-element").forEach((element) => {
      element.remove();
    });
    snake = new Snake({ gameBoard, GRID_SIZE, highScore });
  }
  animationId = window.requestAnimationFrame(animation);
  document.querySelector(".modal-wrapper").classList.remove("show");
});
document.addEventListener("keydown", handleKeyboardInput);

// touch
document.addEventListener("touchstart", handleTouchStart, { passive: false });
document.addEventListener("touchmove", handleTouchMove);
// document.addEventListener("touchmove", handleTouchMove);

let startX, startY;

function handleTouchStart(e) {
  if (!e.target.classList.contains("play-button")) {
    e.preventDefault();
  }
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
  e.preventDefault();

  const endX = e.touches[0].clientX;
  const endY = e.touches[0].clientY;
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  const minimumSwipeLength = 30;
  if (
    Math.abs(deltaY) > minimumSwipeLength ||
    Math.abs(deltaX) > minimumSwipeLength
  ) {
    if (Math.abs(deltaY) > 2 * Math.abs(deltaX)) {
      if (deltaY < 0) {
        snake.direction = { x: 0, y: -1 };
      } else {
        snake.direction = { x: 0, y: 1 };
      }
    }
    if (Math.abs(deltaX) > 2 * Math.abs(deltaY)) {
      if (deltaX < 0) {
        snake.direction = { x: -1, y: 0 };
      } else {
        snake.direction = { x: 1, y: 0 };
      }
    }
  }
}
