const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
console.log(document.cookie);
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    fetch("/api/tasks", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        data.items.forEach((task) => appendToDoItem(task));
      });
  } catch (e) {
    alert(`POST Error ${e}`);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ name: todo }),
    })
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        appendToDoItem(items);
      });
  } catch (e) {
    alert(`POST Error ${e}`);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
async function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      try {
        const tasks = fetch(`/api/tasks/${task.id}`, {
          method: "PATCH",
          body: JSON.stringify(`${task.name}`),
        }).then((res) => {
          if (res.ok) {
            label.style.textDecorationLine = "line-through";
          }
        });
      } catch (e) {
        alert(`PATCH Error ${e}`);
      }
    } else {
      label.style.textDecorationLine = "none";
    }
  });
  const destroy = document.createElement("button");
  destroy.innerHTML = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      fetch(`/api/tasks/${task.id}`, { method: "DELETE" }).then((res) => {
        if (res.ok) {
          elem.remove();
        }
      });
    } catch (e) {
      alert(`DELETE Error ${e}`);
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
