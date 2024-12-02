// アップロードボタンがクリックされた時の処理
async function uploadFile() {
  const accessToken = document.getElementById("accessToken").value;
  const fileInput = document.getElementById("fileInput");
  const statusDiv = document.getElementById("status");

  // アクセストークンが空でないか確認
  if (!accessToken) {
    statusDiv.innerHTML = "アクセストークンを入力してください。";
    return;
  }

  // ファイルが選択されているか確認
  if (fileInput.files.length === 0) {
    statusDiv.innerHTML = "アップロードするファイルを選択してください。";
    return;
  }

  const file = fileInput.files[0];
  statusDiv.innerHTML = "アップロード中...";

  try {
    const response = await uploadToOneDrive(accessToken, file);

    if (!response.ok) {
      // エラーレスポンスが返された場合
      const errorData = await response.json();
      statusDiv.innerHTML =
        "アップロードに失敗しました。エラー: " + errorData.error.message;
    } else {
      // 成功した場合
      statusDiv.innerHTML = "ファイルのアップロードが成功しました！";
    }
  } catch (error) {
    // fetch の実行でエラーが発生した場合
    console.error(error);
    statusDiv.innerHTML = "エラーが発生しました: " + error.message;
  }
}

// OneDrive にファイルをアップロードする関数
// https://learn.microsoft.com/ja-jp/graph/api/driveitem-put-content?view=graph-rest-1.0&tabs=http
async function uploadToOneDrive(accessToken, file) {
  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`;

  // fetchでファイルをアップロード
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: file,
  });
  console.log(response.body);
  return response;
}
