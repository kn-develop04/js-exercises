export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retryCount = 0;

  function attemptRetry() {
    let result = func();

    if (result === true) {
      callback(true);
    } else if (retryCount < maxRetry) {
      retryCount++;
      const delay = Math.pow(2, retryCount - 1) * 1000; // 待ち時間は 2^(retryCount - 1) 秒
      setTimeout(attemptRetry, delay);
    } else {
      // 最大リトライ回数に達した場合、callback を呼び出して終了
      callback(false);
    }
  }

  attemptRetry();
}
