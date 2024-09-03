export function* primes() {
  let integerVal = integers();
  while (true) {
    // 次の素数を取得
    const prime = integerVal.next().value;
    // 現在の素数を出力
    yield prime;
    // 現在の素数の倍数を除外する
    const filteredVal = filter(integerVal, (num) => num % prime !== 0);
    // 次の素数として更新
    integerVal = filteredVal;
  }
}

function* integers() {
  let n = 2;
  while (true) {
    yield n++;
  }
}

function filter(iteratable, predicate) {
  let iterator = iteratable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}
