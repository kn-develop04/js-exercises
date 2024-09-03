import { walk } from ".";
import * as fs from "node:fs";
import * as path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const dirA = path.join(_dirname, "A");
const dirB = path.join(_dirname, "B");
const dirC = path.join(dirB, "C");
const file1 = path.join(dirC, "buz.txt");
const file2 = path.join("./ch13/ex13", "foo.txt");

beforeAll((done) => {
  //Aディレクトリ作成
  fs.mkdir(dirA, { recursive: true }, (err) => {
    if (err) return done(err);
    done();
  });
  //Bディレクトリ作成
  fs.mkdir(dirB, { recursive: true }, (err) => {
    //buz.txt作成
    if (err) return done(err);
    done();
  });
  fs.mkdir(dirC, { recursive: true }, (err) => {
    if (err) return done(err);
    fs.writeFile(file2, "Another file", (err) => {
      if (err) return done(err);
      done();
    });
  });
  fs.writeFile(file1, "Hello, world!", (err) => {
    if (err) return done(err);
    done();
  });
});

test("ディレクトリとファイルが正しく判別されること", async () => {
  const expectedResults = [
    { path: "./ch13/ex13", isDirectory: true },
    { path: "ch13\\ex13\\index.test.js", isDirectory: false },
    { path: "ch13\\ex13\\index.js", isDirectory: false },
    { path: "ch13\\ex13\\foo.txt", isDirectory: false },
    { path: "ch13\\ex13\\B", isDirectory: true },
    { path: "ch13\\ex13\\B\\C", isDirectory: true },
    { path: "ch13\\ex13\\B\\C\\buz.txt", isDirectory: false },
    { path: "ch13\\ex13\\A", isDirectory: true },
  ];
  const result = [];
  (async () => {
    // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
    for await (const elem of walk("./ch13/ex13")) {
      result.push(elem);
    }
    expect(result).toEqual(expectedResults);
  })();
});
