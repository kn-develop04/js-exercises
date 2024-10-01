import { toPrimitive } from ".";

describe("14-4のテスト", () => {
  test("文字列が期待されるとき、ひらがなで扱われる", () => {
    const result = new toPrimitive("あ");
    expect(`${result}`).toBe("あ");
  });

  test("数値が期待されるとき、UTF16コードで扱われる", () => {
    const result = new toPrimitive("あ");
    expect(result - result).toBe(0);
  });

  test("期待される値が判らないとき、ひらがなとして扱われる", () => {
    const result = new toPrimitive("あ");
    expect(result + result).toBe("ああ"); //数値としても文字列としてもとれる式のため、ひらがなの結合扱いになる
  });

  test("50 音順(UTF-16 コード単位順)で<や>で比較", () => {
    const result = new toPrimitive("あ"); //UTF16:3042
    const result2 = new toPrimitive("い"); //UTF16:3043
    expect(result < result2).toBe(true);
    expect(result > result2).toBe(false);
  });

  test("ソートできる", () => {
    const result1 = new toPrimitive("あ"); //UTF16:3042
    const result2 = new toPrimitive("い"); //UTF16:3043
    const result3 = new toPrimitive("う"); //UTF16:3044

    const result = [result2, result3, result1].sort();
    expect(result).toStrictEqual([result1, result2, result3]);
  });

  test("ひらがな1文字以外はエラー", () => {
    expect(() => new toPrimitive("ああ")).toThrow("ひらがな1文字以外");
    expect(() => new toPrimitive("i")).toThrow("ひらがな1文字以外");
    expect(() => new toPrimitive("藍")).toThrow("ひらがな1文字以外");
    expect(() => new toPrimitive("1")).toThrow("ひらがな1文字以外");
  });
});
