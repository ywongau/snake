import { expect } from "chai";
import sinon, { assert } from "sinon";
import Engine from "./engine";
import directions from "./directions";

const foodDispenser = () => [2, 2];
const engine = Engine(foodDispenser);
it("initializes", () => {
  const result = engine({
    snake: []
  });
  expect(result.snake).to.deep.equal([[16, 12]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("initialize calls foodDispenser with correct params", () => {
  const dispenserSpy = sinon.spy();
  const result = Engine(dispenserSpy)({
    snake: []
  });
  assert.calledWith(dispenserSpy, 31, 23, result.snake);
});

it("drops food", () => {
  const result = Engine(() => [1, 1])({
    snake: []
  });
  expect(result.food).to.deep.equal([1, 1]);
});

it("move up into wall", function() {
  const result = engine(
    {
      snake: [[0, 0]],
      food: [0, 0],
      isAlive: true
    },
    directions.up
  );
  expect(result.isAlive).to.deep.equal(false);
});

it("move left into wall", function() {
  const result = engine(
    {
      snake: [[0, 0]],
      food: [0, 0],
      isAlive: true
    },
    directions.left
  );
  expect(result.isAlive).to.deep.equal(false);
});

it("move right into wall", function() {
  const result = engine(
    {
      snake: [[31, 23]],
      food: [0, 0],
      isAlive: true
    },
    directions.right
  );
  expect(result.isAlive).to.deep.equal(false);
});

it("move down into wall", function() {
  const result = engine(
    {
      snake: [[31, 23]],
      food: [0, 0],
      isAlive: true
    },
    directions.down
  );
  expect(result.isAlive).to.deep.equal(false);
});

it("moves up", function() {
  const result = engine(
    {
      snake: [[10, 10], [11, 10], [12, 10]],
      food: [0, 0]
    },
    directions.up
  );
  expect(result.snake).to.deep.equal([[10, 9], [10, 10], [11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves up and eat", function() {
  const result = engine({
    snake: [[10, 10], [11, 10], [12, 10]],
    food: [10, 9]
  }, directions.up);
  expect(result.snake).to.deep.equal([[10, 9], [10, 10], [11, 10], [12, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves up, no eat! food stay", function() {
  const result = engine({
    //don't care about food, use default set up
    snake: [[10, 10], [11, 10], [12, 10]],
    food: [1, 1]
  }, directions.up);
  expect(result.food).to.deep.equal([1, 1]);
});

it("adds new food after eating", function() {
  const result = Engine(() => [2, 2])({
    //food is dropped at [2, 2]
    snake: [[10, 10], [11, 10], [12, 10]],
    food: [10, 9]
  }, directions.up);
  expect(result.food).to.deep.equal([2, 2]);
});

it("calls food dispenser valid params", function() {
  const dispenserSpy = sinon.spy(); //only care about params passed to foodDispenser
  const result = Engine(dispenserSpy)({
    snake: [[10, 10], [11, 10], [12, 10]],
    food: [10, 9]
  }, directions.up);
  assert.calledWith(dispenserSpy, 31, 23, result.snake);
});

it("moves down", function() {
  const result = engine({
    snake: [[10, 10]],
    food: [0, 0]
  }, directions.down);
  expect(result.snake).to.deep.equal([[10, 11]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves left", function() {
  const result = engine({
    snake: [[10, 10]],
    food: [0, 0]
  }, directions.left);
  expect(result.snake).to.deep.equal([[9, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves right", function() {
  const result = engine({
    snake: [[10, 10]],
    food: [0, 0]
  }, directions.right);
  expect(result.snake).to.deep.equal([[11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves down then up", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.down,
    food: [0, 0]
  }, directions.up);
  expect(result.snake).to.deep.equal([[10, 11]]);
  expect(result.isAlive).to.deep.equal(true);
});
it("moves up then down", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.up,
    food: [0, 0]
  }, directions.down);
  expect(result.snake).to.deep.equal([[10, 9]]);
  expect(result.isAlive).to.deep.equal(true);
});
it("moves left then right", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.left,
    food: [0, 0]
  }, directions.right);
  expect(result.snake).to.deep.equal([[9, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});
it("moves right then left", function() {
  const result = engine({
    snake: [[10, 10]],
    movingDirection: directions.right,
    food: [0, 0]
  }, directions.left);
  expect(result.snake).to.deep.equal([[11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it("moves onto itself and dies", function() {
  const result = engine({
    snake: [[11, 9], [10, 9], [10, 10], [11, 10], [12, 10]],
    movingDirection: directions.right,
    food: [0, 0]
  }, directions.down);
  expect(result.isAlive).to.deep.equal(false);
});
