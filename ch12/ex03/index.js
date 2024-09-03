export function* counter() {
  let x = 1;
  while (true) {
    try {
      yield x;
      x++;
    } catch (e) {
      x = 0;
    }
  }
}
