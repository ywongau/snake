import directions from './directions';

const Engine = (foodDispenser, width, height) => {
  const init = () => {
    const snake = [[Math.floor(width / 2), Math.floor(height / 2)]];
    return {
      snake: snake,
      isAlive: true,
      food: foodDispenser(snake),
      movingDirection: directions.up
    };
  };

  const nextMoveMapping = {
    [directions.up]: [0, -1],
    [directions.down]: [0, 1],
    [directions.left]: [-1, 0],
    [directions.right]: [1, 0]
  };

  const isOppositeDirection = (keycodeA, keycodeB) =>
    Math.abs(keycodeA - keycodeB) === 2;

  const getMovingDirection = (movingDirection, keyedDirection) =>
    isOppositeDirection(movingDirection, keyedDirection)
      ? movingDirection
      : keyedDirection;

  const headHitsBody = (head, body) =>
    body.some((point) => point[0] === head[0] && point[1] === head[1]);

  const headHitsWall = (head) =>
    head[0] === -1 ||
    head[1] === -1 ||
    head[0] === width + 1 ||
    head[1] === height + 1;

  const isFoodEaten = (head, food) =>
    head[0] === food[0] && head[1] === food[1];

  const next = (state, keyedDirection) => {
    const movingDirection = getMovingDirection(
      state.movingDirection,
      keyedDirection
    );
    const offset = nextMoveMapping[movingDirection];
    const nextHead = [
      state.snake[0][0] + offset[0],
      state.snake[0][1] + offset[1]
    ];
    const foodEaten = isFoodEaten(nextHead, state.food);
    const nextBody = foodEaten ? state.snake : state.snake.slice(0, -1);
    const nextSnake = [nextHead, ...nextBody];
    const isAlive =
      !headHitsWall(nextHead) &&
      !headHitsBody(nextHead, nextBody);
    return {
      ...state,
      snake: isAlive ? nextSnake : state.snake,
      food: foodEaten ? foodDispenser(nextSnake) : state.food,
      isAlive,
      movingDirection
    };
  };

  return {
    init,
    next
  };
};

export default Engine;
