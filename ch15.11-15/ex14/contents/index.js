"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");

button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});

async function getMessageFromServer() {
  button.disabled = true;
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // EventSource を初期化
  const eventSource = new EventSource("http://localhost:3000/message");
  // // サーバーからのメッセージを受け取る
  eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    messageElement.textContent = data.value;
  };

  // エラー処理
  eventSource.onerror = function (error) {
    console.error("Error");
    eventSource.close();
    button.disabled = false;
  };

  eventSource.onclose = function () {
    button.disabled = false;
  };
}
