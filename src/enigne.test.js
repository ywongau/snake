import { expect } from "chai";
import sinon, { assert } from "sinon";
import Engine from "./engine";
import directions from "./directions";

const foodDispenser = () => [2, 2];
const engine = Engine(foodDispenser);
it("initializes", () => {
  const result = engine({
    snake: [],
    keyedDirection: directions.up
  });
  expect(result.snake).to.deep.equal([[16, 12]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("initialize calls foodDispenser with correct params", () => {
  const dispenserSpy = sinon.spy();
  const result = Engine(dispenserSpy)({
    snake: [],
    keyedDirection: directions.up
  });
  assert.calledWith(dispenserSpy, 31, 23, result.snake);
});

it("drops food at random location at 0,0", () => {
  const result = Engine(() => [1, 1])({
    snake: [],
    keyedDirection: directions.up
  });
  expect(result.food).to.deep.equal([1, 1]);
});

it("move up into wall", function() {
  const result = engine({
    snake: [[0, 0]],
    keyedDirection: directions.up,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).to.deep.equal(false);
});

it("move left into wall", function() {
  const result = engine({
    snake: [[0, 0]],
    keyedDirection: directions.left,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).to.deep.equal(false);
});

it("move right into wall", function() {
  const result = engine({
    snake: [[31, 23]],
    keyedDirection: directions.right,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).to.deep.equal(false);
});

it("move down into wall", function() {
  const result = engine({
    snake: [[31, 23]],
    keyedDirection: directions.down,
    food: [0, 0],
    isAlive: true
  });
  expect(result.isAlive).to.deep.equal(false);
});

it("moves up", function() {
  const result = engine({
    snake: [[10, 10], [11, 10], [12, 10]],
    keyedDirection: directions.up,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[10, 9], [10, 10], [11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves up and eat", function() {
  const result = engine({
    snake: [[10, 10], [11, 10], [12, 10]],
    keyedDirection: directions.up,
    food: [10, 9]
  });
  expect(result.snake).to.deep.equal([[10, 9], [10, 10], [11, 10], [12, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves up, no eat! food stay", function() {
  const result = engine({
    snake: [[10, 10], [11, 10], [12, 10]],
    keyedDirection: directions.up,
    food: [1, 1]
  });
  expect(result.food).to.deep.equal([1, 1]);
});

it("adds new food after eating", function() {
  const result = Engine(() => [2, 2])({
    snake: [[10, 10], [11, 10], [12, 10]],
    keyedDirection: directions.up,
    food: [10, 9]
  });
  expect(result.food).to.deep.equal([2, 2]);
});

it("calls food dispenser valid params", function() {
  const dispenserSpy = sinon.spy();
  const snakePos = [[10, 10], [11, 10], [12, 10]];
  const result = Engine(dispenserSpy)({
    snake: snakePos,
    keyedDirection: directions.up, 
    food: [10, 9]
  });
  assert.calledWith(dispenserSpy, 31, 23, result.snake);
});

it("moves down", function() {
  const result = engine({
    snake: [[10, 10]],
    keyedDirection: directions.down,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[10, 11]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves left", function() {
  const result = engine({
    snake: [[10, 10]],
    keyedDirection: directions.left,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[9, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves right", function() {
  const result = engine({
    snake: [[10, 10]],
    keyedDirection: directions.right,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves down then up", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.down,
    keyedDirection: directions.up,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[10, 11]]);
  expect(result.isAlive).to.deep.equal(true);
});
it("moves up then down", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.up,
    keyedDirection: directions.down,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[10, 9]]);
  expect(result.isAlive).to.deep.equal(true);
});
it("moves left then right", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.left,
    keyedDirection: directions.right,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[9, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});
it("moves right then left", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.right,
    keyedDirection: directions.left,
    food: [0, 0]
  });
  expect(result.snake).to.deep.equal([[11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves onto itself and dies", function() {
  const result = engine({
    snake: [[11, 9], [10, 9], [10, 10], [11, 10], [12, 10]],
    movingDirection: directions.right,
    keyedDirection: directions.down,
    food: [0, 0]
  });
  expect(result.isAlive).to.deep.equal(false);
});
