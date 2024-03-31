let obj1 = { x: 1 };
obj1.y = 2;
console.log(obj1) //obj1にプロパティが追加できることを確認

let obj2 = { x: 1, y: 2 };
console.log(obj1 === obj2); //結果は別のオブジェクトのため、値は同じだがfalse

export function equals(obj1, obj2) {
  const sort1 = JSON.stringify(Object.entries(obj1).sort());
  const sort2 = JSON.stringify(Object.entries(obj2).sort());
  console.log(sort1);
  if (sort1 === sort2) return true;
  return false;
}
