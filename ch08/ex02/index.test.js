import { powerCalculationWithLoop, powerCalculationWithRecursion } from ".";
describe("練習問題8-2のテスト", () => {
  test("ループでべき乗計算", () => {
    expect(powerCalculationWithLoop(2, 3)).toBe(8);
    expect(powerCalculationWithLoop(3, 0)).toBe(1);
    expect(() => {
      powerCalculationWithLoop("abc", 3);
    }).toThrow("値が不正");
    expect(() => {
      powerCalculationWithLoop(2, "def");
    }).toThrow("値が不正");
  });

  test("再帰でべき乗計算", () => {
    expect(powerCalculationWithRecursion(2, 3)).toBe(8);
    expect(powerCalculationWithRecursion(3, 0)).toBe(1);
    expect(() => {
      powerCalculationWithRecursion("abc", 3);
    }).toThrow("値が不正");
    expect(() => {
      powerCalculationWithRecursion(2, "def");
    }).toThrow("値が不正");
  });
});
