export function powerCalculationWithLoop(x, n) {
  if (isNaN(x) || isNaN(n)) throw new Error("値が不正");
  if (n === 0) return 1;
  if (n === 1) return x;

  let result = x;
  for (let i = 1; i < n; i++) {
    result = result * x;
  }
  return result;
}

export function powerCalculationWithRecursion(x, n) {
  if (isNaN(x) || isNaN(n)) throw new Error("値が不正");
  if (n === 0) return 1;
  if (n === 1) return x;
  return x * powerCalculationWithRecursion(x, n - 1);
}
