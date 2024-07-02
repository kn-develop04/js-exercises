// class TypeMap extends Map {
//   constructor(keyType, valueType, entries) {
//     if (entries) {
//       for (let [k, v] of entries) {
//         if (typeof k != keyType || typeof v !== valueType) {
//           throw new TypeError(`Wrong type for entry [${k},${v}]`);
//         }
//       }
//     }

//     super(entries);
//     this.keyType = keyType;
//     this.valueType = valueType;
//   }

//   set(key, value) {
//     if (this.keyType && typeof key !== this.keyType) {
//       throw new TypeError(`${key} is not of type ${this.keyType}`);
//     }

//     return super.set(key, value);
//   }
// }

export class TypeMap {
  constructor(keyType, valueType, entries) {
    this.map = new Map();
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k},${v}]`);
        }
        this.map.set(k, v);
      }
    }
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // キーと値の型チェックを行い、Map インスタンスに追加する
  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }

    return this.map.set(key, value);
  }
}
