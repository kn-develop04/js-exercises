import { counter } from ".";

describe("12-3のテスト", () => {
  let count;
  beforeEach(() => {
    count = counter();
  });

  test("3回呼び出すと1,2,3が返る", () => {
    expect(count.next().value).toBe(1);
    expect(count.next().value).toBe(2);
    expect(count.next().value).toBe(3);
  });
  test("3回呼び出した後thorw()を呼ぶと、直後の呼び出し値は1から始まる", () => {
    expect(count.next().value).toBe(1);
    expect(count.next().value).toBe(2);
    expect(count.next().value).toBe(3);
    count.throw();
    expect(count.next().value).toBe(1);
    expect(count.next().value).toBe(2);
  });
});
