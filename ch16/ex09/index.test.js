import request from "supertest";
import fs from "fs";
import path from "path";
import { server } from "./index";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
describe("16-9のテスト", () => {
  // テスト終了後にサーバーを閉じる
  afterAll((done) => {
    server.close(done);
  });

  test("POST /test/mirror にリクエストした内容を返す", async () => {
    const response = await request(server).post("/test/mirror").send("test");

    expect(response.status).toBe(200);
    expect(response.text).toContain("POST /test/mirror");
    expect(response.text).toContain("test");
  });

  test("ファイルが正しく返される", async () => {
    const testFilePath = path.join(__dirname, "test.txt");
    // ディレクトリが存在しない場合は作成する
    const dir = path.dirname(testFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // テスト用にファイルを作成
    fs.writeFileSync(testFilePath, "TestFile");
    const response = await request(server).get("/ch16/ex09/test.txt");

    expect(response.status).toBe(200);
    expect(response.text).toContain("TestFile");
  });

  test("存在しないファイルにアクセスした場合、404を返す", async () => {
    const response = await request(server).get("/non-existent-file.html");

    expect(response.status).toBe(404);
    expect(response.text).toContain("File not found");
  });
});
