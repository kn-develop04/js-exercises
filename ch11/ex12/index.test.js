import { FileSizeError, checkFileSize } from ".";

describe("11-12のテスト", () => {
  it("想定サイズを超えるとFileSizeErrorが発生すること", () => {
    const filePath = "/path/to/file.txt"; // ダミーのファイルパス。本来はここでファイルを指定する想定
    const maxSizeInBytes = 900;

    expect(() => {
      checkFileSize(filePath, maxSizeInBytes);
    }).toThrow(FileSizeError);
  });

  it("想定サイズ内だとエラーが発生しないこと", () => {
    const filePath = "/path/to/file.txt"; // ダミーのファイルパス
    const maxSizeInBytes = 2000;

    expect(() => {
      checkFileSize(filePath, maxSizeInBytes);
    }).not.toThrow();
  });
});
