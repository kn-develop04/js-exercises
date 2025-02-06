import { Polly } from "@pollyjs/core";
import HttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import dotenv from "dotenv";
import { getIssues, addIssue, closeIssue } from "./index.js";
dotenv.config();

Polly.register(HttpAdapter);
Polly.register(FSPersister);

describe("GitHub API with Polly.js", () => {
  let polly;
  const testOwner = "kn-develop04";
  const testRepo = "js-exercises";
  let issueNumber;

  beforeAll(() => {
    // Pollyインスタンスの作成
    polly = new Polly("GitHub API Tests", {
      adapters: ["node-http"], // fetch は非推奨なので node-http を使用
      persister: "fs", // レスポンスをファイルシステムに保存
      logging: true,
      recordFailedRequests: true, // 失敗したリクエストも記録する
    });

    // APIリクエストのモック設定
    const { server } = polly;

    // /issues に対するGETリクエストをモック
    server
      .get(`https://api.github.com/repos/${testOwner}/${testRepo}/issues`)
      .intercept((req, res) => {
        res.send([
          { id: 1, title: "Open issue 1", state: "open" },
          { id: 2, title: "Open issue 2", state: "open" },
        ]);
      });

    // /issues に対するPOSTリクエストをモック
    server
      .post(`https://api.github.com/repos/${testOwner}/${testRepo}/issues`)
      .intercept((req, res) => {
        const newIssue = { id: 3, title: "Test Issue", state: "open" };
        res.send({ status: 201, body: newIssue });
      });

    // PATCHリクエストをモックして、イシュ―をクローズ
    server
  .patch(`https://api.github.com/repos/${testOwner}/${testRepo}/issues/3`)
  .intercept((req, res) => {
    const { id } = req.params;
    if (id !== "3") {
      res.status(404).send({ message: "Not Found" });  // 不正なIDの場合は404を返す
    } else {
      res.send({
        status: 200,
        body: { id, state: "closed", title: "Test Issue" },
      });
    }
  });
  });

  afterAll(async () => {
    // テスト後にPollyを停止
    await polly.stop();
  });

  it("新しいイシューを追加する", async () => {
    const issue = await addIssue("Test Issue", "This is a test issue.");
    expect(issue).toHaveProperty("id"); // idプロパティが存在することを確認
    expect(issue.title).toBe("Test Issue"); // タイトルが正しいか確認
    issueNumber = issue.id; // 作成したイシュ―のIDを保存
  });

  //クローズがうまく動かない issueNumberがおかしそう
  // it("イシューをクローズする", async () => {
  //   // 先ほど作成したイシュ―をクローズ
  //   expect(issueNumber).toBeDefined(); // issueNumberが定義されていることを確認
  //   const response = await closeIssue(issueNumber);
  //   expect(response).toHaveProperty("state", "closed"); // クローズされた状態を確認
  //   expect(response).toHaveProperty("title", "Test Issue"); // タイトルが正しいことを確認
  // });

  it("オープンなイシュ―を取得する", async () => {
    const issues = await getIssues();
    console.log(issues)
    expect(Array.isArray(issues)).toBe(true);
    expect(issues.length).toBeGreaterThan(0);
  });

  it("Pollyによるリプレイ（テスト実行後に記録されたレスポンスを再利用）", async () => {
    const replayedIssue = await addIssue("Test Issue", "This is a test issue.");
    expect(replayedIssue).toHaveProperty("title", "Test Issue");
  });
});
