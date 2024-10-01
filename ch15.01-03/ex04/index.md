## グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種

- ブラウザ内：`Window`
- Node内：`global`
- ブラウザnode問わず：` globalThis`

## ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度

- alert
- chrome
- confirm
- document
- getComputedStyle
- history
- close
- navigator
- scheduling
- oninput

## グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたか

![alt text](image.png)  
昔(ES3等)は、undefinedに異なる値を代入することができ、予測できない値になってしまう問題が発生していた。  
ES5以降では、代入エラーは起きないが代入が反映されないようになった。
