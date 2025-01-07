fetch("http://localhost:8000/test.txt") // リクエストされたファイル
  .then((response) => {
    if (response.ok) {
      return response.text(); // ファイルの内容を取得
    } else {
      throw new Error("File not found");
    }
  })
  .then((data) => {
    console.log("File content:", data); // ファイルの内容が表示される
  })
  .catch((error) => console.error("Error:", error));
