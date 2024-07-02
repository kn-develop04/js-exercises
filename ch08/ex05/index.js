export function sequenceToObject(...values) {
  if (values.length % 2 !== 0) throw new Error("値の個数が奇数");
  const result = {};
  for (let i = 0; i < values.length; i = i + 2) {
    if (typeof values[i] !== "string")
      throw new Error("奇数番目が文字列ではありません");
    result[values[i]] = values[i + 1];
  }
  return result;
}
