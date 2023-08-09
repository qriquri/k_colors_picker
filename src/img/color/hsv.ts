import { max, argmax, min } from "../../utils/number";

const calcHRaw = (colors: number[]) => {
  const maxValue = max(colors);
  const maxIndex = argmax(colors);
  const minValue = min(colors);

  const R = colors[0];
  const G = colors[1];
  const B = colors[2];
  const denominator = maxValue - minValue;

  switch (maxIndex) {
    case 0:
      return 60 * ((G - B) / denominator);
    case 1:
      return 60 * ((B - R) / denominator) + 120;
    case 2:
      return 60 * ((R - G) / denominator) + 240;
    default:
      throw new Error("non");
  }
};

export const calcH = (colors: number[]) => {
  const H = calcHRaw(colors);
  if (0 <= H) {
    return Math.floor(H);
  } else {
    return Math.floor(H + 360);
  }
};

export const calcS = (colors: number[]) => {
  const maxValue = max(colors);
  const minValue = min(colors);
  return Math.floor(((maxValue - minValue) / maxValue) * 100);
};

export const calcV = (colors: number[]) => {
  const maxValue = max(colors);
  return Math.floor((maxValue / 255) * 100);
};
