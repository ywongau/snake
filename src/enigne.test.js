import React from "react";
import engine from "./engine";
import directions from "./directions";
it("initializes", () => {
  const result = engine({
    snake: [],
    direction: directions.up,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[48, 34]]);
});

it("moves up", function() {
  const result = engine({
    snake: [[48, 34]],
    direction: directions.up,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[48, 33]]);
});

it("moves down", function() {
  const result = engine({
    snake: [[48, 34]],
    direction: directions.down,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[48, 35]]);
});

it("moves left", function() {
  const result = engine({
    snake: [[48, 34]],
    direction: directions.left,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[47, 34]]);
});

it("moves right", function() {
  const result = engine({
    snake: [[48, 34]],
    direction: directions.right,
    food: [0, 0]
  });
  expect(result.snake).toEqual([[49, 34]]);
});

it("moves down then up", function() {
  const result = engine({
    snake: [[48, 34]],
    previousDirection: directions.down,
    direction: directions.up,
    food: [0, 0]
  });

  expect(result.snake).toEqual([[48, 35]]);
});
