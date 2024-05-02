import { getEvenNum } from ".";
test("偶数のプロパティを返す", () => {
  expect(getEvenNum({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })).toStrictEqual({
    b: 2,
    d: 4,
    f: 6,
  });
  expect(
    getEvenNum({ a: 1, b: -Infinity, c: 3, d: 4, e: 5, f: Infinity }),
  ).toStrictEqual({ d: 4 });
});
