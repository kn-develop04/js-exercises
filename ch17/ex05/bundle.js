/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./ex05/constants.js":
      /*!***************************!*\
  !*** ./ex05/constants.js ***!
  \***************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ COLS: () => /* binding */ COLS,
          /* harmony export */ RESOLUTION: () => /* binding */ RESOLUTION,
          /* harmony export */ ROWS: () => /* binding */ ROWS,
          /* harmony export */
        });
        const ROWS = 50;
        const COLS = 50;
        const RESOLUTION = 10;

        /***/
      },

    /***/ "./ex05/grid.js":
      /*!**********************!*\
  !*** ./ex05/grid.js ***!
  \**********************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ updateGrid: () => /* binding */ updateGrid,
          /* harmony export */
        });
        /* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./constants.js */ "./ex05/constants.js");
        // grid.js

        /**
         * Life Game のルールに従ってセルを更新
         * @param {boolean[][]} grid - 現在の盤面
         * @returns {boolean[][]} 次の盤面
         */
        function updateGrid(grid) {
          const nextGrid = grid.map((arr) => [...arr]);

          for (
            let row = 0;
            row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS;
            row++
          ) {
            for (
              let col = 0;
              col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS;
              col++
            ) {
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
                    neighborRow <
                      _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS &&
                    neighborCol >= 0 &&
                    neighborCol <
                      _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS
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

        /***/
      },

    /***/ "./ex05/render.js":
      /*!************************!*\
  !*** ./ex05/render.js ***!
  \************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ renderGrid: () => /* binding */ renderGrid,
          /* harmony export */
        });
        /* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./constants.js */ "./ex05/constants.js");
        // render.js

        /**
         * grid を canvas に描画する
         * @param {boolean[][]} grid - 現在の盤面
         * @param {CanvasRenderingContext2D} ctx - canvas の描画コンテキスト
         */
        function renderGrid(grid, ctx) {
          for (
            let row = 0;
            row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS;
            row++
          ) {
            for (
              let col = 0;
              col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS;
              col++
            ) {
              const cell = grid[row][col];
              ctx.beginPath();
              ctx.rect(
                col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
                row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
                _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
                _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
              );
              ctx.fillStyle = cell ? "black" : "white";
              ctx.fill();
              ctx.stroke();
            }
          }
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    /*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(/*! ./constants.js */ "./ex05/constants.js");
    /* harmony import */ var _grid_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(/*! ./grid.js */ "./ex05/grid.js");
    /* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(/*! ./render.js */ "./ex05/render.js");
    //バンドルして実行：npx webpack-dev-server
    //ビルド：npx webpack --mode development

    // canvas のセットアップ
    const canvas = document.querySelector("#screen");
    const ctx = canvas.getContext("2d");
    const startButton = document.querySelector("#start");
    const pauseButton = document.querySelector("#pause");

    canvas.width =
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS *
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;
    canvas.height =
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS *
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;

    // https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
    let animationId = null;

    // NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
    const sound = new Audio("decision1.mp3");

    // ライフゲームのセル (true or false) をランダムに初期化する
    let grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS)
      .fill(null)
      .map(() =>
        new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS)
          .fill(null)
          .map(() => !!Math.floor(Math.random() * 2)),
      );

    // canvas がクリックされたときの処理 (セルの値を反転する)
    canvas.addEventListener("click", function (evt) {
      const rect = canvas.getBoundingClientRect();
      const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

      const row = Math.floor(
        pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
      );
      const col = Math.floor(
        pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
      );
      grid[row][col] = !grid[row][col];
      sound.cloneNode().play();
      (0, _render_js__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(grid, ctx);
    });

    // requestAnimationFrame によって一定間隔で更新・描画を行う
    // NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
    // https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
    function update() {
      grid = (0, _grid_js__WEBPACK_IMPORTED_MODULE_1__.updateGrid)(grid);
      (0, _render_js__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(grid, ctx);
      animationId = requestAnimationFrame(update);
    }

    startButton.addEventListener("click", () => {
      // 既にアニメーションが動いている場合は何もしない
      if (animationId) {
        return;
      }
      update();
    });

    pauseButton.addEventListener("click", () => {
      // アニメーションが停止している場合は何もしない
      if (!animationId) {
        return;
      }
      cancelAnimationFrame(animationId);
      animationId = null;
    });

    (0, _render_js__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(grid, ctx);
  })();

  /******/
})();
//# sourceMappingURL=bundle.js.map
