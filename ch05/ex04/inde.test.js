import { fibAtWhile, fibAtDoWhile, fibAtFor } from ".";

test("初項と第 2 項を 1 とするフィボナッチ数列の最初の 10 個を返す", () => {
  expect(fibAtWhile()).toBe("1,1,2,3,5,8,13,21,34,55");
  expect(fibAtDoWhile()).toBe("1,1,2,3,5,8,13,21,34,55");
  expect(fibAtFor()).toBe("1,1,2,3,5,8,13,21,34,55");
});
