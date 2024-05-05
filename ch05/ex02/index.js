export function convertAtIfPattern(strBeforeConvet) {
  let strAtferConvet = "";
  for (const str of strBeforeConvet) {
    if (str === "\0") {
      strAtferConvet += "\\0";
    } else if (str === "\b") {
      strAtferConvet += "\\b";
    } else if (str === "\t") {
      strAtferConvet += "\\t";
    } else if (str === "\n") {
      strAtferConvet += "\\n";
    } else if (str === "\v") {
      strAtferConvet += "\\v";
    } else if (str === "\f") {
      strAtferConvet += "\\f";
    } else if (str === "\r") {
      strAtferConvet += "\\r";
    } else if (str === '"') {
      strAtferConvet += '\\"';
    } else if (str === "'") {
      strAtferConvet += "\\'";
    } else if (str === "\\") {
      strAtferConvet += "\\\\";
    } else {
      strAtferConvet += str;
    }
  }
  return strAtferConvet;
}

export function convertAtSwitchPattern(strBeforeConvet) {
  let strAtferConvet = "";
  for (const str of strBeforeConvet) {
    switch (str) {
      case "\0":
        strAtferConvet += "\\0";
        break;
      case "\b":
        strAtferConvet += "\\b";
        break;
      case "\t":
        strAtferConvet += "\\t";
        break;
      case "\n":
        strAtferConvet += "\\n";
        break;
      case "\v":
        strAtferConvet += "\\v";
        break;
      case "\f":
        strAtferConvet += "\\f";
        break;
      case "\r":
        strAtferConvet += "\\r";
        break;
      case '"':
        strAtferConvet += '\\"';
        break;
      case "'":
        strAtferConvet += "\\'";
        break;
      case "\\":
        strAtferConvet += "\\\\";
        break;
      default:
        strAtferConvet += str;
    }
  }
  return strAtferConvet;
}
