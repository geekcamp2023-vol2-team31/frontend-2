export const intersection = <T>(
  a: T[],
  b: T[],
  compareFn?: (a: T, b: T) => number
): T[] => {
  let _compareFn = compareFn;
  if (!_compareFn)
    _compareFn = (a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    };
  const _a = [...a].sort(_compareFn);
  const _b = [...b].sort(_compareFn);
  const matched: T[] = [];
  for (let i = 0, j = 0; i < a.length && j < b.length; ) {
    const result = _compareFn(_a[i], _b[j]);
    if (result <= -1) i += 1;
    else if (result >= 1) j += 1;
    else {
      matched.push(_a[i]);
      i += 1;
      j += 1;
    }
  }
  return matched;
};
