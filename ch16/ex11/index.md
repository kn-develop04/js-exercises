## 複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。

16000接続で接続が確立しなくなった。15000接続は接続できていた。
`connect ENOBUFS`というエラーがでていたがこれは、メモリ不足時にでるエラーと思われる。そのため、メモリ不足により接続確立できなかったと思われる。
