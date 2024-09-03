import { promises as fs } from "node:fs";
import { join } from "node:path";
export async function fetchFirstFileSize(path) {
  try {
    const files = await fs.readdir(path);
    if (files.length === 0) {
      return null; // ファイルが存在しないので null を返す
    }
    // 最初のファイルのサイズを取得
    const stats = await fs.stat(join(path, files[0]));
    return stats.size;
  } catch (err) {
    throw err;
  }
}

export async function fetchSumOfFileSizes(path) {
  try {
    const files = await fs.readdir(path);

    // 各ファイルのサイズを取得するための Promise の配列を作成
    const statsPromises = files.map((file) => fs.stat(join(path, file)));
    let totalSize = 0;
    // 各ファイルのサイズを順次取得
    for (const file of files) {
      const stats = await fs.stat(join(path, file));
      totalSize += stats.size;
    }

    return totalSize;
  } catch (err) {
    throw err;
  }
}
