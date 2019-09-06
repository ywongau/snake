import React from "react";
import Snake from "./Snake";
import { shallow, mount } from "enzyme";
import { expect } from "chai";

it("renders a baby snake", () => {
  const snake = [[0, 0]];
  const wrapper = mount(<Snake snake={snake} />);
  const divs = wrapper.find("div");
  expect(divs.length).to.equal(1);
});

it("renders a snake", () => {
  const snake = [[0, 0], [0, 1]];
  const wrapper = mount(<Snake snake={snake} />);
  const divs = wrapper.find("div");
  expect(divs.length).to.equal(2);
  expect(divs.get(0).props.style.left).to.equal("0em");
  expect(divs.get(0).props.style.top).to.equal("0em");
  expect(divs.get(0).props.className).to.equal("snake");
  expect(divs.get(1).props.style.left).to.equal("0em");
  expect(divs.get(1).props.style.top).to.equal("1em");
  expect(divs.get(1).props.className).to.equal("snake");
});
