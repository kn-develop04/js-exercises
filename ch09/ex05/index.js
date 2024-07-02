export function instanceOf(object, constructor) {
  if (object === null || object === undefined) {
    return false;
  }
  let proto = Object.getPrototypeOf(object);

  // プロトタイプが null になるまで辿り、constructor と一致するか確認
  while (proto !== null) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
