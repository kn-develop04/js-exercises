import { TypeMap } from ".";

describe("練習問題9-6のテスト", () => {
  test("正しい型制約で TypeMap インスタンスを作成すること", () => {
    const entries = [
      ["key1", 1],
      ["key2", 2],
    ];
    const typeMap = new TypeMap("string", "number", entries);
    expect(typeMap.keyType).toBe("string");
    expect(typeMap.valueType).toBe("number");
  });

  test("不正な値でエラーが発生すること", () => {
    const entries = [
      ["key1", 1],
      ["key2", "2"], // 値の型が異なる
    ];
    expect(() => new TypeMap("string", "number", entries)).toThrow(TypeError);
  });

  test("正しいキーと値でセットできること", () => {
    const typeMap = new TypeMap("string", "number");
    typeMap.set("key", 10);
    expect(typeMap.map.get("key")).toBe(10);
  });

  test("不正なキーでエラーが発生すること", () => {
    const typeMap = new TypeMap("string", "number");
    expect(() => typeMap.set(1, 10)).toThrow(TypeError);
  });

  test("不正な値の型でエラーが発生すること", () => {
    const typeMap = new TypeMap("string", "number");
    expect(() => typeMap.set("key", "value")).toThrow(TypeError);
  });
});
