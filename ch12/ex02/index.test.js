import { fibonacciIterator } from ".";
describe("12-2のテスト", () => {
  const fib = fibonacciIterator();
  test("7回呼び出すとそれぞれフィボナッチ数が返る", () => {
    expect(fib.next().value).toBe(1);
    expect(fib.next().value).toBe(1);
    expect(fib.next().value).toBe(2);
    expect(fib.next().value).toBe(3);
    expect(fib.next().value).toBe(5);
    expect(fib.next().value).toBe(8);
    expect(fib.next().value).toBe(13);
  });
});
