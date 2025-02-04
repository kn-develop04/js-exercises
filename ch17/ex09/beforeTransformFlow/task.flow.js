// @flow

// User型を定義
type User = {
  id: number,
  name: string,
};

// Priority型を定義
type Priority = "low" | "middle" | "high";

// Task型を定義
type Task = {
  title: string,
  completed: boolean,
  user: User,
};

// PriorityTask型を定義
type PriorityTask = Task & {
  priority: Priority,
};

// Userオブジェクトであることを判定する
function isUserObject(obj: mixed): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj["id"] === "number" &&
    typeof obj["name"] === "string"
  );
}

export class TaskManager<T: Task> {
  _tasks: Array<T>;

  constructor() {
    this._tasks = [];
  }

  // タスクを追加する
  add(task: T): void {
    this._tasks.push(task);
  }

  // タスクを完了にする
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  getTasks(predicate?: (task: T) => boolean): Array<T> {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
  return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg: T) => !f(arg);
}

// npx flow-remove-types .\ex09\beforeTransformFlow\task.flow.js -o ./ex09/task.flow.js
