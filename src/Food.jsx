import React, { FunctionComponent } from "react";

export default ({ food }) => {
  return (
    <div
      className="food"
      style={{ left: food[0] + "em", top: food[1] + "em" }}
    />
  );
};
