import fs from "fs";

function truncateFile(filePath, newSize) {
  fs.truncate(filePath, newSize, (err) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log(`ファイル生成`);
    }
  });
}

truncateFile("./ch16/ex06/output.txt", 100);
