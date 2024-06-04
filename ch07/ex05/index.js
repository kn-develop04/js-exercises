// pushの非破壊的なバージョン
export function pushNonDetroy(array, ...elements) {
  return array.concat(elements);
}

// popの非破壊的なバージョン
export function popNonDestroy(array) {
  return array.slice(0, -1);
}

// shiftの非破壊的なバージョン
export function shiftNonDestroy(array) {
  return array.slice(1);
}

// unshiftの非破壊的なバージョン
export function unshiftNonDestroy(array, ...elements) {
  return elements.concat(array);
}

// sortの非破壊的なバージョン
export function sortNonDestroy(array, func) {
  return [...array].sort(func);
}
