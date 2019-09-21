import React from "react";

export default ({ food }) => {
  return (
    <div
      className="food"
      style={{ left: food[0] + "em", top: food[1] + "em", width: "1em", height: "1em" }}
    />
  );
};
