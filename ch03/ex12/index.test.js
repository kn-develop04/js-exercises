import { equals } from ".";

describe("オブジェクト比較", () => {
  test("同じ並びで値も同じオブジェクトはtrue", () => {
    expect(equals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(true);
  });
  test("違う並びだが、値が同じものはtrue", () => {
    expect(equals({ a: 1, b: 2, c: 3 }, { c: 3, b: 2, a: 1 })).toBe(true);
  });
  test("同じ並びで値が違うオブジェクトはfalse", () => {
    expect(equals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 4 })).toBe(false);
  });
  test("違う並びで値も違うオブジェクトはfalse", () => {
    expect(equals({ a: 1, b: 2, c: 3 }, { a: 1, c: 4, b: 1 })).toBe(false);
  });
});
