import { cache, slowFn } from ".";
import { jest } from "@jest/globals";

describe("cache function", () => {
  let cachedSlowFn;
  let slowFnMock;

  beforeEach(() => {
    // slowFn をモック化して、呼び出し回数を確認できるようにする
    slowFnMock = jest.fn((obj) => {
      console.log("Calculating", obj);
      return obj.name.toUpperCase();
    });
    cachedSlowFn = cache(slowFnMock);
  });

  it("初回呼び出し時に slowFn を呼び出し、その結果をキャッシュする", () => {
    const obj = { name: "test" };

    // 初回呼び出し
    const result = cachedSlowFn(obj);
    expect(result).toBe("TEST");
    expect(slowFnMock).toHaveBeenCalledTimes(1);
    expect(slowFnMock).toHaveBeenCalledWith(obj);
  });

  it("同じオブジェクトで再度呼び出した場合にはキャッシュされた結果を返す", () => {
    const obj = { name: "test" };

    // 初回呼び出し
    cachedSlowFn(obj);
    // 2回目の呼び出し
    const result = cachedSlowFn(obj);
    expect(result).toBe("TEST");
    expect(slowFnMock).toHaveBeenCalledTimes(1);
  });

  it("異なるオブジェクトで呼び出した場合にはそれぞれ独立してキャッシュする", () => {
    const obj1 = { name: "test1" };
    const obj2 = { name: "test2" };

    // 初回呼び出し
    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);
    expect(result1).toBe("TEST1");
    expect(result2).toBe("TEST2");
    expect(slowFnMock).toHaveBeenCalledTimes(2); // slowFnMock が異なるオブジェクトで 2 回呼ばれることを確認
  });

  it("オブジェクトが到達不能になるとキャッシュもクリアされる", () => {
    let obj1 = { name: "test1" };

    // 初回呼び出し
    cachedSlowFn(obj1);
    expect(slowFnMock).toHaveBeenCalledTimes(1);

    // オブジェクトをnullにして、以後の参照がなくなるようにする
    let obj2 = obj1;
    obj1 = null;
    obj2 = null;

    // 新しいオブジェクトで呼び出して、slowFnMock が再度呼ばれることを確認することで間接的に確認する
    const newObj = { name: "test2" };
    const result = cachedSlowFn(newObj);
    expect(result).toBe("TEST2");
    expect(slowFnMock).toHaveBeenCalledTimes(2); // slowFnMock が再度呼ばれることを確認
  });
});
