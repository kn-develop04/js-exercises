# 練習問題: 2 章

## 問題 2.1 💻

第 1 章のヒストグラムのコードにフォーマッターを実行してコードを整形しなさい。

**出題範囲**: 2.1

## 問題 2.2 🖋

$ や \_ を変数名として利用するライブラリを調べなさい。

**出題範囲**: 2.4

## 問題 2.3 💻🖋

本の文中では Unicode 正規化について é を例にして説明されていますが、それぞれの正規化にはそれぞれ名前がついています。
é を 1 つの Unicode 文字とする正規化を NFC (Normalization Form Canonical Composition)、e とアクセント結合マークに分離する正規化を NFD (Normalization Form Canonical Decomposition) といいます。

Unicode の正規化は日本語のひらがな、カタカナの濁音"゛"や半濁音"゜"にも適用されます。以上を踏まえて、

1. "パン"を Unicode エスケープシーケンスで記述した文字列リテラルを NFC と NFD のそれぞれの形式で作ってください。💻
2. 濁音や半濁音を含むファイル名のファイルを作ったとき、Windows と macOS では NFC と NFD どちらの形式で保存されるかを調べて記述しなさい。🖋

**出題範囲**: 2.5.2

## 問題 2.4 💻

Unicode エスケープシーケンスをなるべく用いて"Hello,World"を出力するプログラムを書きなさい。

**出題範囲**: 2.5.1

## 問題 2.5 💻📄

第 1 章のヒストグラムのコードからセミコロンを可能な限り排除しなさい。

**出題範囲**: 2.6

## 問題 2.6 📄

FizzBuzz 問題の結果を文字列として返す関数を 1 行で書きなさい。1 から 100 まで繰り返すこと。文字列は与えられたテストを通過する形式にすること。

**出題範囲**: 2.6

## 問題 2.7 🖋

以下のプログラムを実行し、挙動を確認しなさい。

```ts
let a = 0,
  b = 0;

// prettier-ignore
const c
=
a
// prettier-ignore
++
b

console.log(a, b, c);

// prettier-ignore
const e = a++
b;

console.log(a, b, e);
```

**出題範囲**: 2.6

## 問題 2.8 💪💻📄

文字列 (JavaScript ソースコード) からセミコロンを除外する関数を書きなさい。
実装のために [acorn](https://www.npmjs.com/package/acorn) などの
JavaScript のソースコードをパースして抽象構文木 (AST) を生成するライブラリを使っても構いません。

**出題範囲**: 2.6