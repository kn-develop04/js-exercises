import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("1+1 returns 2", () => {
      expect(sum([1, 1])).toBe(2);
    });

    it("return sum of prime numbers up to the fifth(return 28)", () => {
      expect(sum([2, 3, 5, 7, 11])).toBe(28);
    });

    it("0+0 returns 0 ", () => {
      expect(sum([0, 0])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("Factorial of 2(return 2)", () => {
      expect(factorial(2)).toBe(2);
    });

    it("Factorial of 4(return 24)", () => {
      expect(factorial(4)).toBe(24);
    });

    it("Factorial of 0(return 1)", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
