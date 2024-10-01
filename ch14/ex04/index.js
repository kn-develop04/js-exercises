export class toPrimitive {
  constructor(str) {
    if (!/^[\u3040-\u309F]$/.test(str)) {
      throw new Error("ひらがな1文字以外");
    }
    this.str = str;
    this.codePoint = str.charCodeAt(0);
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return this.str;
    } else if (hint === "number") {
      return this.codePoint;
    }
    return this.str;
  }
}
