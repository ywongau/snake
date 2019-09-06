import React, { FunctionComponent } from "react";

export default ({ snake }) => {
  return snake.map(point => (
    <div
      className="snake"
      key={point}
      style={{ left: point[0] + "em", top: point[1] + "em" }}
    />
  ));
};
