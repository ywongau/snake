export const ap = (mf, ma) => mf.flatMap(f => ma.map(a => f(a)));

export const range = x => [...Array(x).keys()];

const liftA2 = (f, ma, mb) => ap(ma.map(f), mb);

const pointNotIn = xs => y => !xs.some(x => x[0] === y[0] && x[1] === y[1]);

const multiplyRange = (a, b) => liftA2(x => y => [x, y], range(a), range(b));

const getRandomPoint = (random0to1, allPoints) =>
  allPoints[Math.floor(allPoints.length * random0to1)];

export default (random, width, height) => snake =>
  getRandomPoint(
    random(),
    multiplyRange(width, height).filter(pointNotIn(snake))
  );
