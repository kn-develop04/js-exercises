/**
- 入力はコマンドライン引数から受け取る
- Issue を作成できる
ex) node ./ch16/ex08/index.js add "{タイトル}" "{内容"
- 指定した Issue をクローズできる
ex)
- オープンな Issue の Id と Title の一覧を表示できる
 ex)node index.js get
- `-h`または`--help`オプションで使い方が確認できる
- `-v`または`--verbose`オプションで HTTP ログを出力する
 */
//https://docs.github.com/ja/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28

import { Octokit } from "octokit";
import dotenv from "dotenv";
dotenv.config();

// コマンドライン引数の取得
const args = process.argv.slice(2);

// ヘルプメッセージを表示する関数
function showHelp() {
  console.log(`
Usage:
  node index.js <command> [options]

Commands:
  get                - オープンなイシュ―のリストを取得
  add <Title> <body> - 新しいイシュ―を追加
  close <issue_id>   - イシュ―をクローズする

Options:
  -v, --verbose      - HTTPリクエストの詳細ログを表示
  -h, --help         - このヘルプメッセージを表示
  `);
}

// コマンドライン引数からverboseオプションを確認
let verbose = false;
if (args.includes("--verbose") || args.includes("-v")) {
  verbose = true;
}

// verboseログを出力する関数
function verboseLog(options, response) {
  if (verbose) {
    console.log(
      `リクエスト: ${options.method} ${options.hostname}${options.path}`,
    );
    console.log(`レスポンス: ${response.statusCode}`);
  }
}

// コマンドがヘルプ表示を要求している場合
if (args.includes("--help") || args.includes("-h")) {
  showHelp();
  process.exit(0); // ヘルプを表示した後にプログラムを終了
}

// GitHubのアクセストークン（環境変数から取得）
const accessToken = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: accessToken });

// リポジトリ情報
const owner = "kn-develop04";
const repo = "js-exercises";

// コマンドライン引数から処理するコマンドを取得
const input = args[0];

async function handleCommands() {
  switch (input) {
    case "get": {
      try {
        const result = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          {
            owner: owner,
            repo: repo,
          },
        );

        const issues = result.data
          .filter((data) => data.state === "open")
          .map((data) => ({
            id: data.id,
            title: data.title,
          }));

        console.log("オープンなイシュ―:");
        issues.forEach((issue) =>
          console.log(`ID: ${issue.id}, タイトル: ${issue.title}`),
        );

        verboseLog(
          {
            method: "GET",
            hostname: "api.github.com",
            path: `/repos/${owner}/${repo}/issues`,
          },
          { statusCode: result.status },
        );
      } catch (error) {
        console.error("イシュ―の取得エラー:", error);
      }
      break;
    }
    case "add": {
      const title = args[1] || "バグを見つけた";
      const body = args[2] || "コードに問題があります。";

      try {
        const result = await octokit.request(
          "POST /repos/{owner}/{repo}/issues",
          {
            owner: owner,
            repo: repo,
            title: title,
            body: body,
          },
        );

        console.log(`イシュ―が作成されました: ${result.data.html_url}`);

        verboseLog(
          {
            method: "POST",
            hostname: "api.github.com",
            path: `/repos/${owner}/${repo}/issues`,
          },
          { statusCode: result.status },
        );
      } catch (error) {
        console.error("イシュ―の作成エラー:", error);
      }
      break;
    }
    case "close": {
      const issueId = args[1];
      if (!issueId) {
        console.error("クローズするイシュ―のIDを指定してください。");
        showHelp();
        process.exit(1);
      }

      try {
        const result = await octokit.request(
          "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
          {
            owner: owner,
            repo: repo,
            issue_number: parseInt(issueId),
            state: "closed",
          },
        );

        console.log(`イシュ― #${issueId} はクローズされました。`);

        verboseLog(
          {
            method: "PATCH",
            hostname: "api.github.com",
            path: `/repos/${owner}/${repo}/issues/${issueId}`,
          },
          { statusCode: result.status },
        );
      } catch (error) {
        console.error("イシュ―のクローズエラー:", error);
      }
      break;
    }
    default:
      console.error("不明なコマンドです。");
      showHelp();
      process.exit(1);
  }
}

// 実行する
handleCommands();
