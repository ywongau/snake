import engine from "./engine";
import directions from "./directions";
it("initializes", () => {
  const result = engine({
    snake: [],
    direction: directions.up,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[16, 12]]);
});

it("move up into wall", function() {
  const result = engine({
    snake: [[0, 0]],
    direction: directions.up,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).toEqual(false);
});

it("move left into wall", function() {
  const result = engine({
    snake: [[0, 0]],
    direction: directions.left,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).toEqual(false);
});

it("move right into wall", function() {
  const result = engine({
    snake: [[31, 23]],
    direction: directions.right,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).toEqual(false);
});

it("move down into wall", function() {
  const result = engine({
    snake: [[31, 23]],
    direction: directions.down,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).toEqual(false);
});

it("moves up", function() {
  const result = engine({
    snake: [[10, 10], [11, 10], [12, 10]],
    direction: directions.up,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[10, 9], [10, 10], [11, 10]]);
  expect(result.isAlive).toEqual(true);
});

it("moves up and eat", function() {
  const result = engine({
    snake: [[10, 10], [11, 10], [12, 10]],
    direction: directions.up,
    food: [10, 9]
  });
  expect(result.snake).toEqual([[10, 9], [10, 10], [11, 10], [12, 10]]);
  expect(result.isAlive).toEqual(true);
});

it("moves down", function() {
  const result = engine({
    snake: [[10, 10]],
    direction: directions.down,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[10, 11]]);
  expect(result.isAlive).toEqual(true);
});

it("moves left", function() {
  const result = engine({
    snake: [[10, 10]],
    direction: directions.left,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[9, 10]]);
  expect(result.isAlive).toEqual(true);
});

it("moves right", function() {
  const result = engine({
    snake: [[10, 10]],
    direction: directions.right,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[11, 10]]);
  expect(result.isAlive).toEqual(true);
});

it("moves down then up", function() {
  const result = engine({
    snake: [[10, 10]],
    previousDirection: directions.down,
    direction: directions.up,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[10, 11]]);
  expect(result.isAlive).toEqual(true);
});
it("moves up then down", function() {
  const result = engine({
    snake: [[10, 10]],
    previousDirection: directions.up,
    direction: directions.down,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[10, 9]]);
  expect(result.isAlive).toEqual(true);
});
it("moves left then right", function() {
  const result = engine({
    snake: [[10, 10]],
    previousDirection: directions.left,
    direction: directions.right,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[9, 10]]);
  expect(result.isAlive).toEqual(true);
});
it("moves right then left", function() {
  const result = engine({
    snake: [[10, 10]],
    previousDirection: directions.right,
    direction: directions.left,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[11, 10]]);
  expect(result.isAlive).toEqual(true);
});

it("moves onto itself and dies", function() {
  const result = engine({
    snake: [[11, 9], [10, 9], [10, 10], [11, 10], [12, 10]],
    previousDirection: directions.right,
    direction: directions.down,
    food: [0, 0]
  });
  expect(result.isAlive).toEqual(false);
});
