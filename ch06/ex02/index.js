const obj = { a: 1 };
const inheritanceObj = Object.create(obj);
console.log(Object.getPrototypeOf(inheritanceObj)); // {a: 1}
