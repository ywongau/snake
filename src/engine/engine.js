import directions from './directions';

const { up, down, left, right } = directions;

const nextMoveMapping = {
  [up]: [0, -1],
  [down]: [0, 1],
  [left]: [-1, 0],
  [right]: [1, 0]
};

const isOppositeDirection = (keycodeA, keycodeB) =>
  Math.abs(keycodeA - keycodeB) === 2;

const getMovingDirection = (movingDirection, keyedDirection) =>
  isOppositeDirection(movingDirection, keyedDirection)
    ? movingDirection
    : keyedDirection;

const headHitsBody = (head, body) =>
  body.some((point) => point[0] === head[0] && point[1] === head[1]);

const headHitsWall = (head, width, height) =>
  head[0] === -1 ||
  head[1] === -1 ||
  head[0] === width + 1 ||
  head[1] === height + 1;

const isFoodEaten = (head, food) => head[0] === food[0] && head[1] === food[1];

const init = (foodDispenser, width, height) => () => {
  const snake = [[Math.floor(width / 2), Math.floor(height / 2)]];
  return {
    snake: snake,
    isAlive: true,
    food: foodDispenser(snake),
    movingDirection: up
  };
};

const next = (foodDispenser, width, height) => (state, keyedDirection) => {
  const movingDirection = getMovingDirection(
    state.movingDirection,
    keyedDirection
  );
  const offset = nextMoveMapping[movingDirection];
  const head = [
    state.snake[0][0] + offset[0],
    state.snake[0][1] + offset[1]
  ];
  const foodEaten = isFoodEaten(head, state.food);
  const body = foodEaten ? state.snake : state.snake.slice(0, -1);
  const snake = [head, ...body];
  const isAlive =
    !headHitsWall(head, width, height) && !headHitsBody(head, body);
  return {
    snake: isAlive ? snake : state.snake,
    food: foodEaten ? foodDispenser(snake) : state.food,
    isAlive,
    movingDirection
  };
};

const Engine = (foodDispenser, width, height) => ({
  init: init(foodDispenser, width, height),
  next: next(foodDispenser, width, height)
});

export default Engine;
