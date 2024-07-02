//引数は2つのためかっこが必要、戻り値のかっこも処理が複数のため必要
export const returnArray = (n, c) => {
  let array = [];
  for (let i = 0; i < n; i++) {
    console.log(c);
    array.push(c);
  }
  return array;
};

//引数は1つのためかっこ不要で、戻り値のかっこも不要
export const returnSquared = (x) => x * x;

//引数は不要(かっこは必要)、戻り値のかっこはオブジェクトのため()が必要
export const timeNow = () => ({ now: new Date() });
console.log(timeNow());
