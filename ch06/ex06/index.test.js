import { returnProperties } from ".";

describe("オブジェクトのプロパティチェック", () => {
  const inheritedObj = Object.create({ inheritedX: 4, inheritedY: 5 });
  test("列挙可の継承プロパティ名が返る", () => {
    expect(returnProperties(inheritedObj)).toStrictEqual([
      "inheritedX",
      "inheritedY",
    ]);
  });
  const OriginalObj = { originalA: 2, originalB: 3 };
  test("独自プロパティ名が返る", () => {
    expect(returnProperties(OriginalObj)).toStrictEqual([
      "originalA",
      "originalB",
    ]);
  });
  const enumerableObj = {};
  Object.defineProperty(enumerableObj, "enuFalse", {
    value: 3,
    enumerable: false,
  });
  test("列挙不可のプロパティ名が返る", () => {
    expect(returnProperties(enumerableObj)).toStrictEqual(["enuFalse"]);
  });
  let complexObj = {};
  complexObj = Object.create({ inheritedX: 4, inheritedY: 5 }); //継承プロパティ
  complexObj.OriginalA = 1; //独自プロパティ
  complexObj.OriginalB = 2; //独自プロパティ
  const symName = Symbol("sym");
  complexObj[symName] = 2; //Symbolの独自プロパティ
  //列挙不可プロパティ
  Object.defineProperty(complexObj, "enuFalse", {
    value: 3,
    enumerable: false,
  });
  test("列挙不可のプロパティ名、列挙可の継承プロパティ名、独自プロパティ名が返る", () => {
    expect(returnProperties(complexObj)).toStrictEqual([
      "OriginalA",
      "OriginalB",
      "enuFalse",
      symName,
      "inheritedX",
      "inheritedY",
    ]);
  });
});
