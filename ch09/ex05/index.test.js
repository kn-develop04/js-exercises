import { instanceOf } from ".";

// 基底クラスの定義
class BaseClass {}

// 多段に継承したクラスの定義
class SubClass1 extends BaseClass {}
class SubClass2 extends SubClass1 {}

describe("練習問題9-5のテスト", () => {
  test("多段に継承したクラスのインスタンスと基底クラスのコンストラクタ", () => {
    const obj1 = new SubClass1();
    const obj2 = new SubClass2();

    expect(instanceOf(obj1, BaseClass)).toBe(true); // SubClass1 は BaseClass のインスタンス
    expect(instanceOf(obj2, SubClass1)).toBe(true); // SubClass2 は SubClass1 のインスタンス
    expect(instanceOf(obj2, BaseClass)).toBe(true); // SubClass2 は BaseClass のインスタンスでもある
  });

  test("継承関係にないインスタンスとクラスのコンストラクタ", () => {
    const obj = {};

    expect(instanceOf(obj, BaseClass)).toBe(false); // {} は BaseClass のインスタンスではない
    expect(instanceOf(obj, SubClass1)).toBe(false); // {} は SubClass1 のインスタンスではない
  });

  test("nullとundefined ", () => {
    expect(instanceOf(null, BaseClass)).toBe(false); // null はどのクラスのインスタンスでもない
    expect(instanceOf(undefined, BaseClass)).toBe(false); // undefined もどのクラスのインスタンスでもない
  });
});
