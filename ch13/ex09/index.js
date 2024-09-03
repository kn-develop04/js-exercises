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

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  // 予想
  // 42＝＞42の順で表示される
  //
  // 回答:
  // 42＝＞100の順で表示される
  //
  // 説明:
  // vには1秒後、wait1が解決されて42が入る。anyは1つめがresolveするとそのPromiseの結果を返すため、まずは42が表示される。
  // wait2を待つ間、Promise.any内のwait2が解決される。
  // vには解決された値が入るためwait2の100が入り、100が表示される。
  //
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
async function i2() {
  // 予想
  // C=>B=>A=>[A,B,C]の順で表示される
  //
  // 回答:
  // C=>B=>A=>["A","B","C"]の順で表示される
  //
  // 説明:
  // まず1秒後にlogC、2秒後にlogB、3秒後にlogAが呼ばれるため、C=>B=>Aの順で表示される
  // Promise.allは渡されたプロミスの順番で、履行された値の配列となる。
  // そのため、関数の順番的に["A","B","C"]が最後に表示される。
  //
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  // 予想
  // Y=>42=>B=>0=>Xの順で表示される
  //
  // 回答:
  // Y=>42=>B=>0の順で表示される
  //
  // 説明:
  // Promise.allは並列処理のため、wait1-3が並列処理される。
  // 1秒後、wait1のerrYによりcatchが実行され、メッセージのYが表示された後、log(v)で初期値の42が表示される。
  // その3秒後(catch内のwait3完了)までに、Promise.allのwait2、wait3の処理が実行される。wait2のほうが先に解決され、Bが表示される。
  // その後、wait3でvに0が入る。そして、catch内のwait3解決後のvは0のため、最後のlog(v)で0が表示される。
  // なお、処理errXが実行される際はすでにcatch内で例外処理中のため、実行されていないと思われる
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  // 予想
  // 0=>1=>2=>3=>4=>COMPLETEDの順で表示される
  //
  // 回答:
  // 0=>1=>2=>3=>4=>COMPLETEDの順で表示される
  //
  // 説明:
  // p.thenで、5秒後に0、その4秒後に1、その3秒後に2,その2秒後に3、その1秒後に4が表示される。
  // この処理が終わった後、最終行のp.thenでCOMPLETEDが表示される。
  //
  //
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  // 予想
  // 0=>1=>2=>3=>4=>COMPLETEDの順で表示される
  //
  // 回答:
  // COMPLETED=>4=>3=>2=>1=>0の順で表示される
  //
  // 説明:
  // wait関数でそれぞれ5秒後に0、4秒後に1、3秒後に2、2秒後に3、1秒後に4を表示するはずである。
  // ただし、for文内のthenではwait関数を実行してしまっており、非同期処理が完了するよりも先に最終行のp.thenが実行されるため、COMPLETEDがはじめに表示される。
  // その後、上記のwait関数の秒数が早いものから、つまり4,3,2,1が順に表示される
  //
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i6() {
  // 予想
  // 4=>3=>2=>1=>0=>COMPLETEDの順で表示される
  //
  // 回答:
  // 4=>3=>2=>1=>0=>COMPLETEDの順で表示される
  //
  // 説明:
  //Promise.allは並列処理のため、5秒後に0、4秒後に1、3秒後に2、2秒後に3、1秒後に4を出力する処理が並列に動く
  //よって秒数が早い順、つまり4=>3=>2=>1の順で表示される
  //最後にthenでCOMPLETEDが表示される
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i))),
  ).then(() => log("COMPLETED"));
}

async function i7() {
  // NOTE: i8 との比較用
  // 予想
  // 5が表示される
  //
  // 回答:
  // 10が表示される
  //
  // 説明:
  // vは2つの変数で共用される変数である。
  // vはp1、p2両方で加算されていく。＝＞p1は5、p2も5増えるので、それらを加算した10が表示される。
  //
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  // 予想
  // 10が表示される
  //
  // 回答:
  // 5が表示される
  //
  // 説明:
  // p1でnextの計算が行われた後、wait2で待機する。その間にp2も同様の計算が行われる。例えばi=0のときは、next=0+1がp1,p2でも2秒まちの間に行われる。
  // その結果p1,p2ともに、vには同じ値が入ることになる。それぞれは最終的に5を返すため、5が表示される。
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
