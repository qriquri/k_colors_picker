export const isNumber = (value: any) => {
  return !isNaN(Number(value));
};

export const min = (values: number[]) => {
  return Math.min(...values)
}

export const argmin = (values: number[]) => {
  return values.indexOf(min(values))
}

export const max = (values: number[]) => {
  return Math.max(...values)
}

export const argmax = (values: number[]) => {
  return values.indexOf(max(values))
}
