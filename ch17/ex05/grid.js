// grid.js
import { ROWS, COLS } from "./constants.js";

/**
 * Life Game のルールに従ってセルを更新
 * @param {boolean[][]} grid - 現在の盤面
 * @returns {boolean[][]} 次の盤面
 */
export function updateGrid(grid) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲の生存セルを数える
      let liveNeighbors = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // 自分自身はカウントしない
          if (i === 0 && j === 0) continue;

          const neighborRow = row + i;
          const neighborCol = col + j;

          // 有効なインデックス内かどうかを確認
          if (
            neighborRow >= 0 &&
            neighborRow < ROWS &&
            neighborCol >= 0 &&
            neighborCol < COLS
          ) {
            liveNeighbors += grid[neighborRow][neighborCol] ? 1 : 0;
          }
        }
      }

      if (grid[row][col]) {
        // 生存セルのルール
        nextGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        // 死亡セルのルール
        nextGrid[row][col] = liveNeighbors === 3;
      }
    }
  }
  return nextGrid;
}
