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

const isDeadSnake = (head, body) =>
  head[0] === -1 ||
  head[1] === -1 ||
  head[0] === 32 ||
  head[1] === 24 ||
  headHitsBody(head, body);

const move = state => {
  const effectiveDirection = getEffectiveDirection(
    state.previousDirection,
    state.direction
  );

  const newHead = nextMoveMapper[effectiveDirection](state.snake[0]);
  const isFoodEaten = nextHead =>
    nextHead[0] === state.food[0] && nextHead[1] === state.food[1];
  const newBody = isFoodEaten(newHead) ? state.snake : state.snake.slice(0, -1);
  const nextSnake = [newHead, ...newBody];
  return {
    ...state,
    snake: (state.snake = nextSnake),
    isAlive: !isDeadSnake(newHead, newBody)
  };
};

const next = state => (state.snake.length === 0 ? init(state) : move(state));

export default next;
