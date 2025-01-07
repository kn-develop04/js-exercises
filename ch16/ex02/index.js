//Ctrl+CでSIGINTが送られ、処理を終了できる
// (Windows)`taskkill /PID {PID} /F`でSIGTERMに近い動作を実現する=>処理の終了

import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
async function main() {
  let childProcess = await startChild(); // これで Promise が解決されて childProcess が返ってくる

  // シグナルをキャッチし、子プロセスに転送する処理
  //SIGINTを書いているのは、ctrl+cで2種類(以上)トラップさせるため。SIGINTはctrl+cと同様のシグナル。
  const signals = ["SIGTERM", "SIGINT"];
  signals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`${signal} を受け取りました。子プロセスに転送します...`);
      child.kill(signal); // ここで子プロセスにシグナルを転送
      process.exit(0); // 親プロセスも終了
    });
  });

  // ここで子プロセスの終了を待機
  let [code, signal] = await childProcess; // ここで終了を待機して、終了コードとシグナルを取得
  console.log(`子プロセス終了 (コード: ${code}, シグナル: ${signal})`);

  // 異常終了の場合、再起動
  if (code !== 0) {
    console.log("子プロセスを再起動します...");
    await main(); // 再起動
  }
}

main();
