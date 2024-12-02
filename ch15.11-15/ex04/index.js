const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// ToDoリスト
let todos = [];

// localStorage から ToDo リストを読み込む
function loadTodos() {
  try {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      renderTodos();
    }
  } catch (e) {
    console.error("Failed to load todos from localStorage", e);
  }
}

// ToDo リストを画面に表示
function renderTodos() {
  list.innerHTML = ""; // 既存のリストをクリア

  todos.forEach((todo) => {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.addEventListener("change", () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      saveTodos(); // 状態が変更されたら ToDo リストを保存
    });

    const destroy = document.createElement("button");
    destroy.innerHTML = "❌";
    destroy.addEventListener("click", () => {
      const index = todos.indexOf(todo);
      if (index > -1) {
        todos.splice(index, 1);
        saveTodos(); // 削除したら ToDo リストを保存
        renderTodos(); // リストを再描画
      }
    });

    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.appendChild(elem);
  });
}

// ToDo リストを localStorage に保存
function saveTodos() {
  try {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  } catch (e) {
    console.error("Failed to save todos to localStorage", e);
  }
}

// フォームの送信処理
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  todos.push(todo);
  input.value = ""; // 入力欄をクリア

  renderTodos(); // リストを再描画
  saveTodos(); // ToDo リストを保存
});

// localStorage の変更を監視し、他のタブに反映
window.addEventListener("storage", (event) => {
  if (event.key === "todos") {
    try {
      todos = JSON.parse(event.newValue);
      renderTodos();
    } catch (e) {
      console.error("Failed to sync todos from localStorage", e);
    }
  }
});

// ページ読み込み時に ToDo リストを読み込む
document.addEventListener("DOMContentLoaded", loadTodos);
