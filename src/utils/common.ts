export const exists = (value: any) => {
  return value !== undefined || value !== null;
};

export const defaultVal = (v: any, d: any) => {
  if (exists(v)) {
    return v;
  }
  return d;
};
