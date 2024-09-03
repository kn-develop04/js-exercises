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

async function h1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  // 予想
  // A=>B=>Cの順で表示される
  //
  // 回答:
  // A=>B=>Cの順で表示される
  //
  // 説明:
  // 3秒後待ってAが表示される。その後、2秒待ってBが表示される。最後に1秒待ってCが表示される。
  // 例外は発生しないためcatchは実行されない。
  //
  //
  //
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  // 予想
  // Xが表示される
  //
  // 回答:
  // Xが表示される
  //
  // 説明:
  // new Promiseで発生したエラーはcatchされて、message部分が表示される
  //
  //
  //
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  // 予想
  // エラーが表示される(catchで捕捉されない)
  //
  // 回答:
  // エラーが表示される(catchで捕捉されない)
  //
  // 説明:
  // async () => {errX();で返されるPromiseとnew Promie(...)で返るPromiseは別である
  // そのため、async () => {errX()で発生したエラーはnew Promiseのcatchでは捕捉されない。
  //
  //
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  // 予想
  // Yが表示され、Xは表示されない
  // (Yの例外はキャッチされるがXはキャッチされない)
  //
  // 回答:
  // Error: Yが表示される
  //
  // 説明:
  // p1とp2はともに非同期だが、p2のほうが1秒早くエラーが発生する。
  // 例外はawaitの終了を待つことなく発生し処理が止まるため、早く発生したp2のほうがcatchされ、Yのエラーが表示される
  //
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
h4();
