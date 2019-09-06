export const ap = (mf, ma) => mf.flatMap(f => ma.map(a => f(a)));

const liftA2 = (f, ma1, ma2) => ap(ma1.map(f), ma2);

const pointNotIn = xs => y => !xs.some(x => x[0] === y[0] && x[1] === y[1]);

export const dropFood = random => (width, height, snake) => {
  const possiblePoints = liftA2(
    x => y => [y, x],
    range(width),
    range(height)
  ).filter(pointNotIn(snake));
  return possiblePoints[Math.floor(possiblePoints.length * random())];
};

export const range = x => [...Array(x).keys()];
