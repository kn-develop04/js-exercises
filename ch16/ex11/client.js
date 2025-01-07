import net from "net";

// クライアント接続数
const NUM_CLIENTS = 16000; // ここで接続数を調整
const PORT = 8000;
const HOST = "127.0.0.1";

// クライアント接続を維持する関数
function createClient() {
  const client = net.createConnection(PORT, HOST, () => {
    //接続開始時は何もしない
  });

  client.on("data", (data) => {
    //データを受け取っても何もしない
  });

  client.on("error", (err) => {
    //エラーだけ表示
    console.error("Client error:", err.message);
  });

  // 接続を維持（何も送信しない）
}

for (let i = 0; i < NUM_CLIENTS; i++) {
  createClient();
}
