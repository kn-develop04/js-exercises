## 実行結果の予想

1秒後にHello,Worldが表示されるべきだが、無限ループの処理が終わらず何も表示されない

## 実行結果

何も表示されない

## 理由

setTimeoutは指定秒数後にコールバック関数をタスクキューに追加する関数である。  
一方、無限ループ内の`await null;`はPromiseを返すものであり、マイクロタスクといわれており、マイクロタスクキューに追加される。  
マイクロタスクキューはタスクキューよりも優先されるものであり、優先されているマイクロタスクキューでは常に無限ループ処理が行われるため、setTimeoutは実行まちの状態となり、何も表示されない。

参考：https://zenn.dev/estra/books/js-async-promise-chain-event-loop/viewer/d-epasync-task-microtask-queues
