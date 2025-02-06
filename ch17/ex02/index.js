import dotenv from "dotenv";
dotenv.config();

// GitHubのアクセストークン（環境変数から取得）
const accessToken = process.env.GITHUB_TOKEN;
console.log(accessToken);
// リポジトリ情報
const owner = "kn-develop04";
const repo = "js-exercises";

// GitHub APIのベースURL
const baseUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

// オープンなイシュ―を取得する関数
export async function getIssues() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.statusText}`);
    }

    const issues = await response.json();
    // オープンなイシュ―だけを抽出
    const openIssues = issues
      .filter((issue) => issue.state === "open")
      .map((issue) => ({
        id: issue.id,
        title: issue.title,
      }));

    return openIssues;
  } catch (error) {
    throw new Error("イシュ―の取得エラー: " + error.message);
  }
}

// 新しいイシュ―を作成する関数
export async function addIssue(
  title = "バグを見つけた",
  body = "コードに問題があります。",
) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      id: result.id, // idを返す
      title: result.title, // titleを返す
    };
  } catch (error) {
    throw new Error("イシュ―の作成エラー: " + error.message);
  }
}

// イシュ―をクローズする関数
export async function closeIssue(issueId) {
  if (!issueId) {
    throw new Error("クローズするイシュ―のIDを指定してください。");
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: "closed",
      }),
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      id: result.id, // idを返す
      title: result.title, // titleを返す
    };
  } catch (error) {
    throw new Error("イシュ―のクローズエラー: " + error.message);
  }
}
