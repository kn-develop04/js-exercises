## 結果
```
0 1 0
1 1 0
```
## 挙動

```
let a = 0,
b = 0;
```
ではセミコロンがa=0の後にないが、セミコロンがなくても
let a =0,b=0;として解釈され、ともに0が入る。

```// prettier-ignore
const c
=
a
// prettier-ignore
++
b
```
ではconst c = a；と解釈されcには0が入る。  
bは前置演算子として扱われるので0に1を増やした1になる。  
そのため、0(a) 1(b) 0(c)がまず表示される。  
その後  
```
const e = a++
b;
```
ではconst e=a++;(後置演算子)と解釈されるため、eにはaの値(0)が入ってから、aが増やされ1となる。  
bはb;と解釈され変化なしのため、1(a) 1(b) 0(e)となる。  