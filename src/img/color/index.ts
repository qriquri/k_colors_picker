import { calcH, calcS, calcV } from "./hsv";

export const rgb2hsv = (colors: number[]) => {
  const H = calcH(colors);
  const S = calcS(colors);
  const V = calcV(colors);

  const hsvColors: number[] = [H, S, V];
  return hsvColors;
};
