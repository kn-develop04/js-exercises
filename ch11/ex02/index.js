export function cache(f) {
  const cacheMap = new WeakMap();
  function cachedSlowFn(obj) {
    if (!cacheMap.has(obj)) {
      const result = f(obj);
      cacheMap.set(obj, result);
    }
    return cacheMap.get(obj);
  }

  return cachedSlowFn;
}
//文字列を大文字する処理が時間がかかるものとする
export function slowFn(obj) {
  console.log("Calculating", obj);
  return obj.name.toUpperCase();
}
