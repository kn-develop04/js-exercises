//LF（\n） -> CR(\r)+LF(\n)
export function LfToCrlf(str) {
  let newStr = str.replace(/\n/g, "\r\n");
  return newStr;
}

//CR(\r)+LF（\n） -> LF（\n）
export function CrlfToLf(str) {
  if (str.includes("\r\n")) {
    let newStr = str.replace(/\r\n/g, "\n");
    return newStr;
  } else {
    return str;
  }
}
