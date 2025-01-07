const threads = require("worker_threads");

if (threads.isMainThread) {
  // let sharedBuffer=new SharedArrayBuffer(4);
  let num = 0; // number 型の変数 num
  // let worker = new threads.Worker(__filename,{workerData:sharedArray});
  let worker = new threads.Worker(__filename, { workerData: num });

  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      // Atomics.add(sharedArray,0,1);
      // worker.postMessage("increment");
      num++; // num をインクリメント
    }

    worker.on("message", (message) => {
      // console.log(Atomics.load(sharedArray,0))
      if (message === "increment") {
        num++; // メインスレッドで num をインクリメント
      }
      // 10_000_000回のインクリメントが終了したら最終結果を表示
      if (message === "done") {
        console.log(num); // 最終的な num の値を表示
      }
    });
  });
} else {
  // let sharedArray=threads.workerData;
  // for(let i=0;i<10_000_000;i++){
  //     Atomics.add(sharedArray,0,1)
  // }
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("increment"); // メインスレッドに num をインクリメントするよう要求
  }
  threads.parentPort.postMessage("done");
}
