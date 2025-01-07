import fs from "fs";
import path from "path";
import { Worker } from "worker_threads";
import { createCanvas, loadImage, ImageData } from "canvas";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "input.jpg");
const outputFilePath = path.join(__dirname, "output.png");

// 画像を読み込んでキャンバスに描画する
loadImage(inputFilePath)
  .then((img) => {
    const originalCanvas = createCanvas(img.width, img.height);
    const filteredCanvas = createCanvas(img.width, img.height);
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    // 画像をキャンバスに描画
    originalCtx.drawImage(img, 0, 0);

    // 画像データを取得
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // Workerを作成
    const worker = new Worker(path.join(__dirname, "worker.js"));

    // メインスレッドで送るデータ
    const messageData = {
      imageData: data,
      imgWidth: img.width,
      imgHeight: img.height,
    };

    // メッセージを送信
    worker.postMessage(messageData);

    // Workerから結果を受け取ったときの処理
    worker.on("message", (outputData) => {
      // ImageDataオブジェクトに変換
      const outputImageData = new ImageData(outputData, img.width, img.height);

      // 結果の画像データをCanvasに描画
      filteredCtx.putImageData(outputImageData, 0, 0);

      // 結果をファイルに保存
      const out = fs.createWriteStream(outputFilePath);
      const stream = filteredCanvas.createPNGStream();
      stream.pipe(out);

      out.on("finish", () => {
        console.log("The filtered image has been saved to", outputFilePath);
      });
    });

    // Workerエラーハンドリング
    worker.on("error", (err) => {
      console.error("Worker error:", err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  })
  .catch((err) => {
    console.error("Error loading image:", err);
  });
