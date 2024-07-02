import { sequenceToObject } from ".";
describe("練習問題8-5のテスト", () => {
  test("偶数奇数のペアの形式のオブジェクトを返す", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toStrictEqual({ a: 1, b: 2 });
    const arr = ["a", 1, "b", 2];
    expect(sequenceToObject(...arr)).toEqual({ a: 1, b: 2 });
  });

  test("数が奇数の場合、エラーがスローされること", () => {
    expect(() => sequenceToObject("a", 1, "b", 2, 3)).toThrow("値の個数が奇数");
    expect(() => sequenceToObject("a", 1, "b")).toThrow("値の個数が奇数");
  });
  it("奇数番目が文字列でない場合、エラーがスローされること", () => {
    expect(() => sequenceToObject("key1", "value1", 123, "value2")).toThrow(
      "奇数番目が文字列ではありません",
    );
    expect(() => sequenceToObject("a", 1, {}, 4)).toThrow(
      "奇数番目が文字列ではありません",
    );
  });
});
