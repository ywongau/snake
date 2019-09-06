import { useEffect, useReducer, Dispatch } from "react";

const reducer = (state, action) => {
  return state;
};

export default engine => () => {
  const [state, dispatch] = useReducer(reducer, engine());
  return [state];
};
