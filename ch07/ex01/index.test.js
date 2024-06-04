import { MatrixCalc } from ".";
describe("行列の加算、減算算", () => {
  const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const matrix2 = [
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1],
  ];
  const matrix3 = [[], []];
  const matrix4 = [[], []];
  test("加算", () =>
    expect(MatrixCalc(matrix1, matrix2, "加算")).toStrictEqual([
      [10, 10, 10],
      [10, 10, 10],
      [10, 10, 10],
    ]));
  test("加算(空配列)", () =>
    expect(MatrixCalc(matrix3, matrix4, "加算")).toStrictEqual([[], []]));

  test("乗算", () =>
    expect(MatrixCalc(matrix1, matrix2, "乗算")).toStrictEqual([
      [30, 24, 18],
      [84, 69, 54],
      [138, 114, 90],
    ]));
  test("乗算(空配列)", () =>
    expect(MatrixCalc(matrix3, matrix4, "乗算")).toStrictEqual([[], []]));
  test("(現状できない)減算", () =>
    expect(MatrixCalc(matrix1, matrix2, "減算")).toBe("計算できません"));
});
