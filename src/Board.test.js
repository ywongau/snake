import App from './Board';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

it('renders snake and food without crashing', () => {
  const snake = [
    [0, 0],
    [0, 1]
  ];
  const food = [2, 2];

  const wrapper = mount(<App snake={snake} food={food}></App>);
  const snakeDivs = wrapper.find('.snake');
  expect(snakeDivs.length).to.equal(2);
  const foodDivs = wrapper.find('.food');
  expect(foodDivs.length).to.equal(1);
});
