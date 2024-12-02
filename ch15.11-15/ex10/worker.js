self.onmessage = (e) => {
  try {
    const { imageData, width, height } = e.data;

    const data = imageData.data;
    const outputData = new Uint8ClampedArray(imageData.data.length);
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kernelSize = 5;
    const kernelSum = 256; // カーネルの合計値

    // 画像をぼかす処理
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const offsetX = x + kx - 2; // 2でオフセットを調整
            const offsetY = y + ky - 2;

            // 画像の範囲外を参照しない
            if (
              offsetX >= 0 &&
              offsetX < width &&
              offsetY >= 0 &&
              offsetY < height
            ) {
              const idx = (offsetY * width + offsetX) * 4;
              r += data[idx] * kernel[ky][kx];
              g += data[idx + 1] * kernel[ky][kx];
              b += data[idx + 2] * kernel[ky][kx];
            }
          }
        }

        const outputIdx = (y * width + x) * 4;
        outputData[outputIdx] = r / kernelSum;
        outputData[outputIdx + 1] = g / kernelSum;
        outputData[outputIdx + 2] = b / kernelSum;
        outputData[outputIdx + 3] = data[outputIdx + 3]; // アルファチャンネルはそのまま
      }
    }

    // 画像処理結果をメインスレッドに返す
    self.postMessage(outputData);
  } catch (error) {
    console.error("Worker内でエラーが発生:", error);
    self.postMessage(null); // エラー時に null を返す
  }
};
