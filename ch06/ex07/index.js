export function assign(target, ...sources) {
  for (const source of sources) {
    if (source !== null && source !== undefined) {
      for (const key of [
        ...Object.getOwnPropertyNames(source),
        ...Object.getOwnPropertySymbols(source),
      ]) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
