import { primes } from ".";

describe("12-4のテスト", () => {
  test("5回呼び出すとそれぞれ素数が返る", () => {
    const primeGen = primes();
    expect(primeGen.next().value).toBe(2);
    expect(primeGen.next().value).toBe(3);
    expect(primeGen.next().value).toBe(5);
    expect(primeGen.next().value).toBe(7);
    expect(primeGen.next().value).toBe(11);
  });
});
