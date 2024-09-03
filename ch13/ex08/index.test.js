import { fetchFirstFileSize, fetchSumOfFileSizes } from ".";
import * as fs from "node:fs";
import * as path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const testDir = path.join(_dirname, "test-dir");
const emptyDir = path.join(_dirname, "empty-dir");
const file1 = path.join(testDir, "file1.txt");
const file2 = path.join(testDir, "file2.txt");

beforeAll((done) => {
  //testDir作成
  fs.mkdir(testDir, { recursive: true }, (err) => {
    if (err) return done(err);
    //file1作成
    fs.writeFile(file1, "Hello, world!", (err) => {
      if (err) return done(err);
      //file2作成
      fs.writeFile(file2, "Another file", (err) => {
        if (err) return done(err);
        done();
      });
    });
  });
  //ファイルがないemptyDir作成
  fs.mkdir(emptyDir, { recursive: true }, (err) => {
    if (err) return done(err);
    done();
  });
});

describe("fetchFirstFileSize 関数のテスト", () => {
  test("最初のファイルのサイズを取得できること", async () => {
    const size = await fetchFirstFileSize(testDir);
    expect(size).toBeGreaterThan(0); // サイズが 0 より大きいことを確認
  });

  test("ファイルが存在しない場合は null を返すこと", async () => {
    const size = await fetchFirstFileSize(emptyDir);
    expect(size).toBeNull();
  });
});

describe("fetchSumOfFileSizes 関数のテスト", () => {
  test("ディレクトリ内のすべてのファイルのサイズの合計を取得できること", async () => {
    const totalSize = await fetchSumOfFileSizes(testDir);
    const stats1 = fs.statSync(file1);
    const stats2 = fs.statSync(file2);
    const expectedTotalSize = stats1.size + stats2.size;
    expect(totalSize).toBe(expectedTotalSize);
  });
});
