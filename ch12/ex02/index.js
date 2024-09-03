export function fibonacciIterator() {
  let x = 0,
    y = 1;

  return {
    next() {
      let v = y;
      [x, y] = [y, x + y];
      return { value: v, done: false };
    },
  };
}
