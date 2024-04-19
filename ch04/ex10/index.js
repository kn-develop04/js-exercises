const ricohArry = ["r", "i", "c", "o", "h"];

// 削除前
console.log(ricohArry); // [ 'r', 'i', 'c', 'o', 'h' ]
console.log(ricohArry.length); // 5

// 削除後
delete ricohArry[3];
console.log(ricohArry); // [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(ricohArry.length); // 5
