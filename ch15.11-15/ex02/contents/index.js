const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const destroyButtons = document.querySelectorAll(".destroy-button"); // 削除ボタンのクラス（もしクラスがある場合）

// UI を無効化する関数
function disableUI() {
  form.disabled = true;
  input.disabled = true;
  destroyButtons.forEach((btn) => (btn.disabled = true));
  list
    .querySelectorAll('input[type="checkbox"]')
    .forEach((input) => (input.disabled = true));
}

// UI を有効化する関数
function enableUI() {
  form.disabled = false;
  input.disabled = false;
  destroyButtons.forEach((btn) => (btn.disabled = false));
  list
    .querySelectorAll('input[type="checkbox"]')
    .forEach((input) => (input.disabled = false));
}

// リトライ処理
export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retryCount = 0;

  function attemptRetry() {
    func()
      .then((result) => {
        if (result === true) {
          callback(true); // 成功時に即座に終了
        } else {
          // 最大リトライ回数に達した場合、callback を呼び出して終了
          callback(false);
        }
      })
      .catch(() => {
        if (retryCount < maxRetry) {
          retryCount++;
          const delay = Math.pow(2, retryCount - 1) * 1000; // 待ち時間は 2^(retryCount - 1) 秒
          setTimeout(attemptRetry, delay);
        } else {
          callback(false);
        }
      });
  }
  attemptRetry();
}

// API 呼び出し用のラップ関数
function fetchWithTimeout(url, options = {}, timeout = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  options.signal = controller.signal;

  return fetch(url, options)
    .then((res) => {
      clearTimeout(timeoutId);
      return res;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    });
}

// API からタスクを取得する
document.addEventListener("DOMContentLoaded", async () => {
  disableUI(); // UI を無効化

  fetchWithTimeout("/api/tasks", { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((task) => appendToDoItem(task));
    })
    .catch((e) => alert(`Error: ${e.message}`))
    .finally(() => enableUI()); // 通信完了後に UI を有効化
});

// タスクを作成する
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") return;

  input.value = "";

  disableUI(); // UI を無効化

  fetchWithTimeout("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ name: todo }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        res.json().then((item) => appendToDoItem(item));
      } else if (res.status >= 500 && res.status < 600) {
        // 500 番台エラーの場合リトライ処理
        retryWithExponentialBackoff(
          () =>
            fetchWithTimeout("/api/tasks", {
              method: "POST",
              body: JSON.stringify({ name: todo }),
              headers: { "Content-Type": "application/json" },
            }),
          3,
          (success) => {
            if (success) {
              alert("Task created successfully after retry.");
            } else {
              alert("Failed to create task after retrying.");
            }
          },
        );
      } else {
        alert("Failed to create task.");
      }
    })
    .catch((e) => alert(`Error: ${e.message}`))
    .finally(() => enableUI()); // 通信完了後に UI を有効化
});

// タスクを追加する関数

function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";

  // トグルの変更イベント
  toggle.addEventListener("change", () => {
    disableUI(); // UI を無効化

    fetchWithTimeout(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: task.name }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          retryWithExponentialBackoff(
            () =>
              fetchWithTimeout(`/api/tasks/${task.id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: task.name }),
                headers: { "Content-Type": "application/json" },
              }),
            3,
            (success) => {
              if (success) {
                toggle.checked
                  ? (label.style.textDecorationLine = "line-through")
                  : (label.style.textDecorationLine = "none");
              } else {
                alert("Failed to update task after retrying.");
              }
            },
          );
        } else {
          toggle.checked
            ? (label.style.textDecorationLine = "line-through")
            : (label.style.textDecorationLine = "none");
        }
      })
      .catch((e) => alert(`Error: ${e.message}`))
      .finally(() => enableUI()); // 通信完了後に UI を有効化
  });

  const destroy = document.createElement("button");
  destroy.innerHTML = "❌";
  destroy.classList.add("destroy-button");

  // 削除ボタンのイベント
  destroy.addEventListener("click", () => {
    disableUI(); // UI を無効化

    fetchWithTimeout(`/api/tasks/${task.id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          elem.remove();
        } else {
          retryWithExponentialBackoff(
            () =>
              fetchWithTimeout(`/api/tasks/${task.id}`, { method: "DELETE" }),
            3,
            (success) => {
              if (success) {
                elem.remove();
              } else {
                alert("Failed to delete task after retrying.");
              }
            },
          );
        }
      })
      .catch((e) => alert(`Error: ${e.message}`))
      .finally(() => enableUI()); // 通信完了後に UI を有効化
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);

  // ここでdestroyButtonsを再取得
  const destroyButtons = document.querySelectorAll(".destroy-button");
  if (destroyButtons.length > 0) {
    destroyButtons.forEach((btn) => (btn.disabled = false));
  }
}
