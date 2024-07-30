```
const lhs = costOfLengthPlusLoop(N);
const rhs = costOfLoop(N);
return (lhs - rhs) / N;
```

のそれぞれではループを実行し時間を計測しているが、計測した値に誤差が生じていると、lhsのほうが小さくなる可能性があり、それにより負数が生じていると思われる。
