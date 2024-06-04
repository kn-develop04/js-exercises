const defalutObj = {};
Object.defineProperty(defalutObj, "a", {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
});

const convertObj = {};
Object.defineProperty(convertObj, "a", {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false,
});

//プロパティの変更
defalutObj.a = 2;
console.log(defalutObj); //{ a: 2 }
//errorが発生するのでコメントアウト
// convertObj.a=2; // writable 属性がfalseのため変更できない。 => Cannot assign to read only property 'a' of object '#<Object>'
// console.log(convertObj)

//hasOwnProperty
console.log(defalutObj.hasOwnProperty("a")); //true
console.log(convertObj.hasOwnProperty("a")); //true
console.log(defalutObj.hasOwnProperty("toString")); //false
console.log(convertObj.hasOwnProperty("toString")); //false

//propertyIsEnumerable
console.log(defalutObj.propertyIsEnumerable("a")); //true
console.log(convertObj.propertyIsEnumerable("a")); //false => enumerable属性がfalseのため
console.log(defalutObj.propertyIsEnumerable("toString")); //false
console.log(convertObj.propertyIsEnumerable("toString")); //false

//プロパティの削除
console.log(delete defalutObj.a); // true
// delete convertObj.a // configurable 属性がfalseのため削除できない。 => Cannot delete property 'a' of #<Object> errorが発生するのでコメントアウト
