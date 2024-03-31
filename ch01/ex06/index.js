export function fib(n) {
  if (n <= 2) {
    return 1;
  } else {
    let fib1 = 1;
    let fib2 = 1;
    let fib3 = 0;
    for (let i = 0; i < n - 2; i++) {
      fib3 = fib1 + fib2;
      fib1 = fib2;
      fib2 = fib3;
    }
    return fib3;
  }
}