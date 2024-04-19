export function bitCount(num) {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if ((num & (1 << i)) !== 0) {
      count++;
    }
  }
  return count;
}
