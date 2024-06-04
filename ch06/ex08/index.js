export function restrict(target, template) {
  for (const key in target) {
    if (!template.hasOwnProperty(key)) {
      delete target[key];
    }
  }
  return target;
}

export function substract(target, ...sources) {
  if (Object.keys(sources).length === 0) {
    return target;
  }
  for (const source of sources) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }
  return target;
}
