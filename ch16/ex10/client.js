import fs from "fs";
import path from "path";

const filePath = path.resolve("./ch16/ex10/inputFile/50mbfile.txt");

// fetch("http://localhost:8000/ch16/ex10/file.txt", {
//   method: "PUT",
//   body: fs.createReadStream(filePath),
//   duplex: "half",
// })
//   .then((response) => response.text())
//   .then((data) => {
//     console.log(data);
//     console.log(process.memoryUsage());
//   })
//   .catch((error) => console.error("アップロードエラー:", error));

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error("ファイル読み込みエラー:", err);
    return;
  }

  fetch("http://localhost:8000/ch16/ex10/file.txt", {
    method: "PUT",
    body: data,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      console.log(process.memoryUsage());
    })
    .catch((error) => console.error("アップロードエラー:", error));
});
