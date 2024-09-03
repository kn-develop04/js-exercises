import { retryWithExponentialBackoff } from ".";
describe("retryWithExponentialBackoff", () => {
  test("JSON Placeholderを用いてfetchするとJSONが返ってくること", async () => {
    const url = "https://jsonplaceholder.typicode.com/posts/1";

    // 成功する場合のテスト
    const response = await retryWithExponentialBackoff(
      () => fetch(url).then((res) => res.json()),
      5,
    );
    //成功した場合は以下のResponseが含まれる
    expect(response).toHaveProperty("userId");
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("body");
  }, 10000); //タイムアウト防止で長めに設定

  // 失敗ケースのテスト未記載
  //   test('最大リトライ回数失敗するとエラーが返ること', async () => {
  //     const url = 'https://exampleexampleexample.com'; // 存在しないエンドポイント

  //     expect(
  //       retryWithExponentialBackoff(() => fetch(url).then(res => res.json()), 1)
  //     ).toThrow(TypeError) // Fetchが失敗するため、エラーを期待
  //   });
});
