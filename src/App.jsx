import React from "react";
import Board from "./Board";
import Hooks from "./Hooks";
import Engine from "./engine/engine";
import "./App.css";
import foodDispensor from "./engine/food-dispenser";
import { width, height, interval } from "./engine/settings";

export default () => {
  const [state, start] = Hooks(
    Engine(foodDispensor(Math.random, width, height)),
    f => setInterval(f, interval),
    clearInterval
  )();

  return (
    <div
      className="board"
      style={{
        width: width + 1 + "em",
        height: height + 1 + "em"
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
