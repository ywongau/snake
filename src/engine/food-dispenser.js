const pointNotIn = (points) => (point) =>
  !points.some((x) => x[0] === point[0] && x[1] === point[1]);

const getRandomPoint = (random0to1, allPoints) =>
  allPoints[Math.floor(allPoints.length * random0to1)];

export default (random, width, height) => {
  const allPoints = [...new Array(width)].flatMap((_, x) =>
    [...new Array(height)].map((_, y) => [x, y])
  );
  return (snake) =>
    getRandomPoint(random(), allPoints.filter(pointNotIn(snake)));
};
