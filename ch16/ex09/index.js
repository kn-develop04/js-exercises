import express from "express";
import path from "path";
import fs from "fs";
const app = express();

// /test/mirror エンドポイントの実装
app.all("/test/mirror", (req, res) => {
  // 受け取ったリクエストをそのまま返す
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");

  // リクエストメソッド、URL、HTTPバージョンを返す
  res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}`);

  // ヘッダーを返す
  for (const [key, value] of Object.entries(req.headers)) {
    res.write(`${key}: ${value}`);
  }
  res.write("\r\n");

  // リクエストボディをそのままレスポンスに書き込む
  req.pipe(res);
});

// /test/mirror 以外のパスに対して、ローカルディレクトリからファイルを提供
app.all("*", (req, res) => {
  if (req.originalUrl !== "/test/mirror") {
    const filePath = path.join(req.originalUrl.slice(1));
    // ファイルを読み込んで返す
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.status(404).send("File not found");
      } else {
        res.setHeader("Content-Type", "text/plain; charset=UTF-8");
        res.send(data);
      }
    });
  }
});
// ポート番号の設定
const port = parseInt(process.argv[2]) || 8000;
export const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
