import dotenv from "dotenv";
import { getIssues, addIssue, closeIssue } from "./index.js";
import fetchMock from "jest-fetch-mock";

dotenv.config();

// fetchのモックを有効にする
fetchMock.enableMocks();

describe("GitHub APIのテスト", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("getIssues - オープンなイシュ―を取得する", async () => {
    const mockResponse = [
      { id: 1, title: "Issue 1", state: "open" },
      { id: 2, title: "Issue 2", state: "closed" },
      { id: 3, title: "Issue 3", state: "open" },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse)); // mockResponseを設定

    const issues = await getIssues();
    expect(issues).toEqual([
      { id: 1, title: "Issue 1" },
      { id: 3, title: "Issue 3" },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("addIssue - 新しいイシュ―を作成する", async () => {
    const mockResponse = {
      html_url: "https://github.com/kn-develop04/js-exercises/issues/1",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse)); // mockResponseを設定

    const issueUrl = await addIssue("新しいバグ", "詳細な説明");
    expect(issueUrl).toStrictEqual({ id: undefined, title: undefined });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("closeIssue - イシューをクローズする", async () => {
    const mockResponse = {};

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse)); // mockResponseを設定

    const result = await closeIssue(1);
    expect(result).toStrictEqual({ id: undefined, title: undefined });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("getIssues - APIエラー", async () => {
    fetchMock.mockRejectOnce(new Error("APIエラー")); // エラーレスポンスを設定

    try {
      await getIssues();
    } catch (error) {
      expect(error.message).toBe("イシュ―の取得エラー: APIエラー");
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("addIssue - APIエラー", async () => {
    fetchMock.mockRejectOnce(new Error("APIエラー")); // エラーレスポンスを設定

    try {
      await addIssue("タイトル", "ボディ");
    } catch (error) {
      expect(error.message).toBe("イシュ―の作成エラー: APIエラー");
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("closeIssue - APIエラー", async () => {
    fetchMock.mockRejectOnce(new Error("APIエラー")); // エラーレスポンスを設定

    try {
      await closeIssue(1);
    } catch (error) {
      expect(error.message).toBe("イシュ―のクローズエラー: APIエラー");
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
