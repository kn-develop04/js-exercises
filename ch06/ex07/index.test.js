import { assign } from ".";

describe("Object.assignと等価な関数", () => {
  const target = {};
  const source = { a: "a" };
  const source2 = { a: "b" };
  const defalut = { a: "1", b: "2", c: "3" };
  const symKey = Symbol("key");
  source[symKey] = "SymVal";

  test("Symbolプロパティと文字列プロパティのオブジェクト(引数2つ)", () => {
    const result = assign(target, source);
    expect(result).toBe(Object.assign(target, source));
  });

  test("引数が3つのオブジェクト(プロパティaは上書き)", () => {
    const result = assign(target, source, source2);
    expect(result).toBe(Object.assign(target, source, source2));
  });

  test("デフォルト値で上書き", () => {
    const result = assign(target, defalut);
    expect(result).toBe(Object.assign(target, defalut));
  });

  test("オブジェクトにデフォルト値をコピーした後、オブジェクトのプロパティでデフォルト値を上書き", () => {
    const result = assign({}, defalut, source);
    expect(result).toStrictEqual(Object.assign({}, defalut, source));
  });
});
