## index.js でdocument.cookie プロパティを console.logで表示する

空が表示された  
HTTPonly指定によりJavaScriptがDocument.cookieプロパティなどを介してクッキーにアクセスすることを禁止するため<br>
![alt text](image.png)<br>

## ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

空が表示された <br>
理由は上記と同じと思われる<br>
![alt text](image-1.png)<br>

## ToDo アプリのタブをリロードする

タスクは残っており、開発者コンソールのcookieは空だった<br>
タスクが残っているのは、cookieによるものと思われる。<br>
aplicationタブでは、sidとvalueのセットでcookieが残っている<br>
![alt text](image-2.png)<br>

## 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

「ToDo アプリのタブをリロードする」と同じ。<br>  
同一のセッションとみなされているため。<br>

## シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

タスクは無く(初期状態)、開発者コンソールのcookieは空だった。<br>
applicationタブを見ると、これまでとは別のvalueが入っていた。<br>
別のcookieとなっているため、このような結果になったと思われる。<br>
![alt text](image-3.png)<br>

## http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

「シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する」と同じ結果<br>
