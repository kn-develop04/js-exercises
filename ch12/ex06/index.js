import fs from "fs";
import path from "path";

export function* walk(rootPath) {
  const stack = [rootPath];

  while (stack.length > 0) {
    const currentPath = stack.pop();
    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      yield { path: currentPath, isDirectory: true };
      const files = fs.readdirSync(currentPath);
      for (const file of files) {
        const fullPath = path.join(currentPath, file);
        stack.push(fullPath);
      }
    } else {
      yield { path: currentPath, isDirectory: false };
    }
  }
}
