// 50x50 の盤面
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
  );

// grid を canvas に描画する
function renderGrid(grid) {
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

// Life Game のルールに従ってセルを更新
function updateGrid(grid) {
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

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();

  // セルの反転情報をサーバーに送信
  socket.send(
    JSON.stringify({
      type: "toggle",
      row: row,
      col: col,
    }),
  );

  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
function update() {
  grid = updateGrid(grid);
  renderGrid(grid);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // サーバーにゲーム開始メッセージを送信
  socket.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
  // サーバーにゲーム一時停止メッセージを送信
  socket.send(JSON.stringify({ type: "pause" }));
});

// WebSocket の設定と接続
const socket = new WebSocket("ws://localhost:3000"); // サーバーの WebSocket URL に接続

// WebSocket が開いたときの処理
socket.addEventListener("open", function () {
  console.log("WebSocket connection established");
});

// サーバーからメッセージを受け取ったときの処理
socket.addEventListener("message", function (event) {
  const message = JSON.parse(event.data);

  if (message.type === "update") {
    // サーバーから盤面の更新を受け取った場合
    grid = message.grid;
    renderGrid(grid);
  } else if (message.type === "toggle") {
    // サーバーからセル反転の通知を受け取った場合
    grid[message.row][message.col] = !grid[message.row][message.col];
    renderGrid(grid);
  } else if (message.type === "pause") {
    // サーバーから一時停止の通知を受け取った場合
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  } else if (message.type === "start") {
    // サーバーからゲーム開始・再開の通知を受け取った場合
    if (!animationId) {
      update();
    }
  }
});

renderGrid(grid); // 初期盤面の描画
