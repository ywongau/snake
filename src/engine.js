import directions from "./directions";
const width = 31;
const height = 23;
//Point:: [Number, Number]
//state:: {snake: Array Point, food: Point, isAlive: Boolean, previousDirection: Number, direction: Number}
const init = () => ({
  snake: [[Math.ceil(width / 2), Math.ceil(height / 2)]]
});

const nextMoveMapper = {
  [directions.up]: point => [point[0], point[1] - 1],
  [directions.down]: point => [point[0], point[1] + 1],
  [directions.left]: point => [point[0] - 1, point[1]],
  [directions.right]: point => [point[0] + 1, point[1]]
};

const isOppositeDirection = (keycodeA, keycodeB) =>
  Math.abs(keycodeA - keycodeB) === 2;

const getEffectiveDirection = (previousDirection, direction) =>
  isOppositeDirection(previousDirection, direction)
    ? previousDirection
    : direction;

const headHitsBody = (newHead, newBody) =>
  newBody.some(point => point[0] === newHead[0] && point[1] === newHead[1]);

const headHitsWall = head =>
  head[0] === -1 ||
  head[1] === -1 ||
  head[0] === width + 1 ||
  head[1] === height + 1;

const isFoodEaten = (head, food) => head[0] === food[0] && head[1] === food[1];

const move = state => {
  const effectiveDirection = getEffectiveDirection(
    state.previousDirection,
    state.direction
  );
  const newHead = nextMoveMapper[effectiveDirection](state.snake[0]);
  const newBody = isFoodEaten(newHead, state.food)
    ? state.snake
    : state.snake.slice(0, -1);
  return {
    ...state,
    snake: (state.snake = [newHead, ...newBody]),
    isAlive: !headHitsWall(newHead) && !headHitsBody(newHead, newBody)
  };
};

const next = state => (state.snake.length === 0 ? init(state) : move(state));

export default next;
