import React from "react";
import Food from "./Food";
import Snake from "./Snake";

function App({ snake, food }) {
  return (
    <React.Fragment>
      <Snake snake={snake}></Snake> <Food food={food}></Food>
    </React.Fragment>
  );
}

export default App;
