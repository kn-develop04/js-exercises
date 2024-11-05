document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
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
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
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
              offsetX < img.width &&
              offsetY >= 0 &&
              offsetY < img.height
            ) {
              const idx = (offsetY * img.width + offsetX) * 4;
              r += data[idx] * kernel[ky][kx];
              g += data[idx + 1] * kernel[ky][kx];
              b += data[idx + 2] * kernel[ky][kx];
            }
          }
        }

        const outputIdx = (y * img.width + x) * 4;
        outputData[outputIdx] = r / kernelSum;
        outputData[outputIdx + 1] = g / kernelSum;
        outputData[outputIdx + 1] = b / kernelSum;
        outputData[outputIdx + 3] = data[outputIdx + 3];
      }
    }
    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    // const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // const outputImageData = new ImageData(outputData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    // filteredCtx.putImageData(imageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
