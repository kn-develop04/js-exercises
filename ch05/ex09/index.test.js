import { parse } from ".";

test("Jsonとしてパースできる", () => {
  expect(parse('{"count":1,"fruit":"りんご"}')).toStrictEqual({
    success: true,
    data: { count: 1, fruit: "りんご" },
  });
  expect(parse('{"count":null,"fruit":null}')).toStrictEqual({
    success: true,
    data: { count: null, fruit: null },
  });
});

test("Jsonとしてパースできない", () => {
  expect(parse({ count: undefined })).toHaveProperty("error"); // プロパティにerrorが含まれる場合はパースできておらずエラーが出ている
});
