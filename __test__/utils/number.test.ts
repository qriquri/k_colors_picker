import { isNumber } from "../../src/utils/number";

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
