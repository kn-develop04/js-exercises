## npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist

webpackBootstrapから始まっている。大きな変化はなし

## npx webpack --mode=development ./ch10/ex01/index.cjs -o ./ch10/ex01/dist

webpackBootstrapから始まり、eval開発ツールというものが使われている

## npx webpack --mode=production ./ch10/ex01/index.cjs -o ./ch10/ex01/dist

コードが1行にまとめられている
