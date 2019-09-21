import React from "react";
import Food from "./Food";
import Snake from "./Snake";

export default ({ snake, food }) => (
  <>
    <Snake snake={snake}></Snake> <Food food={food}></Food>
  </>
);
