// デフォルトエクスポート
export default function test3() {
  console.log("hello");
}
// 名前変更を伴うインポート用
export function test5() {
  console.log("hello");
}

//再エクスポート
export { greet1 as greet4 } from "../ex04/index.js";
