export class MyArrayLike {
  constructor(length) {
    this.length = length; //lengthプロパティを持たせる
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
