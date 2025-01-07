import { checkEntry } from ".";

describe("16-7のテスト", () => {
  test("ルートのファイルを指定するとfileが返る", () => {
    const result = checkEntry("./package.json");
    expect(result).toBe("file");
  });
  test("ルートのディレクトリを指定するとfileが返る", () => {
    const result = checkEntry("./ch16");
    expect(result).toBe("directory");
  });
  test("階層構造のファイルを指定するとfileが返る", () => {
    const result = checkEntry("./ch16/ex06/index.js");
    expect(result).toBe("file");
  });
  test("階層構造のディレクトリを指定するとfileが返る", () => {
    const result = checkEntry("./ch16/ex06");
    expect(result).toBe("directory");
  });
  test("存在しないファイルを指定するとunknownが返る", () => {
    const result = checkEntry("unknown.js");
    expect(result).toBe("unknown");
  });
});
