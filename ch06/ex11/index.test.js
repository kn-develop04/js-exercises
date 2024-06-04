import { PolarCoordinate } from ".";

describe("極座標(r,theta)とデカルト座標(x,y)の変換", () => {
  //デカルト座標の初期値xは3、yは4にする
  PolarCoordinate.x = 3;
  PolarCoordinate.y = 4;

  test("xのゲッターの結果は3", () => {
    expect(PolarCoordinate.x).toBe(3);
  });

  test("yのゲッターの結果は3", () => {
    expect(PolarCoordinate.y).toBe(4);
  });

  test("xに数字以外が入るとエラー", () => {
    expect(() => {
      PolarCoordinate.x = "a";
    }).toThrow("xがNaN");
  });

  test("yに数字以外が入るとエラー", () => {
    expect(() => {
      PolarCoordinate.y = "a";
    }).toThrow("yがNaN");
  });

  test("theta(Θ)の結果", () => {
    //結果はテキストp167の実行結果を利用
    expect(PolarCoordinate.theta).toBeCloseTo(0.927295218, 8);
  });

  test("r(偏角)の結果", () => {
    //結果はテキストp167の実行結果を利用
    expect(PolarCoordinate.r).toBe(5);
  });
});
