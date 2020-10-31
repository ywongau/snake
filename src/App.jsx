import './App.css';

import { height, interval, width } from './engine/settings';

import Board from './Board';
import Engine from './engine/engine';
import FoodDispensor from './engine/food-dispenser';
import Hooks from './Hooks';
import React from 'react';

const foodDispensor = FoodDispensor(Math.random, width, height);
const engine = Engine(foodDispensor, width, height);

export default () => {
  const [state, start] = Hooks(
    engine,
    (f) => setInterval(f, interval),
    clearInterval
  )();

  return (
    <div
      className="board"
      style={{
        width: width + 1 + 'em',
        height: height + 1 + 'em'
      }}
    >
      {state.game ? (
        <Board snake={state.game.snake} food={state.game.food}></Board>
      ) : null}
      {!(state.game && state.game.isAlive) ? (
        <button onClick={start}>Start</button>
      ) : null}
    </div>
  );
};
