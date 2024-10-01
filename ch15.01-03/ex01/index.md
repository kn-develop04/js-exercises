## index.html ファイル内の script タグから `type="module"` 属性を削除した場合、期待通り動作させるにはどうすべきか

`<script src="/ch15.01-03/ex01/index.js"></script>`をbodyタグより後に持っていく

## 理由

`type="module"`は`defer=true`を付けたものと同じ動作をする(=HTMLの構造解析を終えてからjavascriptコードが実行される)。  
そのため、`type="module"`をなくすと、コードの上から読み込まれていくため、HTMLが表示される前にJavascriptが実行されてしまう。  
つまり、存在しないDOMに対してJSを実行してしまうため、エラーが発生する。  
そこで、jsファイルを読み込む構文をHTML表示後(HTMLの記述以降)に記載する。  
その結果、HTMLの解析後にjsファイルが実行されるので、問題なく表示されるようになる。
