export function createMethodLogger(target) {
  // メソッド呼び出しの履歴を格納
  const methodCallHistory = [];

  const handler = {
    get(target, prop) {
      if (typeof target[prop] === "function") {
        return (...args) => {
          // メソッド呼び出しの詳細を記録
          const methodCall = {
            time: new Date(),
            methodName: prop,
            parameters: args,
          };
          // 履歴に呼び出し情報を追加
          methodCallHistory.push(methodCall);
          // 元のメソッドを呼び出し、その結果を返す
          return target[prop](...args);
        };
      }
      // プロパティが関数でない場合、そのままプロパティを返す
      return target[prop];
    },
  };

  // プロキシ
  const proxy = new Proxy(target, handler);
  // プロキシと呼び出し履歴を返す
  return { proxy, history: methodCallHistory };
}
