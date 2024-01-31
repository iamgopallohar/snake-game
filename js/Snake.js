import Element from "./Element.js";

export default class Snake {
  constructor({ gameBoard, GRID_SIZE }) {
    this.elements = [
      new Element({ type: "head", position: { x: 9, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 8, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 7, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 6, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 5, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 4, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 3, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 2, y: 2 }, board: gameBoard }),
      new Element({ type: "body", position: { x: 1, y: 2 }, board: gameBoard }),
    ];
    this.direction = { x: 0, y: 1 };
    this.GRID_SIZE = GRID_SIZE;
  }

  get direction() {
    return this.directionObj;
  }

  set direction(directionObj) {
    if (
      this.directionObj == undefined ||
      (directionObj.x !== this.direction.x &&
        directionObj.y !== this.direction.y)
    ) {
      this.directionObj = directionObj;
    }
  }

  update(animationId) {
    // update positions of elements before the collision detection
    for (
      let elementIndex = this.elements.length - 1;
      elementIndex >= 0;
      elementIndex--
    ) {
      let element = this.elements[elementIndex];
      if (elementIndex !== 0) {
        element.position = { ...this.elements[elementIndex - 1].position };
      } else {
        // head - it is updated at last so collision detection here
        element.position = {
          x: element.position.x + this.direction.x,
          y: element.position.y + this.direction.y,
        };
      }
    }

    // collision detection before rendering so that we don't have that problematic effect
    let collision = this.elements.some((element, elementIndex) => {
      if (elementIndex === 0) {
        if (
          element.position.x > this.GRID_SIZE ||
          element.position.x < 1 ||
          element.position.y > this.GRID_SIZE ||
          element.position.y < 1
        )
          return true;
      } else {
        if (
          element.position.x === this.elements[0].position.x &&
          element.position.y === this.elements[0].position.y
        )
          return true;
      }
    });

    if (collision === true) {
      window.cancelAnimationFrame(animationId);
    } else {
      this.render();
    }
  }

  render = () => this.elements.forEach((element) => element.render());
}
