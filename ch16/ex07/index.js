import fs from "fs";
export function checkEntry(path) {
  try {
    const stats = fs.statSync(path);
    if (stats.isFile()) {
      return "file";
    } else if (stats.isDirectory()) {
      return "directory";
    }
  } catch (e) {
    return "unknown";
  }
}

const result = checkEntry("./ch16/ex07/index.js");
console.log(result);
