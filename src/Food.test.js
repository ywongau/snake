import React from "react";
import Food from "./Food";
import { shallow, mount } from "enzyme";
import { expect } from "chai";

it("renders a food", () => {
  const food = [1, 1];
  const wrapper = mount(<Food food={food} />);
  const divs = wrapper.find("div");
  expect(divs.length).to.equal(1);
  expect(divs.get(0).props.style.left).to.equal("1em");
  expect(divs.get(0).props.style.top).to.equal("1em");
  expect(divs.get(0).props.className).to.equal("food");
});
