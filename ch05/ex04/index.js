export function fibAtWhile() {
  const value = [1, 1];
  let i = 0;
  while (i < 8) {
    value[i + 2] = value[i] + value[i + 1];
    i++;
  }
  return value.toString();
}

export function fibAtDoWhile() {
  const value = [1, 1];
  let i = 0;
  do {
    value[i + 2] = value[i] + value[i + 1];
    i++;
  } while (i < 8);
  return value.toString();
}

export function fibAtFor() {
  const value = [1, 1];
  for (let i = 0; i < 8; i++) {
    value[i + 2] = value[i] + value[i + 1];
  }
  return value.toString();
}
