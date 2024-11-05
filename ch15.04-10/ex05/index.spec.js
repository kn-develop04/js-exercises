import { test, expect } from "@playwright/test";

test("12-5のテスト", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080/ch15.04-10/ex05/index.html");
  const circle = await page.locator("inline-circle");

  // スタイルの確認
  const style = await circle.evaluate((el) => window.getComputedStyle(el));
  expect(style.backgroundColor).toBe("rgb(255, 0, 0)"); // 赤色
  expect(style.borderColor).toBe("rgb(0, 0, 0)"); // 黒色
});
