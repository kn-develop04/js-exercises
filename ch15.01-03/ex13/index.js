// nav 要素内のリンク (<a>)
const links = document.querySelector("nav").querySelectorAll("a");
const hrefs = Array.from(links).map((link) => link.getAttribute("href"));
console.log(...hrefs);
/**結果
 #home #products #contact #about
 */

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
const product = document
  .querySelector(".product-list")
  .querySelector(".product-item").textContent;
console.log(product);
/**
  商品1
  高品質の家電製品です。
  ¥12,000
  カートに追加
 */

// カートアイコンの画像 (<img>)
const cartImg = document.querySelector(".cart img").getAttribute("src");
console.log(cartImg);
/**
./30
 */
// 商品リスト (.product-list) 内の価格 (.price) を表示する要素

const target = document
  .querySelector(".product-list")
  .querySelectorAll(".product-item");
const prices = Array.from(target).map(
  (value) => value.querySelector(".price").textContent,
);
console.log(...prices);
/**
 ¥12,000 ¥25,000 ¥8,000 ¥15,000
 */

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const target2 = document
  .querySelector(".product-list")
  .querySelectorAll(".product-item");
const imgs = Array.from(target2).map((value) =>
  value.querySelector("img").getAttribute("src"),
);
console.log(...imgs);
/**
 ./200 ./200 ./200 ./200
 */

// 検索バー (.search-bar) 内の検索ボタン (<button>)
const btn = document
  .querySelector(".search-bar")
  .querySelector("button").textContent;
console.log(btn);
/**
 検索
 */

// フッター (footer) 内のパラグラフ (<p>) 要素
const p = document.querySelector("footer").querySelector("p").textContent;
console.log(p);
/**
 © 2024 家電オンラインショップ. All rights reserved.
 */

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const evenNumproducts = Array.from(target2)
  .map((value, index) => {
    if (index % 2 === 1) {
      return value.textContent;
    }
  })
  .filter((value, index) => {
    return index % 2 === 1;
  });
console.log(...evenNumproducts);
/**  
  商品2
  最新モデルの家電です。
  ¥25,000
  カートに追加
  
  
  商品4
  耐久性のある家電製品。
  ¥15,000
  カートに追加
 */

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const linkNodeList = document.querySelectorAll("header img");
const headerImgs = Array.from(linkNodeList).map((value) =>
  value.getAttribute("src"),
);
console.log(...headerImgs);
/**
./30 ./30
 */
// ナビゲーションリンクのうち、"会社情報" のリンク

const link = document
  .querySelector("nav")
  .querySelector('a[href^="#about"]')
  .getAttribute("href");
console.log(link);
/**
#about
 */
