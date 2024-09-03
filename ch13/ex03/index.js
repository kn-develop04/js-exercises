import * as fs from "node:fs";

export function readdir(path, options = null) {
  return new Promise((resolve, reject) => {
    if (options === null) {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    } else {
      fs.readdir(path, options, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    }
  });
}

export function stat(path, options = null) {
  return new Promise((resolve, reject) => {
    if (options === null) {
      fs.stat(path, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stats);
      });
    } else {
      fs.stat(path, options, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stats);
      });
    }
  });
}
