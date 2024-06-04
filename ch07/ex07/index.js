export function bubbleSort(val) {
  for (let i = 0; i < val.length; i++) {
    for (let j = val.length - 1; j > i; j--) {
      if (val[j] < val[j - 1]) {
        let tmp = val[j];
        val[j] = val[j - 1];
        val[j - 1] = tmp;
      }
    }
  }
  return val;
}
