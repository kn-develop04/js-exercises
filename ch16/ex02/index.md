## Graceful Shutdown のために送信されるシグナルの種類は何か

- SIGTERM (Termination Signal)

  - コンテナが停止または再起動される際、最初に送信されるシグナル
  - アプリケーションにGraceful Shutdownを実行させるために使用される

- SIGKILL (Kill Signal)

  - SIGTERM シグナルに応じてアプリケーションが適切に終了しない場合（たとえば、終了処理が長時間かかりすぎる場合など）、コンテナランタイムが SIGKILL を送信して強制的にプロセスを終了させる
  - Graceful Shutdown が成功しない場合に強制終了するために使用
