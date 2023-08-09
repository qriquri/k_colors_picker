import { isNumber, min, max, argmin, argmax } from "../../src/utils/number";

describe("isNumber", () => {
  it("1はNumber", () => {
    expect(isNumber(1)).toBe(true);
  });
  it("'a'はNumberではない", () => {
    expect(isNumber("a")).toBe(false);
  });
  it("'1'はNumber", () => {
    expect(isNumber("1")).toBe(true);
  });
});

describe("min", () => {
  it("1, 2, 3の中で最小は1", () => {
    const array = [1, 2, 3]
    expect(min(array)).toBe(1)
  })
})

describe("max", () => {
  it("1, 2, 3の中で最大は3", () => {
    const array = [1, 2, 3]
    expect(max(array)).toBe(3)
  })
})

describe("argmin", () => {
  it("1, 2, 3の中で最小値のインデックスは0", () => {
    const array = [1, 2, 3]
    expect(argmin(array)).toBe(0)
  })

  it("1, 2, 1の中で最小値のインデックスは0", () => {
    const array = [1, 2, 1]
    expect(argmin(array)).toBe(0)
  })
})

describe("argmax", () => {
  it("1, 2, 3の中で最大値のインデックスは2", () => {
    const array = [1, 2, 3]
    expect(argmax(array)).toBe(2)
  })

  it("3, 2, 3の中で最大値のインデックスは0", () => {
    const array = [3, 2, 3]
    expect(argmax(array)).toBe(0)
  })
})