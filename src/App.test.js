import React from "react";
import App from "./App";
import Board from "./Board";
import { shallow } from "enzyme";
import { expect } from "chai";

it("starts after clicking start", () => {
  const wrapper = shallow(<App></App>);
  const button = wrapper.find("button").first();
  expect(wrapper.find(Board).length).to.equal(0);
  expect(button.text()).to.equal("Start");
  button.props().onClick();
  expect(wrapper.find("button").length).to.equal(0);
  expect(wrapper.find(Board).length).to.equal(1);
});
