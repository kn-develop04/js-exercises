import { retryWithExponentialBackoff } from ".";
import { jest } from "@jest/globals";

describe("練習問題11-16", () => {
  jest.useFakeTimers(); // タイマー機能をモック

  it("funcがtrueを返す時、callcackの結果はtrue", () => {
    const func = jest.fn(() => true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("funcがfalseを常に返す時maxRetry後にfalseをcallbackが返す", () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    expect(func).toHaveBeenCalledTimes(1); // 初回の呼び出し
    jest.advanceTimersByTime(1000); // 1秒経過
    expect(func).toHaveBeenCalledTimes(2); // 2回目の呼び出し
    jest.advanceTimersByTime(2000); // 2秒経過
    expect(func).toHaveBeenCalledTimes(3); // 3回目の呼び出し
    jest.advanceTimersByTime(4000); // 4秒経過
    expect(func).toHaveBeenCalledTimes(4); // 最大リトライ回数
    expect(callback).toHaveBeenCalledWith(false);
  });
});
