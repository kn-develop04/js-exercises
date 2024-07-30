export class TypeMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    if (
      value instanceof key ||
      (typeof value === "number" && key === Number) ||
      (typeof value === "string" && key === String) ||
      (typeof value === "boolean" && key === Boolean)
    ) {
      this.map.set(key, value);
    } else {
      throw new Error("不正な値");
    }
  }

  get(key) {
    return this.map.get(key);
  }
}
