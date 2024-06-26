const obj = Object.create({ a: 1, b: 2, 4: "c", 3: "d" }); //プロトタイプ プロパティ名が数値および文字列で列挙化のプロパティを持つ
obj.e = 5; //プロトタイプと同名でない文字列プロパティ
obj[6] = "f"; //プロトタイプと同名でない数値プロパティ
obj.a = 2; //プロトタイプと同名の文字列プロパティ
obj[3] = 3; //プロトタイプと同名の数数値プロパティ
//列挙不可のプロパティ
Object.defineProperty(obj, "b", {
  value: 7,
  enumerable: false,
});

for (let key in obj) {
  console.log(`${key}:${obj[key]}`);
}

/** 結果
 * 3:3 => 独自プロパティ プロパティ名の数値が1番低い
 * 6:f => 独自プロパティ プロパティ名の数値が2番目に低い
 * e:5 => 独自プロパティ プロパティ名が文字列で1番最初に定義
 * a:2 => 独自プロパティ プロパティ名が文字列で2番目に定義
 * 4:c => 継承プロパティ プロパティ名の数値が2番目に低い
 */
