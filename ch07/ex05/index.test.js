import {
  popNonDestroy,
  pushNonDetroy,
  shiftNonDestroy,
  unshiftNonDestroy,
  sortNonDestroy,
} from "./";

describe("非破壊関数のテスト", () => {
  const ary = [1, 2, 3, 4, 5];
  test("pop", () => {
    expect(popNonDestroy(ary)).toStrictEqual([1, 2, 3, 4]);
  });
  test("push", () => {
    expect(pushNonDetroy(ary, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
  test("shift", () => {
    expect(shiftNonDestroy(ary)).toStrictEqual([2, 3, 4, 5]);
  });
  test("unshift", () => {
    expect(unshiftNonDestroy(ary, 0)).toStrictEqual([0, 1, 2, 3, 4, 5]);
  });
  test("sort", () => {
    expect(sortNonDestroy(ary, (a, b) => b - a)).toStrictEqual([5, 4, 3, 2, 1]);
  });
});
