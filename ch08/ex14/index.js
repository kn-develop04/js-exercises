export function any(...funcs) {
  return function (...args) {
    for (let func of funcs) {
      if (func(...args)) {
        return true;
      }
    }
    return false;
  };
}

export function catching(func1, func2) {
  return function (...args) {
    try {
      return func1(...args);
    } catch (error) {
      return func2(error);
    }
  };
}
