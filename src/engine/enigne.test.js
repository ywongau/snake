import { height, width } from './settings';
import sinon, { assert } from 'sinon';

import Engine from './engine';
import directions from './directions';
import { expect } from 'chai';

const foodDispenser = () => [2, 2];
const engine = Engine(foodDispenser, width, height);
it('initializes', () => {
  const result = engine.init();
  expect(result.snake).to.deep.equal([
    [Math.floor(width / 2), Math.floor(height / 2)]
  ]);
  expect(result.isAlive).to.deep.equal(true);
  expect(result.movingDirection).to.deep.equal(directions.up);
});

it('initialize calls foodDispenser with correct params', () => {
  const dispenserSpy = sinon.spy();
  const result = Engine(dispenserSpy).init();
  assert.calledWith(dispenserSpy, result.snake);
});

it('drops food', () => {
  const result = Engine(() => [1, 1]).init();
  expect(result.food).to.deep.equal([1, 1]);
});

it('move up into wall', () => {
  const result = engine.next(
    {
      snake: [[0, 0]],
      food: [0, 0],
      isAlive: true
    },
    directions.up
  );
  expect(result.isAlive).to.deep.equal(false);
  expect(result.isAlive).to.deep.equal(false);
});

it('move left into wall', () => {
  const result = engine.next(
    {
      snake: [[0, 0]],
      food: [0, 0],
      isAlive: true
    },
    directions.left
  );
  expect(result.isAlive).to.deep.equal(false);
});

it('move right into wall', () => {
  const result = engine.next(
    {
      snake: [[31, 23]],
      food: [0, 0],
      isAlive: true
    },
    directions.right
  );
  expect(result.isAlive).to.deep.equal(false);
});

it('move down into wall', () => {
  const result = engine.next(
    {
      snake: [[31, 23]],
      food: [0, 0],
      isAlive: true
    },
    directions.down
  );
  expect(result.isAlive).to.deep.equal(false);
});

it('should keep snake in the old position if snake is dead', () => {
  const result = engine.next(
    {
      snake: [[0, 0]],
      food: [0, 0],
      isAlive: true
    },
    directions.up
  );
  expect(result.snake).to.deep.equal([[0, 0]]);
});

it('moves up', () => {
  const result = engine.next(
    {
      snake: [
        [10, 10],
        [11, 10],
        [12, 10]
      ],
      food: [0, 0]
    },
    directions.up
  );
  expect(result.snake).to.deep.equal([
    [10, 9],
    [10, 10],
    [11, 10]
  ]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves up and eat', () => {
  const result = engine.next(
    {
      snake: [
        [10, 10],
        [11, 10],
        [12, 10]
      ],
      food: [10, 9]
    },
    directions.up
  );
  expect(result.snake).to.deep.equal([
    [10, 9],
    [10, 10],
    [11, 10],
    [12, 10]
  ]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves up, no eat! food stay', () => {
  const result = engine.next(
    {
      //don't care about food, use default set up
      snake: [
        [10, 10],
        [11, 10],
        [12, 10]
      ],
      food: [1, 1]
    },
    directions.up
  );
  expect(result.food).to.deep.equal([1, 1]);
});

it('adds new food after eating', () => {
  const result = Engine(() => [2, 2]).next(
    {
      //food is dropped at [2, 2]
      snake: [
        [10, 10],
        [11, 10],
        [12, 10]
      ],
      food: [10, 9]
    },
    directions.up
  );
  expect(result.food).to.deep.equal([2, 2]);
});

it('calls food dispenser with valid params', () => {
  const dispenserSpy = sinon.spy(); //only care about params passed to foodDispenser
  const result = Engine(dispenserSpy).next(
    {
      snake: [
        [10, 10],
        [11, 10],
        [12, 10]
      ],
      food: [10, 9]
    },
    directions.up
  );
  assert.calledWith(dispenserSpy, result.snake);
});

it('moves down', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      food: [0, 0]
    },
    directions.down
  );
  expect(result.snake).to.deep.equal([[10, 11]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves left', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      food: [0, 0]
    },
    directions.left
  );
  expect(result.snake).to.deep.equal([[9, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves right', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      food: [0, 0]
    },
    directions.right
  );
  expect(result.snake).to.deep.equal([[11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves down then up', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      movingDirection: directions.down,
      food: [0, 0]
    },
    directions.up
  );
  expect(result.snake).to.deep.equal([[10, 11]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves up then down', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      movingDirection: directions.up,
      food: [0, 0]
    },
    directions.down
  );
  expect(result.snake).to.deep.equal([[10, 9]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves left then right', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      movingDirection: directions.left,
      food: [0, 0]
    },
    directions.right
  );
  expect(result.snake).to.deep.equal([[9, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves right then left', () => {
  const result = engine.next(
    {
      snake: [[10, 10]],
      movingDirection: directions.right,
      food: [0, 0]
    },
    directions.left
  );
  expect(result.snake).to.deep.equal([[11, 10]]);
  expect(result.isAlive).to.deep.equal(true);
});

it('moves onto itself and dies', () => {
  const result = engine.next(
    {
      snake: [
        [11, 9],
        [10, 9],
        [10, 10],
        [11, 10],
        [12, 10]
      ],
      movingDirection: directions.right,
      food: [0, 0]
    },
    directions.down
  );
  expect(result.isAlive).to.deep.equal(false);
});
