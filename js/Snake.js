import Element from "./Element.js";
import randomFoodPosition from "./randomFoodPosition.js";
import { setLocalHighScore } from "./handleLocalStorage.js";

export default class Snake {
  constructor({ gameBoard, GRID_SIZE, highScore }) {
    this.gameBoard = gameBoard;
    this.GRID_SIZE = GRID_SIZE;
    this.highScore = highScore; // set highscore before score
    this.score = 0;
    this.foodScorePower = 1;
    this.foodPower = 1;
    this.numberOfFoods = 1;
    // the intial length of snake can be changed easily
    this.initialSnakeLength = Math.min(10, this.GRID_SIZE - 3);
    this.generateSnake();
    this.food = [];
    for (let index = 0; index < this.numberOfFoods; index++) {
      this.createFood();
    }
    if (this.elements.length < GRID_SIZE / 2) {
      this.direction = { x: 1, y: 0 };
    } else {
      this.direction = { x: 0, y: 1 };
    }
    this.gameOver = false;
  }

  get score() {
    return this.scoreValue;
  }

  set score(scoreValue) {
    this.scoreValue = scoreValue;
    if (this.scoreValue > this.highScore) {
      this.highScore = this.scoreValue;
      setLocalHighScore(this.highScore);
    }
    document
      .querySelectorAll("[data-score-display]")
      .forEach((scoreDisplay) => {
        scoreDisplay.textContent = scoreValue;
      });
    document
      .querySelectorAll("[data-high-score-display]")
      .forEach((highScoreDisplay) => {
        highScoreDisplay.textContent = this.highScore;
      });
  }

  generateSnake() {
    this.elements = [
      new Element({
        type: "head",
        position: {
          x: this.initialSnakeLength + 1,
          y: 2,
        },
        board: this.gameBoard,
      }),
    ];
    for (let index = 0; index < this.initialSnakeLength - 1; index++) {
      this.elements.push(
        new Element({
          type: "body",
          position: {
            x: this.initialSnakeLength - index,
            y: 2,
          },
          board: this.gameBoard,
        })
      );
    }
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
    this.detectCollision();

    if (this.gameOver === true) {
      window.cancelAnimationFrame(animationId);
      document.querySelector(".modal").classList.add("show");
    } else {
      this.render();
    }
  }

  detectCollision() {
    this.gameOver = this.elements.some((element, elementIndex) => {
      let wallCollision,
        headCollision,
        collidedFoodIndex = -1;
      if (elementIndex === 0) {
        // wall collision
        wallCollision = this.checkCollisionWithWall(element);
        // food collision
        collidedFoodIndex = this.checkCollisionWithFood(element);
      } else {
        // collision into itself
        headCollision = this.checkCollisionWithHead(element);
      }
      if (collidedFoodIndex !== -1) {
        this.eatFood(collidedFoodIndex);
      }
      return wallCollision || headCollision;
    });
  }

  checkCollisionWithWall(head) {
    return (
      head.position.x > this.GRID_SIZE ||
      head.position.x < 1 ||
      head.position.y > this.GRID_SIZE ||
      head.position.y < 1
    );
  }

  checkCollisionWithFood(head) {
    let collidedFoodIndex = -1;
    this.food.some((food, foodIndex) => {
      if (
        food.position.x === head.position.x &&
        food.position.y === head.position.y
      ) {
        collidedFoodIndex = foodIndex;
        return true;
      }
    });
    return collidedFoodIndex;
  }

  checkCollisionWithHead(element) {
    return (
      element.position.x === this.elements[0].position.x &&
      element.position.y === this.elements[0].position.y
    );
  }

  eatFood(foodIndex) {
    setTimeout(() => this.food.splice(foodIndex, 1)[0].element.remove());
    let lastElementPosition = this.elements[this.elements.length - 1].position;
    for (let index = 0; index < this.foodPower; index++) {
      this.elements.push(
        new Element({
          type: "body",
          position: { ...lastElementPosition },
          board: this.gameBoard,
        })
      );
    }
    this.score += this.foodScorePower;
    this.createFood();
  }

  createFood() {
    this.food.push(
      new Element({
        type: "food",
        position: { ...randomFoodPosition(this) },
        board: this.gameBoard,
      })
    );
  }

  render = () => this.elements.forEach((element) => element.render());
}
