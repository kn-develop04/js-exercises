console.log(typeof undefined); // 予想：undefined 結果：undefined
console.log(typeof null); // 予想：object 結果：object
console.log(typeof { a: 10 }); // 予想：object 結果：object
console.log(typeof NaN); // 予想：number 結果：number
console.log(typeof 1); // 予想：number 結果：number

function test() {
  1 + 1;
}
console.log(typeof test); // 予想：function 結果：function
