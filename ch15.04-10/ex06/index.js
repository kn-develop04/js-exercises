const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.todoList = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTodo();
    });
  }
  addTodo() {
    const todoText = this.input.value.trim();
    if (todoText === "") return;

    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;

    // 完了チェックボックスを作成
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      todoItem.classList.toggle("completed", checkbox.checked);
    });

    // 削除ボタンを作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✖";
    deleteButton.addEventListener("click", () => {
      this.todoList.removeChild(todoItem);
    });

    todoItem.prepend(checkbox);
    this.todoList.appendChild(todoItem);
    todoItem.appendChild(deleteButton);
    this.input.value = "";
  }
}

customElements.define("todo-app", TodoApp);
