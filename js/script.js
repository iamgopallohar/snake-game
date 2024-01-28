class Snake {
  constructor(gameBoard) {
    this.elements = [
      new Element({ type: "head", position: { x: 3, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 2, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 1, y: 2 }, board: gameBoard }),
    ];
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

new Snake(document.getElementById("gameboard"));
