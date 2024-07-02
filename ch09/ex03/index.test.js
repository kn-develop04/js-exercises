import { C, C2 } from ".";

describe("Cのテスト", () => {
  test("プライベート値を取得できること", () => {
    const c = new C();
    expect(c.getX()).toBe(42);
  });
});

describe("C2のテスト", () => {
  test("プライベート値を取得できること", () => {
    const c2 = C2();
    expect(c2.getX()).toBe(42);
  });
});
