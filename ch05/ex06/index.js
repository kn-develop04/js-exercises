//正常に処理を終えるパターン
function executionOrder() {
  let i = 1;
  console.log("----- executionOrder(正常処理) -----");
  try {
    console.log(`try:${i}番目に呼び出し`); // 1番目
    i++;
  } catch (e) {
    console.log(`catch:${i}番目に呼び出し => エラー内容:${e}`); // 例外が発生しないので呼ばれない
    i++;
  } finally {
    console.log(`finally:${i}番目に呼び出し`); // 2番目
    i++;
  }
  console.log(`関数の最後(finallyブロック外):${i}番目に呼び出し`); // 3番目
}

//正常に処理を終えるパターン②(tryの最後にreturn文あり)
function executionOrder2() {
  let i = 1;
  console.log("----- executionOrder2(tryの最後にreturn文) -----");
  try {
    console.log(`try:${i}番目に呼び出し`); // 1番目
    i++;
    return;
  } catch (e) {
    console.log(`catch:${i}番目に呼び出し => エラー内容:${e}`); // 例外が発生しないので呼ばれない
    i++;
  } finally {
    console.log(`finally:${i}番目に呼び出し`); // 2番目 return文で呼び出し元に戻る前に実行される
    i++;
  }
  console.log(`関数の最後(finallyブロック外):${i}番目に呼び出し`); // return文で呼び出し元に戻るので呼ばれない
}

//tryで例外が発生するパターン
function executionOrder3() {
  let i = 1;
  console.log("----- executionOrder3(tryで例外が発生) -----");
  try {
    console.log(`try:${i}番目に呼び出し`); // 1番目
    i++;
    undefined.p();
  } catch (e) {
    console.log(`catch:${i}番目に呼び出し => エラー内容:${e}`); // 2番目
    i++;
  } finally {
    console.log(`finally:${i}番目に呼び出し`); // 3番目
    i++;
  }
  console.log(`関数の最後(finallyブロック外):${i}番目に呼び出し`); // 4番目
}

executionOrder();
executionOrder2();
executionOrder3();
