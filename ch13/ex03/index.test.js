import { readdir, stat } from ".";
import * as fs from "node:fs";
import * as path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const testDir = path.join(_dirname, "test-dir");
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
});

//テスト後、ファイルとディレクトリを削除
afterAll((done) => {
  fs.rm(testDir, { recursive: true, force: true }, (err) => {
    if (err) return done(err);
    done();
  });
});

describe("readdir", () => {
  test("ディレクトリ内のファイル一覧を取得できること", async () => {
    const files = await readdir(testDir);
    expect(files.sort()).toEqual(["file1.txt", "file2.txt"].sort());
  });

  test("オプション付きでディレクトリ内のファイル一覧を取得できること", async () => {
    // `withFileTypes` オプションを指定した場合
    const files = await readdir(testDir, { withFileTypes: true });
    expect(files.length).toBe(2);
    expect(files.every((file) => file.isFile())).toBe(true);
  });
});

describe("stat 関数のテスト", () => {
  test("ファイルのステータス情報を取得できること", async () => {
    const stats = await stat(file1);
    expect(stats).toHaveProperty("isFile");
    expect(stats.isFile()).toBe(true);
  });

  test("ディレクトリのステータス情報を取得できること", async () => {
    const stats = await stat(testDir);
    expect(stats).toHaveProperty("isDirectory");
    expect(stats.isDirectory()).toBe(true);
  });
});
