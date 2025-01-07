import fs from "fs";
import iconv from "iconv-lite";

fs.readFile("./ch16/ex04/hello.txt", (err, data) => {
  if (err) throw err;
  const text = iconv.decode(data, "shift_jis");
  console.log(text);
});
