import { TypeMap } from ".";

describe("11-1のテスト", () => {
  class Foo {}

  const typeMap = new TypeMap();

  test("文字列をStringでセットすると値を取れる", () => {
    typeMap.set(String, "string");
    expect(typeMap.get(String)).toBe("string");
  });

  test("数値をNumberでセットすると値を取れる", () => {
    typeMap.set(Number, 123);
    expect(typeMap.get(Number)).toBe(123);
  });

  test("クラスを正しい命名でセットすると値を取れる", () => {
    const instance = new Foo();
    typeMap.set(Foo, instance);
    expect(typeMap.get(Foo)).toBe(instance);
  });

  test("文字列をNumberでセットするとエラー", () => {
    expect(() => {
      typeMap.set(Number, "string");
    }).toThrow(Error);
  });
});
