## 大きな file.txt に対し fs.createReadStream を利用した場合と fs.read を利用した場合でメモリ使用量がどれだけ違うか確認しなさい。

### fs.createReadStream を利用

```
{
  rss: 59416576,
  heapTotal: 11595776,
  heapUsed: 8045384,
  external: 11152973,
  arrayBuffers: 7287748
}
```

メモリ使用量は59416576

### fs.read を利用

```
{
  rss: 149385216,
  heapTotal: 11333632,
  heapUsed: 6203928,
  external: 103880458,
  arrayBuffers: 100017168
}
```

メモリ使用量は149385216

### 結果

fe.readの方が約2.5倍のメモリを利用していた
