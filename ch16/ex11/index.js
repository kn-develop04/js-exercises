import net from "net";

// HTML フォームの内容
const formHtml = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

// HTTP サーバーを作成
export const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // リクエストを文字列に変換
    const request = data.toString();
    const [requestLine, ...headers] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");
    let body = "";
    if (method === "POST" && path === "/greeting") {
      const contentLengthHeader = headers.find((header) =>
        header.startsWith("Content-Length:"),
      );
      const contentLength = contentLengthHeader
        ? parseInt(contentLengthHeader.split(": ")[1])
        : 0;
      body = request.substring(request.length - contentLength);
    }

    // パスとメソッドに基づいたレスポンス
    if (method === "GET" && path === "/") {
      // GET / でフォームを返す
      socket.write("HTTP/1.1 200 OK");
      socket.write("Content-Type: text/html; charset=UTF-8");
      socket.write(formHtml);
    } else if (method === "POST" && path === "/greeting") {
      // POST /greeting で送信されたデータを返す
      const params = new URLSearchParams(body);
      const name = params.get("name") || "";
      const greeting = params.get("greeting") || "";
      const greetingHtml = `<html><body><h1>Hello, ${name}!</h1><p>${greeting}</p></body></html>`;

      socket.write("HTTP/1.1 200 OK");
      socket.write("Content-Type: text/html; charset=UTF-8");
      socket.write(greetingHtml);
    } else if (method === "GET" || method === "POST") {
      // その他のパスやメソッドに対して 404
      socket.write("HTTP/1.1 404 Not Found");
      socket.write("Content-Type: text/plain; charset=UTF-8");
      socket.write("404 Not Found");
    } else {
      // 許可されていないメソッドには 405
      socket.write("HTTP/1.1 405 Method Not Allowed");
      socket.write("Content-Type: text/plain; charset=UTF-8");
      socket.write("405 Method Not Allowed");
    }

    socket.end();
  });
});

// サーバーのポートとアドレスを指定してリスニング開始
server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
