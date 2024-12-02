// Canvasの取得
const canvas = document.getElementById("sierpinski");
const ctx = canvas.getContext("2d");

// 三角形を描画する関数
function drawTriangle(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y); // 三角形の頂点1
  ctx.lineTo(x + size, y); // 三角形の頂点2
  ctx.lineTo(x + size / 2, y - (Math.sqrt(3) / 2) * size); // 三角形の頂点3
  ctx.closePath();
  ctx.fill();
}

// シェルピンスキーの三角形を再帰的に描画する関数
function sierpinski(x, y, size, depth) {
  if (depth === 0) {
    drawTriangle(x, y, size);
  } else {
    const newSize = size / 2;
    const height = (Math.sqrt(3) / 2) * newSize;
    // 3つの小さな三角形を描く
    sierpinski(x, y, newSize, depth - 1); // 左
    sierpinski(x + newSize, y, newSize, depth - 1); // 右
    sierpinski(x + newSize / 2, y - height, newSize, depth - 1); // 上
  }
}

// フラクタルの描画
const depth = 5; // 再帰の深さ（フラクタルの詳細度）
ctx.fillStyle = "#3498db"; // 三角形の色
sierpinski(100, 500, 400, depth); // 描画開始位置とサイズ
