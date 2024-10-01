import { test, expect } from "@playwright/test";

test("各プルダウンを選択していき、表示されている値が変わること", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:8080/ch15.01-03/ex14/index.html");
  //初期表示
  await expect(page.getByTestId("food1")).toBeVisible();
  await expect(page.getByTestId("stationery1")).toBeVisible();
  await expect(page.getByTestId("stationery2")).toBeVisible();
  //食品を選択
  await page.getByTestId("select").selectOption("food");
  await expect(page.getByTestId("food1")).toBeVisible();
  //文房具を選択
  await page.getByTestId("select").selectOption("stationery");
  await expect(page.getByTestId("stationery1")).toBeVisible();
  await expect(page.getByTestId("stationery2")).toBeVisible();
  //すべてを選択
  await page.getByTestId("select").selectOption("all");
  await expect(page.getByTestId("food1")).toBeVisible();
  await expect(page.getByTestId("stationery1")).toBeVisible();
  await expect(page.getByTestId("stationery2")).toBeVisible();
});
