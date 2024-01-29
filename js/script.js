class Snake {
  constructor(gameBoard) {
    this.elements = [
      new Element({
        type: "head",
        position: { x: 8, y: 2 },
        board: gameBoard,
      }),
      // new Element({ type: "body", position: { x: 9, y: 2 }, board: gameBoard }),
      // new Element({ type: "body", position: { x: 8, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 7, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 6, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 5, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 4, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 3, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 2, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 1, y: 2 }, board: gameBoard }),
    ];
    this.direction = { x: 0, y: 1 };
  }

  render = () => this.elements.forEach((element) => element.render());
}

class Element {
  constructor({ type, position, board }) {
    this.element = document.createElement("div");
    this.element.classList.add("snake-element");
    this.element.classList.add(type);
    this.position = { ...position };
    this.render();
    board.append(this.element);
  }

  render() {
    this.element.style.setProperty("--grid-column-start", this.position.x);
    this.element.style.setProperty("--grid-row-start", this.position.y);
  }
}

const snake = new Snake(document.getElementById("gameboard"));

let lastPaintTime;
let animationId;
const GRID_SIZE = 30;
const SPEED = 1;
function animation(currentTime) {
  animationId = window.requestAnimationFrame(animation);
  if (lastPaintTime == undefined) {
    lastPaintTime = currentTime;
    return;
  }
  if (currentTime - lastPaintTime < 1000 / SPEED) return;
  lastPaintTime = currentTime;

  // update positions of elements before the collision detection
  for (
    let elementIndex = snake.elements.length - 1;
    elementIndex >= 0;
    elementIndex--
  ) {
    let element = snake.elements[elementIndex];
    if (elementIndex !== 0) {
      element.position = { ...snake.elements[elementIndex - 1].position };
    } else {
      // head - it is updated at last so collision detection here
      element.position = {
        x: element.position.x + snake.direction.x,
        y: element.position.y + snake.direction.y,
      };
    }
  }

  // collision detection before rendering so that we don't have that problematic effect
  let collision = snake.elements.some((element, elementIndex) => {
    if (elementIndex === 0) {
      if (
        element.position.x > GRID_SIZE ||
        element.position.x < 0 ||
        element.position.y > GRID_SIZE ||
        element.position.y < 0
      )
        return true;
    } else {
      if (
        element.position.x === snake.elements[0].position.x &&
        element.position.y === snake.elements[0].position.y
      )
        return true;
    }
  });

  if (collision === true) {
    window.cancelAnimationFrame(animationId);
  } else {
    snake.render();
  }
}

animationId = window.requestAnimationFrame(animation);
document.addEventListener("keydown", (e) => {
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
