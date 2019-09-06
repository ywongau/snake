import directions from "./directions";
const width = 31;
const height = 23;
//Point:: [Number, Number]
//state:: {snake: Array Point, food: Point, isAlive: Boolean, movingDirection: Number, keyedDirection: Number}
const init = foodDispenser => {
  const snake = [[Math.ceil(width / 2), Math.ceil(height / 2)]];
  return {
    snake: snake,
    isAlive: true,
    food: foodDispenser(width, height, snake)
  };
};

const nextHeadMapper = {
  [directions.up]: point => [point[0], point[1] - 1],
  [directions.down]: point => [point[0], point[1] + 1],
  [directions.left]: point => [point[0] - 1, point[1]],
  [directions.right]: point => [point[0] + 1, point[1]]
};

const isOppositeDirection = (keycodeA, keycodeB) =>
  Math.abs(keycodeA - keycodeB) === 2;

const getEffectiveDirection = (movingDirection, keyedDirection) =>
  isOppositeDirection(movingDirection, keyedDirection)
    ? movingDirection
    : keyedDirection;

const headHitsBody = (newHead, newBody) =>
  newBody.some(point => point[0] === newHead[0] && point[1] === newHead[1]);

const headHitsWall = head =>
  head[0] === -1 ||
  head[1] === -1 ||
  head[0] === width + 1 ||
  head[1] === height + 1;

const isFoodEaten = (head, food) => head[0] === food[0] && head[1] === food[1];

const move = (foodDispenser, state, keyedDirection) => {
  const effectiveDirection = getEffectiveDirection(
    state.movingDirection,
    keyedDirection
  );
  const nextHead = nextHeadMapper[effectiveDirection](state.snake[0]);
  const foodEaten = isFoodEaten(nextHead, state.food);
  const nextBody = foodEaten ? state.snake : state.snake.slice(0, -1);
  const snake = [nextHead, ...nextBody];
  return {
    ...state,
    snake,
    isAlive: !headHitsWall(nextHead) && !headHitsBody(nextHead, nextBody),
    food: foodEaten ? foodDispenser(width, height, snake) : state.food
  };
};

const next = foodDispenser => (state, keyedDirection) =>
  state.snake.length === 0 ? init(foodDispenser) : move(foodDispenser, state, keyedDirection);

export default next;
