import { any, catching } from ".";
describe("any関数のテスト", () => {
  const isNonZero = any(
    (n) => n > 0,
    (n) => n < 0,
  );
  test("引数の関数がfalseを返す", () => {
    expect(isNonZero(0)).toBeFalsy();
  });
  test("引数の関数がtrueを返す", () => {
    expect(isNonZero(42)).toBeTruthy();
    expect(isNonZero(-0.5)).toBeTruthy();
  });
});

describe("catching関数のテスト", () => {
  const safeJsonParse = catching(JSON.parse, (e) => {
    return { error: e.toString() };
  });
  test("例外を処理しないケース", () => {
    expect(safeJsonParse('{"a": 1}')).toStrictEqual({ a: 1 });
  });
  test("例外を処理するケース", () => {
    expect(safeJsonParse("{not Json}")).toHaveProperty("error");
  });
});
