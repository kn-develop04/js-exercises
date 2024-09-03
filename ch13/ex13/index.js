import fs from "node:fs";
import path from "node:path";

export async function* walk(rootPath) {
  const stack = [rootPath];

  while (stack.length > 0) {
    const currentPath = stack.pop();
    const stat = fs.statSync(currentPath);

    yield {
      path: currentPath,
      isDirectory: stat.isDirectory(),
    };

    // ディレクトリの場合、内部のファイル/ディレクトリを探索
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(currentPath);
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);
        stack.push(fullPath);
      }
    }
  }
}
