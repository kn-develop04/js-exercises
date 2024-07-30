export class FileSizeError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileSizeError";
  }
}

// ファイルのパスと許容サイズを引数に受け取る関数
export function checkFileSize(filePath, maxSizeInBytes) {
  // 実際のファイルサイズを取得する処理は省略して、仮のサイズ(1000)を生成。ここで本来はファイルのサイズを取得する想定
  const actualFileSize = 1000;

  if (actualFileSize > maxSizeInBytes) {
    throw new FileSizeError("許容サイズをオーバーしています");
  }
  return true;
}
