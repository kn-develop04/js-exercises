import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirtFileSize(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      if (files.length === 0) return null;
      const filePath = join(path, files[0]);

      return fsPromises.stat(filePath).then((stats) => {
        return stats.size;
      });
    })
    .catch((err) => {
      throw err;
    });
}

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path);
  let total = 0;
  // 各ファイルに対してサイズを取得し、合計を計算
  for (const file of files) {
    const filePath = join(path, file);
    try {
      const stats = await fsPromises.stat(filePath);
      total += stats.size;
    } catch (err) {
      console.log(err);
    }
  }
  return total;
}
