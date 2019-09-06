import { expect } from "chai";

import { ap, dropFood, range } from "./utils";

describe("util", () => {
  it("should apply", () => {
    expect(ap([x => x + 1], [1])).to.deep.equal([2]);
  });
  it("should generate combinations", () => {
    expect(ap(ap([x => y => [x, y]], [0, 1]), [0, 1])).to.deep.equal([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1]
    ]);
  });
  it("should drop food at first location when random number is 0 ", () => {
    const width = 10;
    const height = 10;
    const randomNumber = () => 0;
    expect(dropFood(randomNumber)(width, height, [])).to.deep.equal([0, 0]);
  });

  it("should drop food at last location when random number is 0.999999", () => {
    const width = 10;
    const height = 10;
    const randomNumber = () => 0.99999999;
    expect(dropFood(randomNumber)(width, height, [])).to.deep.equal([9, 9]);
  });

  it("should drop food at second last location when random number is 0.999999 and snake is at [9, 9]", () => {
    const width = 10;
    const height = 10;
    const randomNumber = () => 0.99999999;
    expect(dropFood(randomNumber)(width, height, [[9, 9]])).to.deep.equal([
      8,
      9
    ]);
  });

  it("should generate array", () => {
    expect(range(2)).to.deep.equal([0, 1]);
  });
});
