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
const SPEED = 1;
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
