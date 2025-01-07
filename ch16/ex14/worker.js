import { parentPort } from "worker_threads";

// 画像データの処理
parentPort.on("message", (e) => {
  const { imageData, imgWidth, imgHeight } = e;

  const kernel = [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1],
  ];
  const kernelSize = 5;
  const kernelSum = 256; // カーネルの合計値

  const outputData = new Uint8ClampedArray(imageData.length);

  // ガウシアンフィルタ処理
  for (let y = 0; y < imgHeight; y++) {
    for (let x = 0; x < imgWidth; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const offsetX = x + kx - 2;
          const offsetY = y + ky - 2;

          // 範囲外のピクセルを無視
          if (
            offsetX >= 0 &&
            offsetX < imgWidth &&
            offsetY >= 0 &&
            offsetY < imgHeight
          ) {
            const idx = (offsetY * imgWidth + offsetX) * 4;
            r += imageData[idx] * kernel[ky][kx];
            g += imageData[idx + 1] * kernel[ky][kx];
            b += imageData[idx + 2] * kernel[ky][kx];
          }
        }
      }

      const outputIdx = (y * imgWidth + x) * 4;
      outputData[outputIdx] = r / kernelSum;
      outputData[outputIdx + 1] = g / kernelSum;
      outputData[outputIdx + 2] = b / kernelSum;
      outputData[outputIdx + 3] = imageData[outputIdx + 3]; // alpha channel
    }
  }

  // 結果を親スレッドに送信
  parentPort.postMessage(outputData);
});
