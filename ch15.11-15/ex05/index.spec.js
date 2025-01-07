import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
  await page.waitForTimeout(100); // 変更を反映させるために少し待機
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
  await page.waitForTimeout(100); // 削除後の変更を反映させるために少し待機
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

/**
 * IndexedDB のリセット用関数
 * @param {import("@playwright/test").Page} page
 */
const resetIndexedDB = async (page) => {
  await page.evaluate(() => {
    indexedDB.deleteDatabase("todoDB");
  });
};

test.describe("IndexedDB-based todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:8080/ch15.11-15/ex05/");
    await resetIndexedDB(page); // IndexedDB のリセット
    await page.evaluate(() => {
      localStorage.clear(); // テスト前に localStorage をリセット
    });
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    // リストが更新されるまで待機
    await page.waitForSelector("ul#todo-list li");

    const label1 = page.locator("text=質問表に質問を記載する");
    const label2 = page.locator("text=練習問題を完了する");

    // 両方のToDoが表示されるまで待機
    await label1.waitFor({ state: "visible", timeout: 5000 });
    await label2.waitFor({ state: "visible", timeout: 5000 });

    expect(await countToDos(page)).toBe(2); // 2つのToDoが追加されたことを確認

    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    // リストが更新されるまで待機
    await page.waitForSelector("ul#todo-list li");

    expect(await countToDos(page)).toBe(1); // ToDoが1つ残っていることを確認

    const todo = queryToDo(page, 0);
    const label = todo.getByText("練習問題を完了する");
  });

  test("complete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    // リストが更新されるまで待機
    await page.waitForSelector("ul#todo-list li");

    expect(await countToDos(page)).toBe(2); // 2つのToDoがあることを確認

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("質問表に質問を記載する");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("練習問題を完了する");
  });
});
