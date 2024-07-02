import { returnArray, returnSquared, timeNow } from ".";
describe("練習問題8-1のテスト", () => {
  test("配列を返す(returnArray)", () => {
    expect(returnArray(2, "c")).toStrictEqual(["c", "c"]);
    expect(returnArray(0, "c")).toStrictEqual([]);
  });

  test("2乗数値を返す(returnSquared)", () => {
    expect(returnSquared(1)).toBe(1);
    expect(returnSquared(3)).toBe(9);
  });

  test("現在時刻のプロパティを含むオブジェクトを返す(timeNow)", () => {
    const result = timeNow();
    expect(result).toHaveProperty("now");
    expect(result.now).toBeInstanceOf(Date);
  });
});
