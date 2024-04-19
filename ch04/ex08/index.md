### if (foo === void 0) { ... }　のように書かれる理由

`undefined`は(グローバル)変数であり、以下のように値を書き換えることができることができる。

```　// コードはNode上で実行
console.log(undefined) //　undifinedが出力される
var undefined =100;
console.log(undefined) // undifinedではなく100となる
```

一方、`void 0`は変数ではない(演算子)ため、このようなことが起きない。  
よって、値書き換えが行われない`void 0`が使われる。

### 今ではf (foo === void 0) { ... }のような書き方をしない理由

`void 0`よりも`undefined`のほうがわかりやすいためである。
上記ではundefinedは値変更ができるとしたが、最近のブラウザでは、`undefined`は設定不可、書込不可となっている。そのため、問題が生じない。

参考：MDN(https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined#%E8%A7%A3%E8%AA%AC)
