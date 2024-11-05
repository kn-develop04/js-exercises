## ToDo アプリに対してブラウザの開発者ツールから値の変更やプロパティの追加を試す

### 15.4-10.1

background-colorを書き換える

もともと  
![alt text](image-3.png)

書き換え後  
![alt text](image-4.png)

### 15.4-10.2

TodoListの文字色を変える  
もともと  
![alt text](image-6.png)  
書き換え後  
![alt text](image-5.png)

## 開発者ツールで CSS に関して実行できる操作を検索エンジンで調べ、便利だと思ったものを 3 つ

- 開発ツール上でcssをいじった際、どのcssファイルの何行目かを判別できる。  
  ![alt text](image.png)

- スペルミスは線が引かれる  
  ![alt text](image-1.png)

- レスポンシブに対応しているかを確認できる  
  ![alt text](image-2.png)

## 15.4-10.2 のアプリの body 要素に対し、元々 HTML および JS 内で利用していなかった Tailwind CSS のクラス (bg-rose-600 など何でも良い) を開発者ツールから追加すると変更が反映されないが、これは何故か

- style.cssの内容で上書きされるから
- ビルドをしてstyle.cssを変える必要がある
