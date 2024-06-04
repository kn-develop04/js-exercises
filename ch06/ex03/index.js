let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
q.x + q.y;

console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); //true
console.log(p.isPrototypeOf(q)); //true

const obj = {};
const arry = [];
const date = new Date();
const map = new Map();
console.log(Object.prototype.isPrototypeOf(obj)); // true
console.log(Object.prototype.isPrototypeOf(arry)); // true
console.log(Object.prototype.isPrototypeOf(date)); // true
console.log(Object.prototype.isPrototypeOf(map)); // true

console.log(Array.prototype.isPrototypeOf(arry)); // true
console.log(Array.prototype.isPrototypeOf(obj)); // false
console.log(Array.prototype.isPrototypeOf(date)); // false
console.log(Array.prototype.isPrototypeOf(map)); // false

console.log(Date.prototype.isPrototypeOf(date)); // true
console.log(Date.prototype.isPrototypeOf(obj)); // false
console.log(Date.prototype.isPrototypeOf(arry)); // false
console.log(Date.prototype.isPrototypeOf(map)); // false

console.log(Map.prototype.isPrototypeOf(map)); // true
console.log(Map.prototype.isPrototypeOf(obj)); // false
console.log(Map.prototype.isPrototypeOf(arry)); // false
console.log(Map.prototype.isPrototypeOf(date)); // false
