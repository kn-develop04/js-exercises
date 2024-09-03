import fs from "fs/promises";
import path from "path";

export async function fetchSumOfFileSizes(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    // 各ファイルのサイズを取得するための Promise の配列を作成
    const statsPromises = files.map((file) =>
      fs.stat(path.join(directoryPath, file)),
    );

    // すべての Promise が解決するのを待つ
    const statsArray = await Promise.all(statsPromises);

    // 各ファイルのサイズを合計
    const totalSize = statsArray.reduce(
      (total, stats) => total + stats.size,
      0,
    );

    return totalSize;
  } catch (err) {
    throw err;
  }
}
