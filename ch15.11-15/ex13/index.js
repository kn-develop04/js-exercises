// APIのエンドポイント（ローカルで実行中のollamaサーバー）
const apiUrl = "http://localhost:11434/api/generate"; // OllamaのローカルAPIエンドポイント

// チャットの表示を更新する関数
function displayMessage(message, className) {
  const chatContainer = document.getElementById("chat-container");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", className);
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight; // スクロールを下に自動で合わせる
}

// ユーザーのメッセージを送信する関数
async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const userMessage = userInput.value;

  if (!userMessage.trim()) return;

  // ユーザーのメッセージを表示
  displayMessage("あなた: " + userMessage, "user-message");

  // ユーザーのメッセージを送信
  userInput.value = ""; // 入力欄を空にする
  const chatContainer = document.getElementById("chat-container");
  chatContainer.scrollTop = chatContainer.scrollHeight; // スクロールを下に自動で合わせる

  // Ollama API へメッセージを送信して、逐次的に応答を取得
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma:2b",
      prompt: userMessage,
      stream: true, // 逐次的なレスポンスを取得する
    }),
  });

  console.log(response);

  if (response.ok) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = "";

    // レスポンスのストリームを逐次的に読み取り
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      buffer += decoder.decode(value, { stream: true });

      // バッファ内のデータをJSONとして解析
      try {
        // バッファ内のデータをJSONとして解析
        const jsonResponse = JSON.parse(buffer);

        // 「response」フィールドがある場合、その内容を表示
        if (jsonResponse.response) {
          displayMessage(jsonResponse.response, "llm-message");
        }

        // 「done」フラグが true なら応答が完了したと判断
        if (jsonResponse.done) {
          done = true;
        }

        // 解析後はバッファをリセット
        buffer = "";
      } catch (error) {
        // JSON 解析エラーがあった場合は、そのまま進む
        console.error("JSON解析エラー:", error);
      }
    }
  } else {
    displayMessage("エラー: 応答がありませんでした。", "llm-message");
  }
}
