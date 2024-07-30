import { sortJapanese, toJapaneseDateString } from ".";

describe("sortJapanese 関数", () => {
  it("大文字・小文字や濁点・半濁点の違いを無視してソートする", () => {
    const input = ["ぽてと", "ちっぷ", "じゃがいも", "イチゴ", "メロン"];
    const expected = ["イチゴ", "じゃがいも", "ちっぷ", "ぽてと", "メロン"];
    const sorted = sortJapanese(input);
    expect(sorted).toEqual(expected);
  });

  it("空の配列を正しく処理する", () => {
    const input = [];
    const sorted = sortJapanese(input);
    expect(sorted).toEqual([]);
  });

  it("単一要素の配列を正しく処理する", () => {
    const input = ["ほげ"];
    const sorted = sortJapanese(input);
    expect(sorted).toEqual(["ほげ"]);
  });
});

describe("toJapaneseDateString 関数", () => {
  it("和暦の日付文字列を正しく生成する", () => {
    const date = new Date(2024, 3, 2);
    const formatted = toJapaneseDateString(date);
    expect(formatted).toBe("令和6年4月2日");
  });

  it("異なる元号（昭和）の日付を正しく処理する", () => {
    const date1 = new Date(1989, 0, 7);
    const formatted1 = toJapaneseDateString(date1);
    expect(formatted1).toBe("昭和64年1月7日");
  });

  it("うるう年を正しく処理する", () => {
    const date = new Date(2020, 1, 29);
    const formatted = toJapaneseDateString(date);
    expect(formatted).toBe("令和2年2月29日");
  });
});
