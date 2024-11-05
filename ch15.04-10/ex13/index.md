## hashbangのようなスタイルがなぜ存在したのだろうか

| 記号 | 理由                                                                                         |
| ---- | -------------------------------------------------------------------------------------------- |
| #    | Ajax(非同期にサーバとの間の通信を行う仕組み)アプリケーションとして、ページ内遷移をするため。 |
| !    | ”#”とセットにして、Googleクローラーにクロール可能なAjaxアプリとして認識させるため。          |

URLに`#!`が入っているとGoogleのクローラーはそのページをAjaxアプリと認識して、`#!`を`?_escaped_fragment_=`に置き換え、クロール可能にする。
このように、Googleが`#!`を`?_escaped_fragment_=`に変換してクロール可能にする仕様を公開したため、FacebookやLifehacker.comをはじめ各所で使われるようになった。

参考：  
https://mame0112.hatenablog.com/entry/2015/06/06/025650  
https://computer-technology.hateblo.jp/entry/20141230/p1  
https://gihyo.jp/dev/clip/01/orangenews/vol62/0005
