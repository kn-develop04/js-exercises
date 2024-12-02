//できてない。常にタイムアウトが起きる
//nodeでindex.jsとserver.jsを実行する
/**
 * 問1
 */
// WebSocket サーバに接続
// import WebSocket from 'ws';
// // WebSocket サーバへの接続を管理する
// const ws = new WebSocket("ws://localhost:3003");
// const TIMEOUT = 10000; // タイムアウト時間（10秒）

// // リクエスト送信関数
// function sendRequest(requestMessage) {
//   return new Promise((resolve, reject) => {
//     // WebSocket が開いていない場合、接続確立を待つ
//     if (ws.readyState !== WebSocket.OPEN) {
//       ws.once('open', () => {
//         sendMessage(requestMessage, resolve, reject); // 接続が開いたらメッセージ送信
//       });
//       return; // ここで関数を終了し、'open' イベントが来るまで待つ
//     }

//     // すでに接続されている場合
//     sendMessage(requestMessage, resolve, reject);
//   });
// }

// // メッセージ送信とレスポンス受信のロジック
// function sendMessage(requestMessage, resolve, reject) {
//   const requestId = Date.now(); // リクエストIDとしてタイムスタンプを使用
//   const messageToSend = JSON.stringify({ requestId, message: requestMessage });

//   // タイムアウト設定
//   const timeoutId = setTimeout(() => {
//     reject(new Error("タイムアウトしました"));
//   }, TIMEOUT);

//   // リクエストに対応するレスポンスを待機するためのハンドラ
//   const handleMessage = (data) => {
//     let response;
//     try {
//       response = JSON.parse(data.toString()); // レスポンスをパース
//     } catch (error) {
//       return; // 無効なレスポンスは無視
//     }

//     // リクエストIDが一致する場合のみ処理
//     if (response.requestId === requestId) {
//       clearTimeout(timeoutId); // タイムアウトのクリア
//       ws.removeListener("message", handleMessage); // リスナーの削除
//       resolve(response.message); // レスポンスを返す
//     }
//   };

//   // サーバからのメッセージを受け取るイベント
//   ws.on("message", handleMessage);

//   // 接続が切れた場合のエラー
//   ws.on("close", () => {
//     clearTimeout(timeoutId); // タイムアウトのクリア
//     ws.removeListener("message", handleMessage); // リスナーの削除
//     reject(new Error("WebSocket 接続が閉じられました"));
//   });

//   // WebSocket 接続が開かれた後でメッセージを送信
//   ws.send(messageToSend);
// }

// // WebSocket 接続が確立するまで待機
// ws.on("open", () => {
//   console.log("サーバに接続しました");

//   // リクエストメッセージを送信
//   sendRequest("World")
//     .then((response) => {
//       console.log("サーバからの応答:", response);
//     })
//     .catch((error) => {
//       console.error("エラー:", error.message);
//     });
// });

// // WebSocket エラーの処理
// ws.on("error", (error) => {
//   console.error("WebSocket エラー:", error);
// });

// const response = await sendRequest("World");
// console.log(response); // -> "Hello, World"
/**
 * 問2
 */
// const port = 3003;
// const wss = new WebSocketServer({ port });
// // 他のクライアントにメッセージを転送する
// wss.on("connection", (ws) => {
//   ws.on("message", (data) => {
//     console.log("クライアントと接続");
//     const message = data.toString();

//     // リクエストメッセージからrequestIdを抽出
//     let request;
//     try {
//       request = JSON.parse(message); // メッセージをJSONとしてパース
//     } catch (error) {
//       console.error('無効なメッセージ:', message);
//       return;
//     }

//     const { requestId, requestMessage } = request;

//     // "Hello, " を付加してレスポンスメッセージを作成
//     const responseMessage = `Hello, ${requestMessage}`;

//     // リクエストに対するレスポンスを送信
//     const response = {
//       requestId,        // リクエストIDを保持
//       responseMessage,  // 作成したレスポンスメッセージ
//     };

//     // クライアントにレスポンスを送信
//     ws.send(JSON.stringify(response));
//   });
// });

// console.log(`WebSocket サーバがポート ${port} で起動しました`);
