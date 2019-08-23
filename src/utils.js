export const ap = (arrayOfAFunction, arrayOfData) =>
  arrayOfAFunction.flatMap(f => arrayOfData.map(data => f(data)));

export const dropFood = random => (width, height, snake) => {
  const flattenedArrayOfCoordinates = ap(
    ap([x => y => [y, x]], range(width)),
    range(height)
  ).filter(
    coords =>
      !snake.some(
        snakePiece => snakePiece[0] === coords[0] && snakePiece[1] === coords[1]
      )
  );

  return flattenedArrayOfCoordinates[
    getIndexOfArrayCorrespondingToChance(
      flattenedArrayOfCoordinates.length,
      random()
    )
  ];
};

export const getIndexOfArrayCorrespondingToChance = (
  arrayLength,
  chanceValue
) => {
  return Math.floor(chanceValue * arrayLength);
};

export const range = x =>
  Array(x)
    .fill(undefined)
    .map((x, i) => i);
