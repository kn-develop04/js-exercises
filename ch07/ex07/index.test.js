import { bubbleSort } from ".";

describe("バブルソートのテスト", () => {
  test("適当な並びの配列", () => {
    expect(bubbleSort([3, 4, 1, 5, 2])).toStrictEqual([1, 2, 3, 4, 5]);
  });
  test("適当な並びの配列(同値含む)", () => {
    expect(bubbleSort([3, 4, 1, 5, 2, 2])).toStrictEqual([1, 2, 2, 3, 4, 5]);
  });
  test("並び替えの必要がない配列", () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5]);
  });
});
