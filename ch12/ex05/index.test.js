import fs from "fs";
import path from "path";
import { readLines } from ".";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

describe("11-5のテスト", () => {
  const _filename = fileURLToPath(import.meta.url);
  const _dirname = dirname(_filename);
  const testFilePath = path.join(_dirname, "testfile.txt");

  beforeAll(() => {
    // テスト用のファイルを作成
    const content = "Line 1\nLine 2\nLine 3\n";
    fs.writeFileSync(testFilePath, content, "utf8");
  });

  afterAll(() => {
    // テスト用のファイルを削除
    fs.unlinkSync(testFilePath);
  });

  test("ファイルを正しく読み取れること", () => {
    const expectedLines = ["Line 1", "Line 2", "Line 3"];
    const actualLines = [];

    for (const line of readLines(testFilePath)) {
      actualLines.push(line);
    }

    expect(actualLines).toEqual(expectedLines);
  });

  test("空ファイルも正しく処理されること", () => {
    const emptyFilePath = path.join(_dirname, "emptyfile.txt");
    fs.writeFileSync(emptyFilePath, "", "utf8");

    const actualLines = [];

    for (const line of readLines(emptyFilePath)) {
      actualLines.push(line);
    }

    expect(actualLines).toEqual([]);

    fs.unlinkSync(emptyFilePath);
  });
});
