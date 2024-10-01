import { createMethodLogger } from ".";

describe("14-6のテスト", () => {
  let originalObj; // 元のオブジェクト
  let proxy; // プロキシオブジェクト
  let history; // メソッド呼び出し履歴

  // 各テストの前に実行されるセットアップ
  beforeEach(() => {
    originalObj = {
      add(a, b) {
        return a + b;
      },
      greet(name) {
        return `Hello, ${name}!`;
      },
    };
    // createMethodLoggerを使ってプロキシと履歴を取得
    ({ proxy, history } = createMethodLogger(originalObj));
  });

  test("メソッド呼び出しが正しく記録されること", () => {
    const result1 = proxy.add(2, 3); // addメソッドを呼び出し
    const result2 = proxy.greet("Alice"); // greetメソッドを呼び出し

    expect(result1).toBe(5); // 結果が正しいこと
    expect(result2).toBe("Hello, Alice!"); // 結果が正しいこと

    // 履歴が正しく記録されていること
    expect(history).toEqual([
      {
        time: expect.any(Date), // 時刻はDateオブジェクト
        methodName: "add", // メソッド名
        parameters: [2, 3], // 引数
      },
      {
        time: expect.any(Date),
        methodName: "greet",
        parameters: ["Alice"],
      },
    ]);
  });

  test("複数のメソッド呼び出しが正しく記録されること", () => {
    proxy.add(1, 2); // addメソッドを呼び出し
    proxy.greet("Bob"); // greetメソッドを呼び出し
    proxy.add(4, 5); // 再度addメソッドを呼び出し

    // 履歴に3件の記録があることを確認
    expect(history.length).toBe(3);

    // 各履歴が正しく記録されていることを確認
    expect(history[0]).toMatchObject({
      methodName: "add",
      parameters: [1, 2],
    });
    expect(history[1]).toMatchObject({
      methodName: "greet",
      parameters: ["Bob"],
    });
    expect(history[2]).toMatchObject({
      methodName: "add",
      parameters: [4, 5],
    });
  });

  // プロパティアクセスが記録されないことをテスト
  test("プロパティアクセスが記録されないこと", () => {
    proxy.nonExistentProperty = "test"; // 存在しないプロパティにアクセスを試みる
    expect(history.length).toBe(0); // 履歴には何も記録されていないことを確認
  });
});
