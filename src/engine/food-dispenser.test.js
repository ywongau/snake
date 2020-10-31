import dispenseFood from './food-dispenser';
import { expect } from 'chai';

describe('util', () => {
  it('should drop food at first location when random number is 0 ', () => {
    const width = 20;
    const height = 10;
    const randomNumber = () => 0;
    expect(dispenseFood(randomNumber, width, height)([])).to.deep.equal([0, 0]);
  });

  it('should drop food at last location when random number is 0.999999', () => {
    const width = 20;
    const height = 10;
    const randomNumber = () => 0.99999999;
    expect(dispenseFood(randomNumber, width, height)([])).to.deep.equal([19, 9]);
  });

  it('should drop food at second last location when random number is 0.999999 and snake is at [9, 9]', () => {
    const width = 20;
    const height = 10;
    const randomNumber = () => 0.99999999;
    expect(dispenseFood(randomNumber, width, height)([[19, 9]])).to.deep.equal([
      19,
      8
    ]);
  });
});
