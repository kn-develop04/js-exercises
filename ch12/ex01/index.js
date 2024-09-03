function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

//このタイミングでcounterIterが呼ばれる
const iterater = counterIter(3);
// Symbol.iteratorをよんでみる
console.log(iterater[Symbol.iterator]());
/** 結果
   * counterIter: Symbol.iterator
   * {
   * next: [Function: next],
   * return: [Function: return],
   * throw: [Function: throw],
   * [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}
   * 
   */
//nextが呼ばれる操作いろいろ
console.log(iterater.next()); //{ value: 1, done: false }

console.log(iterater.next()); //{ value: 2, done: false }
console.log(iterater.next()); //{ value: 3, done: false }
console.log(iterater.next()); //{ value: undefined, done: true } 4回目はmaxを超えるのでfinnalyが呼ばれる

for (const val of iterater) {
  console.log(val);
  /**for結果
   * 1
   * 2
   * 3
   */
}

//throwが呼ばれる操作
iterater.throw("Error!");
const gen = counterGen(4);
// Symbol.iteratorをよんでみる
console.log(gen[Symbol.iterator]());
/**
 * counterIter: Symbol.iterator
 * {
 * next: [Function: next],
 * return: [Function: return],
 * throw: [Function: throw],
 * [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}
 */

//nextが呼ばれる操作いろいろ nextが呼ばれたときにcounterGenが表示される(呼ばれる)
console.log(gen.next()); //{ value: 1, done: false }
console.log(gen.next()); //{ value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: false }
console.log(gen.next()); //{ value: undefined, done: true } 5回目はmaxを超えるのでfinnalyが呼ばれる
for (const val of gen) {
  console.log(val);
  /**for結果
   * 1
   * 2
   * 3
   * 4
   */
}
