import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

// HTTPサーバーを開始する関数
function serve(rootDirectory, port) {
  // サーバー作成
  let server = http.createServer();
  server.listen(port, () => {
    console.log(`ポート${port}で待機`);
  });

  server.on("request", (request, response) => {
    // リクエストのパスを取得
    let endpoint = url.parse(request.url).pathname;

    // PUTリクエスト（ファイルアップロード）を処理
    if (request.method === "PUT") {
      let filename = path.join("ch16", "ex10", "file.txt");
      console.log(filename);
      let fileStream = fs.createWriteStream(filename); // 書き込み用のストリームを作成

      // リクエストの内容をファイルに書き込む
      request.pipe(fileStream);

      fileStream.on("finish", () => {
        response.writeHead(201, { "Content-Type": "text/plain" });
        response.end(`ファイルアップロード成功: ${filename}`);
      });

      fileStream.on("error", (err) => {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end(`エラー: ${err.message}`);
      });
    }
    // それ以外のリクエストはファイルを返す
    else {
      let filename = path.resolve(rootDirectory, endpoint.substring(1)); // ファイルパスの取得

      let stream = fs.createReadStream(filename); // ファイルを読み込むストリーム

      stream.once("readable", () => {
        response.writeHead(200, { "Content-Type": "application/octet-stream" });
        stream.pipe(response);
      });

      stream.on("error", (err) => {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end(`ファイルが見つかりません: ${err.message}`);
      });
    }
  });
}

// サーバーを起動（デフォルトで/tmpディレクトリ、ポート8000）
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
