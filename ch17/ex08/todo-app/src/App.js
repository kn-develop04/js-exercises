import React, { useState } from "react";

const App = () => {
  // ToDoのリストの状態
  const [todos, setTodos] = useState([]);
  // 新しいToDoの入力状態
  const [newTodo, setNewTodo] = useState("");

  // 新しいタスクを追加する
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo = {
      id: Date.now(), // 一意なIDを生成
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([todo, ...todos]); // 新しいタスクを先頭に追加
    setNewTodo(""); // 入力フィールドを空にする
  };

  // タスクの完了状態を切り替える
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // タスクを削除する
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // 削除対象を除外
  };

  return (
    <div>
      <h1>Simple ToDo</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // 入力値を更新
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)} // 完了状態を切り替える
            />
            <label
              style={{
                textDecorationLine: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </label>
            <button onClick={() => handleDeleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
