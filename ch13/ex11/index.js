export function retryWithExponentialBackoff(func, maxRetry) {
  let attempt = 0;

  // リトライ処理を実行する内部関数
  function executeRetry() {
    return func()
      .then((result) => {
        // funcが成功した場合、成功の結果を返す
        return result;
      })
      .catch((error) => {
        if (attempt < maxRetry) {
          // リトライ回数を増やし、遅延を設定
          attempt++;
          const delay = Math.pow(2, attempt) * 1000;
          return new Promise((resolve) => {
            setTimeout(() => {
              // 指定した遅延後に再度リトライ
              resolve(executeRetry());
            }, delay);
          });
        } else {
          // 最大リトライ回数を超えた場合はエラー
          return Promise.reject(error);
        }
      });
  }

  // 初回のリトライを開始し、返り値はPromise
  return executeRetry();
}
