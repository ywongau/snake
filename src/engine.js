import directions from "./directions";
const width = 96;
const height = 68;
//Point:: [Number, Number]
//state:: {snake: Array Point, food: Point, isAlive: Boolean, previousDirection: Number, direction: Number}
const init = () => ({
  snake: [[width / 2, height / 2]]
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

const move = state => {
  const effectiveDirection = getEffectiveDirection(
    state.previousDirection,
    state.direction
  );
  const mapper = nextMoveMapper[effectiveDirection];
  return {
    snake: state.snake.map(mapper)
  };
};

const next = state => (state.snake.length === 0 ? init(state) : move(state));

export default next;
