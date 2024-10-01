export function unwritableAndUnconfigurableObj() {
  const obj = { a: 1 };
  // オブジェクトを凍結し、プロパティの変更を禁止
  Object.freeze(obj);
  return obj;
}

export function writableAndUnconfigurableObj() {
  const obj = { b: 2 };
  // オブジェクトを封印し、プロパティの削除を禁止
  Object.seal(obj);
  return obj;
}

export function nestedUnwritableObj() {
  // ネストされたオブジェクト
  const obj = { c: { d: { e: 3 } } };

  function freezeNested(obj) {
    // 現在のオブジェクトを凍結
    Object.freeze(obj);
    // オブジェクトの全プロパティを取得
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      // プロパティがオブジェクトであれば、再帰的に凍結
      if (typeof obj[prop] === "object" && obj[prop] !== null) {
        freezeNested(obj[prop]);
      }
    });
  }

  // ネストされたオブジェクトを凍結
  freezeNested(obj);
  return obj;
}
