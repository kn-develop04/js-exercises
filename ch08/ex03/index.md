末尾再帰では、再帰呼び出しがその関数の末尾（最後の演算）で行われるため、新しいスタックフレームを作成する必要がなくなる。  
＝＞再帰呼び出しの後、現在のスタックフレームをそのまま利用して次の呼び出しを行うことができる。≒スタックを再利用できる。

末尾最適化はJavaScriptCoreエンジン(Safari)で実装されている。
https://speakerdeck.com/kota_yata/mo-wei-hu-bichu-sizui-shi-hua-tojavascript?slide=8
