export const defaultCompareFn = <T>(a: T, b: T) => {
  if (a < b) return -1;
  else if (a > b) return 1;
  return 0;
};
