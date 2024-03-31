let obj = {
  name: "js太郎",
  set: "man",
  age: 105,
};

for (let data in obj) {
  console.log(`オブジェクトのプロパティ名：${data}`);
}

for (let data of Object.values(obj)) {
  console.log(`オブジェクトの値：${data}`);
}
