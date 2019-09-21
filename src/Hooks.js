import { useReducer } from "react";
import directions from "./engine/directions";

const NEXT = "next";
const INIT = "init";
const DIRECTION = "direction";

const Reducer = next => (state, action) => {
  switch (action.type) {
    case NEXT:
      return {
        ...state,
        game: next(state.game, state.direction)
      };
    case DIRECTION:
      return {
        ...state,
        direction: action.payload
      };
    case INIT:
      return {
        ...state,
        game: next(),
        timer: action.payload
      };
    default:
      return state;
  }
};

export default (engine, setInterval, clearInterval) => () => {
  const [state, dispatch] = useReducer(Reducer(engine), {
    game: undefined,
    timer: undefined,
    direction: directions.up
  });
  const keypress = e => {
    if (!Object.values(directions).includes(e.keyCode)) return;
    dispatch({
      type: DIRECTION,
      payload: e.keyCode
    });
  };
  const start = () => {
    const timerId = setInterval(() => {
      dispatch({ type: NEXT });
    });
    dispatch({ type: INIT, payload: timerId });
    document.body.addEventListener("keydown", keypress);
  };
  if (state.game && !state.game.isAlive) {
    clearInterval(state.timer);
  }
  return [state, start];
};
