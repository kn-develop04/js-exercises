const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  const filteredTodos = getFilteredTodos(todos);

  filteredTodos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

function getFilteredTodos(todos) {
  const hash = window.location.hash;
  if (hash === "#/completed") {
    return todos.filter((todo) => todo.completed);
  } else if (hash === "#/active") {
    return todos.filter((todo) => !todo.completed);
  }
  return todos; // デフォルトで全てのToDoを表示
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

// ハッシュ変更イベントリスナーの追加
window.addEventListener("hashchange", () => {
  renderTodos(todos); // ハッシュが変更されたときにToDoを再描画
});
