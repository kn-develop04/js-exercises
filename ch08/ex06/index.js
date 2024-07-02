//修正後関数
// const m = function (...arg) {
//     console.log(arg[1]);
//   };
//   m("a", "b");

//アロー関数化
const m = (...arg) => console.log(arg[1]);
m("a", "b");
