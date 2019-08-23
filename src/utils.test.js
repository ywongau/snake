import {
  ap,
  dropFood,
  range,
  getIndexOfArrayCorrespondingToChance
} from "./utils";

describe("util", () => {
  it("should apply", () => {
    expect(ap([x => x + 1], [1])).toEqual([2]);
  });
  it("should generate combinations", () => {
    expect(ap(ap([x => y => [x, y]], [0, 1]), [0, 1])).toEqual([
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
    expect(dropFood(randomNumber)(width, height, [])).toEqual([0, 0]);
  });
  it("should drop food at last location when random number is 0.999999", () => {
    const width = 10;
    const height = 10;
    const randomNumber = () => 0.99999999;
    expect(dropFood(randomNumber)(width, height, [])).toEqual([9, 9]);
  });

  it("should drop food at second last location when random number is 0.999999 and snake is at [9, 9]", () => {
    const width = 10;
    const height = 10;
    const randomNumber = ()=>0.99999999;
    expect(dropFood(randomNumber)(width, height, [[9, 9]])).toEqual([8, 9]);
  });

  it("should generate array", () => {
    expect(range(2)).toEqual([0, 1]);
  });

  it("should get index of array based on random value", () => {
    expect(getIndexOfArrayCorrespondingToChance(10, 0.51)).toEqual(5);
  });
});
