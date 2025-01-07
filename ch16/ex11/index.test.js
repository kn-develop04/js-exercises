import net from "net";
import { server } from "./index";

beforeAll((done) => {
  // サーバを1回だけ起動
  if (!server.listening) {
    server.listen(8000, () => {
      done();
    });
  } else {
    done();
  }
});

// サーバを停止
afterAll(() => {
  server.close();
});

// リクエストを送信してレスポンスを取得
function sendRequest(request) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(
      { host: "localhost", port: 8000 },
      () => {
        socket.write(request);
      },
    );

    let response = "";
    socket.on("data", (data) => {
      response += data.toString();
    });

    socket.on("end", () => {
      resolve(response);
    });

    socket.on("error", reject);
  });
}

test("GET / に対するフォームのレスポンスが正しい", async () => {
  const request = "GET / HTTP/1.1 Host: localhost";
  const response = await sendRequest(request);
  expect(response).toContain('<form action="/greeting" method="POST">');
  expect(response).toContain('<input type="text" id="name" name="name" />');
});

test("POST /greeting に対するレスポンスが正しい", async () => {
  const postData = "name=John&greeting=Hello";
  const request = `POST /greeting HTTP/1.1 Host: localhost\r\nContent-Length: ${postData.length}\r\n${postData}`;
  const response = await sendRequest(request);
  expect(response).toContain("<h1>Hello, John!</h1>");
  expect(response).toContain("<p>Hello</p>");
});

test("404 エラーが正しく返る", async () => {
  const request = "GET /invalid HTTP/1.1 Host: localhost";
  const response = await sendRequest(request);
  expect(response).toContain("404 Not Found");
});

test("405 エラーが正しく返る", async () => {
  const request = "DELETE / HTTP/1.1 Host: localhost";
  const response = await sendRequest(request);
  expect(response).toContain("405 Method Not Allowed");
});
