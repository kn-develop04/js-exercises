function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
  throw new Error("X");
};
const errY = () => {
  throw new Error("Y");
};

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  // 予想
  // A=>Cの順で表示される
  // 例外はキャッチできない
  //
  // 回答
  // エラーはキャッチできない(Error: X)
  // Cの後にAが表示される
  //
  // 説明
  // errXはPromise.then内のエラーとして扱われ、catchされない(非同期では、通常の例外機構は実行されない)
  // 出力は、wait(0).then(logA)が非同期で実行を終える前に、finallyが実行されるため、C=＞Aの順で表示される。
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  // 予想
  // A=>B>100の順で表示される
  //
  // 回答
  // A=>B>100の順で表示される
  //
  // 説明
  // 1つ目のthenでAが表示され40が返される。40は次のthenの引数となる。
  // その後、2つめのthenでBが表示され100が返される(40は使わない)。
  // 最後のthenでは返された100を表示する。
  //

  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  // 予想
  // B=>A=>40が表示される
  //
  // 回答
  // B=>A=>40が表示される
  //
  // 説明
  // 2つめのthenが関数ではなくPromiseのため、即時実行されてBが表示される。
  // 続いて、1つめのthenのlogAが実行されてAが表示され、40が返される。
  // 最後のthenで返した40が表示される。
  //
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  // 予想
  // A=>B=>Cの順で表示される
  //
  // 回答
  // A=>B=>Cの順で表示される
  //
  // 説明
  // 1行目、1秒後にAが表示される。
  // 1行目の解決後、wait1が解決されBが表示される。
  // 2行目の解決後、wait2が解決されCが表示される。
  //

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  // 予想
  // A=>B=>Cの順で表示される
  //
  // 回答
  // A=>B=>Cの順で表示される
  //
  // 説明
  // wait1が解決してAが表示される。
  // wait2の後、pが呼ばれてBが表示される。
  // そのあと、最後のthenが呼ばれてCが表示される
  //
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  // 予想
  // X=>Aの順で表示される
  //
  // 回答
  // X=>Aの順で表示される
  //
  // 説明
  // 1秒後errXが実行される。
  // エラーが発生すると2つめのthenはスキップされ、catchで捕捉されたエラーが表示される
  // 最後にfinallyでAが表示される。
  //
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  // 予想
  // Y=>Aの順で表示される
  //
  // 回答
  // Y=>Aの順で表示される
  //
  // 説明
  // 1秒後、1つめのthenで42が返る(利用されない)
  // 2つのthenのエラーはcatchで捕捉されてYが表示される。
  // finallyはY表示後（最後）に実行されAが表示される。
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // 予想
  // Y=>Aの順で表示される(then(r, c) と then(r).catch(c)は等しい)
  //
  // 回答
  // Aが表示された後、Yはエラーとなる(then(r, c) と then(r).catch(c)は等しくない)
  //
  // 説明
  // 1秒後、1つめのthenで42が返る(が使われない)
  // その後2つめのthenが実行されるが、第1引数がnullでないため.then(errY)と同じように実行され、Cでは捕捉されない(=エラーになる)。
  // finnalyは実行され、Ａが表示される。
  //

  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}
function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  // 予想
  // Xが表示される
  //
  // 回答
  // Xが表示される
  //
  // 説明
  // new PromiseでerrXが実行されエラーがスローされる。
  // スローされたエラーはcatchで捕捉され、Xが表示される。
  //
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // 予想
  // エラー(errXの期待通りのものではない)が表示される
  //
  // 回答
  // エラー(Error: X)が表示される
  //
  // 説明
  // setTimeout内とnew Promise内はスコープが異なる
  // setTimeoutのerrXは、new Promiseのチェーンではない、setTimeout関数のエラーとなるためcatchで捕捉されない。
  //

  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}
