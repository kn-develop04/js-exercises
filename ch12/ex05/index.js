import fs from "fs";
export function* readLines(filePath) {
  const BUFFER_SIZE = 1024;
  let file;

  try {
    file = fs.openSync(filePath, "r");
    let buffer = Buffer.alloc(BUFFER_SIZE);
    let fileContent = "";

    while (true) {
      const bytesRead = fs.readSync(file, buffer, 0, BUFFER_SIZE, null);

      if (bytesRead === 0) break; // ファイルの終端に達した場合終了

      fileContent += buffer.toString("utf8", 0, bytesRead);

      let lines = fileContent.split("\n");
      fileContent = lines.pop();

      for (let line of lines) {
        yield line;
      }
    }

    if (fileContent.length > 0) {
      yield fileContent;
    }
  } finally {
    if (file !== undefined) {
      fs.closeSync(file);
    }
  }
}
