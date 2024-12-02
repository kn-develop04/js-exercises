document.getElementById("image").addEventListener("change", (event) => {
  console.log("ファイル選択が変更されました");

  const file = event.target.files[0];
  if (!file) {
    console.log("ファイルが選択されていません");
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  // 画像の読み込み
  reader.addEventListener("load", (e) => {
    console.log("画像が読み込まれました");
    img.src = e.target.result;
    console.log(img.src);
  });

  img.addEventListener("load", () => {
    console.log("画像の読み込みが完了しました");
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

    // Web Workerを作成
    const worker = new Worker("worker.js");

    // ローディング表示
    document.getElementById("loading").style.display = "block";

    // Workerに画像データを渡し、処理結果を受け取る
    worker.postMessage({
      imageData: imageData,
      width: img.width,
      height: img.height,
    });

    // Workerからの応答を受け取る
    worker.onmessage = (e) => {
      console.log("Workerから結果を受け取りました");
      const outputImageData = new ImageData(e.data, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
      // ローディングを非表示にする
      document.getElementById("loading").style.display = "none";
    };
  });

  reader.readAsDataURL(file);
});
