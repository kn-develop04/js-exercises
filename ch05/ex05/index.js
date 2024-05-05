export function getEvenNum(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (value % 2 !== 0) {
      delete obj[key];
    }
  }
  return obj;
}
