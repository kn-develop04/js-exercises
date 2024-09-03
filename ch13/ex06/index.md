## Jquery.Deferredとは

Jqueryで非同期処理を上手に扱うための標準モジュール
Jquery：JavaScriptのコードを簡潔に書くことを目的に開発されたライブラリ

## Promiseとの関係性

Jquery.DefreedとPromiseはともに非同期を扱うものである。ただしthenの挙動が違う。

### Jquery3.x

resolveなどが呼び出されると、thenに登録されたコールバックだけはsetTimeOutに渡して実行される。  
この時、setTimeoutに登録されたコールバックは時間経過後にタスクキューの追加される。

### Promise

thenに登録されたコールバックが先に呼ばれ、次にsetTimeoutに登録されたコールバックが呼び出される

備考：https://qiita.com/atti/items/17fd8b11305a5375a1de
