## ReactのXSS対策

Reactでは開発者が実装するのは仮想DOMであり、DOMをレンダリングする際に不適切な文字列は適宜エスケープされる。  
そのため、ex08で用いた`<script>`のような危険な文字列は無害化され、表示されるのはエスケープされた文字列リテラルとなり、ブラウザに危険な解釈をされなくなる。
（https://zenn.dev/yuuhu04/books/xss-anti-pattern-of-react-and-vue/viewer/xss-over-react）

## ReactでのXSSの危険

1. Reactのエスケープを無効化するオプション`dangerouslySetInnerHTML`を利用するとXSSが行われる可能性がある
1. `href`属性は`javascript:`から始まる文字列をjavascriptとして扱うため、そこに不正なスクリプトが差し込まれる可能性がある。
   （https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de）
