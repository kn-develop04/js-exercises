export function sum(ary) {
  if (ary === undefined) return 0;
  return ary.reduce((acc, curr) => acc + curr, 0);
}

export function join(ary, separator = ",") {
  if (separator === null) separator = "null";

  return ary.reduce((acc, curr, index) => {
    if (curr === null) {
      return acc + separator;
    }
    if (index === 0) {
      return curr;
    }
    return acc + separator + curr;
  }, "");
}

export function reverse(ary) {
  return ary.reduce((acc, curr) => {
    return [curr, ...acc];
  }, []);
}

export function every(ary, callback) {
  return ary.reduce((acc, curr, index, array) => {
    if (curr === undefined) {
      return acc;
    }
    return acc && callback(curr, index, array);
  }, true);
}

export function some(ary, callback) {
  return ary.reduce((acc, curr, index, array) => {
    if (callback(curr, index, array)) {
      return true;
    }
    return acc;
  }, false);
}
