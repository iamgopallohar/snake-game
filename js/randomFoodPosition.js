export default function randomFoodPosition(snake) {
  let position = {
    x: getRandomInteger(1, snake.GRID_SIZE),
    y: getRandomInteger(1, snake.GRID_SIZE),
  };
  let isPositionOnSnake = snake.elements.some(
    (element) =>
      position.x === element.position.x && position.y === element.position.y
  );
  let isPositionOnFood = snake.food.some(
    (food) => position.x === food.position.x && position.y === food.position.y
  );
  if (isPositionOnSnake || isPositionOnFood) {
    return randomFoodPosition(snake);
  } else {
    return position;
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
