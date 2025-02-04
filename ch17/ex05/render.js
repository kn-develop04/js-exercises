// render.js
import { ROWS, COLS, RESOLUTION } from "./constants.js";

/**
 * grid を canvas に描画する
 * @param {boolean[][]} grid - 現在の盤面
 * @param {CanvasRenderingContext2D} ctx - canvas の描画コンテキスト
 */
export function renderGrid(grid, ctx) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}
