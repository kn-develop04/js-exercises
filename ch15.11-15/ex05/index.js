const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// データベース名を定義
const dbName = "todoDB";
let db; // IndexedDB用の変数

// データベースを開く処理
const openDB = () => {
  const request = indexedDB.open(dbName, 1);

  // 初回のデータベースの作成処理
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("todos")) {
      db.createObjectStore("todos", { keyPath: "id", autoIncrement: true }); // "todos"というオブジェクトストアを作成
    }
  };

  // データベースのオープンに成功した場合の処理
  request.onsuccess = (e) => {
    db = e.target.result; // データベース接続を取得
    loadTodos(); // ToDoを読み込む
  };

  // データベースのオープンに失敗した場合の処理
  request.onerror = (e) => {
    console.error("Database error: ", e.target.error); // エラーメッセージの表示
  };
};

// データベースからToDoリストを読み込む
const loadTodos = () => {
  const transaction = db.transaction("todos", "readonly"); // 読み込み用のトランザクションを開始
  const store = transaction.objectStore("todos"); // "todos"オブジェクトストアを選択
  const request = store.getAll(); // すべてのToDoを取得

  request.onsuccess = (e) => {
    const todos = e.target.result; // ToDoリストを取得
    todos.forEach((todo) => {
      addTodoToList(todo.text, todo.completed, todo.id); // 各ToDoをリストに追加
    });
  };

  request.onerror = (e) => {
    console.error("Error loading todos: ", e.target.error); // エラーメッセージの表示
  };
};

// localStorageと同期してToDoを保存
const syncTodos = () => {
  const transaction = db.transaction("todos", "readonly"); // 読み込み用トランザクション
  const store = transaction.objectStore("todos");
  const request = store.getAll(); // すべてのToDoを取得

  request.onsuccess = (e) => {
    const todos = e.target.result; // 取得したToDoリスト
    localStorage.setItem("todos", JSON.stringify(todos)); // localStorageに保存
    // 他のタブに通知
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "todos",
        newValue: JSON.stringify(todos),
      }),
    );
  };
};

// localStorageの変更を監視し、他のタブに反映
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    // 'todos'キーが変更された場合
    loadTodosFromLocalStorage(); // localStorageからToDoを再読み込み
  }
});

// localStorageからToDoリストを読み込む
const loadTodosFromLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || []; // localStorageからToDoを取得
  list.innerHTML = ""; // リストをクリア
  todos.forEach((todo) => {
    addTodoToList(todo.text, todo.completed, todo.id); // 取得したToDoをリストに追加
  });
};

// フォームの送信処理
form.addEventListener("submit", (e) => {
  e.preventDefault(); // フォームのデフォルト動作をキャンセル

  // 入力が空の場合は処理を中止
  if (input.value.trim() === "") {
    return;
  }

  const todo = input.value.trim(); // 入力値を取得
  input.value = ""; // 入力フィールドをクリア

  // データベースに新しいToDoを追加
  const transaction = db.transaction("todos", "readwrite"); // 書き込み用トランザクション
  const store = transaction.objectStore("todos");
  const newTodo = {
    text: todo,
    completed: false, // 新しいToDoは未完了として設定
  };
  const request = store.add(newTodo); // 新しいToDoをデータベースに追加

  request.onsuccess = () => {
    addTodoToList(todo, false, request.result); // リストに追加
    syncTodos(); // localStorageに同期
  };

  request.onerror = (e) => {
    console.error("Error saving todo: ", e.target.error); // エラーメッセージの表示
  };
});

// ToDoリストを画面に追加
const addTodoToList = (text, completed, id) => {
  const elem = document.createElement("li"); // 新しいリストアイテムを作成

  const label = document.createElement("label"); // ラベルを作成
  label.textContent = text; // ToDoのテキストを設定
  label.style.textDecorationLine = completed ? "line-through" : "none"; // 完了している場合は取り消し線

  const toggle = document.createElement("input"); // チェックボックスを作成
  toggle.type = "checkbox"; // チェックボックス
  toggle.checked = completed; // 完了状態に応じてチェックを設定

  // チェックボックスの状態変更時の処理
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none"; // チェック状態に応じてラベルに取り消し線を追加

    // ToDoの完了状態をデータベースに反映
    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.get(id); // ToDoを取得

    request.onsuccess = (e) => {
      const todo = e.target.result;
      todo.completed = toggle.checked; // 完了状態を更新
      const updateRequest = store.put(todo); // 更新をデータベースに保存
      updateRequest.onerror = (e) => {
        console.error("Error updating todo: ", e.target.error); // エラーメッセージの表示
      };
    };
    syncTodos(); // localStorageに同期
  });

  const destroy = document.createElement("button"); // 削除ボタンを作成
  destroy.innerHTML = "❌"; // 削除アイコンを設定

  // 削除ボタンがクリックされたときの処理
  destroy.addEventListener("click", () => {
    elem.remove(); // リストからToDoを削除

    // データベースからToDoを削除
    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.delete(id); // ToDoを削除

    request.onerror = (e) => {
      console.error("Error deleting todo: ", e.target.error); // エラーメッセージの表示
    };
    syncTodos(); // localStorageに同期
  });

  // 作成した要素をリストアイテムに追加
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem); // リストの先頭に追加
};

// データベースを開く
openDB();

// localStorageに保存されているToDoがあれば読み込む
if (localStorage.getItem("todos")) {
  loadTodosFromLocalStorage();
} else {
  loadTodos(); // データベースから読み込む
}
