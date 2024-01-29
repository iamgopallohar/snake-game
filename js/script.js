class Snake {
  constructor(gameBoard) {
    this.elements = [
      new Element({ type: "head", position: { x: 3, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 2, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 1, y: 2 }, board: gameBoard }),
    ];
    this.direction = { x: 0, y: 1 };
  }
}

class Element {
  constructor({ type, position, board }) {
    this.element = document.createElement("div");
    this.element.classList.add("snake-element");
    this.element.classList.add(type);
    this.position = { ...position };
    board.append(this.element);
  }

  get position() {
    return this.positionObj;
  }

  set position(positionObj) {
    this.positionObj = positionObj;
    this.element.style.setProperty("--grid-column-start", positionObj.x);
    this.element.style.setProperty("--grid-row-start", positionObj.y);
  }
}

const snake = new Snake(document.getElementById("gameboard"));

let lastPaintTime;
const SPEED = 12;
function animation(currentTime) {
  window.requestAnimationFrame(animation);
  if (lastPaintTime == undefined) {
    lastPaintTime = currentTime;
    return;
  }
  if (currentTime - lastPaintTime < 1000 / SPEED) return;
  lastPaintTime = currentTime;

  for (
    let elementIndex = snake.elements.length - 1;
    elementIndex >= 0;
    elementIndex--
  ) {
    let element = snake.elements[elementIndex];
    if (elementIndex == 0) {
      element.position = {
        x: element.position.x + snake.direction.x,
        y: element.position.y + snake.direction.y,
      };
    } else {
      element.position = { ...snake.elements[elementIndex - 1].position };
    }
  }
}

window.requestAnimationFrame(animation);
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  console.log(e.key === "ArrowDown");
  console.log(e.key === "ArrowUp");
  console.log(e.key === "ArrowLeft");
  console.log(e.key === "ArrowRight");
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
});
