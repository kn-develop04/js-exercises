let symname = Symbol("propname");
let symname2 = Symbol("propname");
console.log(typeof symname);
let obj = {};
obj[symname] = 1;
obj[symname2] = 1;
console.log(obj[symname]);
console.log(obj[symname2]);

let symname3 = Symbol.for("propname");
let symname4 = Symbol.for("propname");

//SymbolとSymbol.forの比較(挙動確認)
console.log(symname === symname2);  // 同じSymbol値はfalse
console.log(symname3 === symname4); // 同じSymbol.for値はtrue
