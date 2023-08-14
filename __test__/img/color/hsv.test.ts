import { calcH, calcS, calcV } from "../../../src/img/color/hsv";

describe("hsv変換", () => {
  it("RGB(210,70,120)の色相は339", () => {
    const rgb = [210, 70, 120];
    const realHRaw = 60 * ((70 - 120) / (210 - 70)); // = -21.4285
    const realH = Math.floor(realHRaw + 360);

    expect(calcH(rgb)).toBe(realH);
  });

  it("RGB(45,175,90)の彩度は74", () => {
    const rgb = [45, 175, 90];
    const realSRaw = (175 - 45) / 175; // = 0.74285....
    const realS = Math.floor(realSRaw * 100);

    expect(calcS(rgb)).toBe(realS);
  });

  it("RGB(45,175,90)の明度は69", () => {
    const rgb = [45, 175, 90];
    const realV = Math.floor((175 / 255) * 100);

    expect(calcV(rgb)).toBe(realV);
  });
});
