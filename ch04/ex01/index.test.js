import { add, sub, mul, div } from ".";

describe("Complex Number Operations", () => {
  describe("足し算", () => {
    test("結果が整数", () => {
      const result = add({ real: 3, imaginary: 2 }, { real: 1, imaginary: 4 });
      expect(result).toEqual({ real: 4, imaginary: 6 });
    });
    test("結果が小数", () => {
      const result = add(
        { real: 0.5, imaginary: 0.6 },
        { real: 0.1, imaginary: 0.2 },
      );
      expect(result).toEqual({ real: 0.6, imaginary: 0.8 });
    });
    test("undefind同士はNaN", () => {
      const result = add(
        { real: undefined, imaginary: undefined },
        { real: undefined, imaginary: undefined },
      );
      expect(result).toEqual({ real: NaN, imaginary: NaN });
    });
    test("Infinityを含むと結果はInfinity", () => {
      const result = add(
        { real: Infinity, imaginary: Infinity },
        { real: 1, imaginary: 1 },
      );
      expect(result).toEqual({ real: Infinity, imaginary: Infinity });
    });
  });

  describe("引き算", () => {
    test("結果が整数", () => {
      const result = sub({ real: 3, imaginary: 2 }, { real: 1, imaginary: 4 });
      expect(result).toEqual({ real: 2, imaginary: -2 });
    });
    test("結果が小数", () => {
      const result = sub(
        { real: 0.5, imaginary: 0.6 },
        { real: 0.1, imaginary: 0.2 },
      );
      expect(result.real).toBeCloseTo(0.4);
      expect(result.imaginary).toBeCloseTo(0.4);
    });
    test("undefind同士はNaN", () => {
      const result = sub(
        { real: undefined, imaginary: undefined },
        { real: undefined, imaginary: undefined },
      );
      expect(result).toEqual({ real: NaN, imaginary: NaN });
    });
    test("Infinityを含むと結果はInfinity", () => {
      const result = sub(
        { real: Infinity, imaginary: Infinity },
        { real: 1, imaginary: 1 },
      );
      expect(result).toEqual({ real: Infinity, imaginary: Infinity });
    });
  });

  describe("かけ算", () => {
    test("結果が整数", () => {
      const result = mul({ real: 3, imaginary: 2 }, { real: 1, imaginary: 4 });
      expect(result).toEqual({ real: -5, imaginary: 14 });
    });
    test("結果が小数", () => {
      const result = mul(
        { real: 0.5, imaginary: 0.6 },
        { real: 0.1, imaginary: 0.2 },
      );
      expect(result.real).toBeCloseTo(-0.07);
      expect(result.imaginary).toBeCloseTo(0.16);
    });
    test("undefind同士はNaN", () => {
      const result = mul(
        { real: undefined, imaginary: undefined },
        { real: undefined, imaginary: undefined },
      );
      expect(result).toEqual({ real: NaN, imaginary: NaN });
    });
    test("Infinity同士はInfinity", () => {
      const result = mul(
        { real: Infinity, imaginary: Infinity },
        { real: Infinity, imaginary: Infinity },
      );
      expect(result).toEqual({ real: Infinity, imaginary: Infinity });
    });
  });

  describe("割り算", () => {
    test("結果が小数", () => {
      const result = div({ real: 3, imaginary: 2 }, { real: 1, imaginary: 4 });
      //(緩いが)結果が小数になる場合は0.5までの誤差を許容する
      expect(result.real).toBeCloseTo(0.65, 1);
      expect(result.imaginary).toBeCloseTo(-0.58, 1);
    });
    test("undefind同士はNaN", () => {
      const result = div(
        { real: undefined, imaginary: undefined },
        { real: undefined, imaginary: undefined },
      );
      expect(result).toEqual({ real: NaN, imaginary: NaN });
    });
    test("Infinityを含むと結果はInfinity", () => {
      const result = div(
        { real: Infinity, imaginary: Infinity },
        { real: Infinity, imaginary: Infinity },
      );
      expect(result).toEqual({ real: Infinity, imaginary: Infinity });
    });
  });
});
