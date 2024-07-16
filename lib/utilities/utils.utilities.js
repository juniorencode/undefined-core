const mergeObjectDeep = (target, source) => {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], mergeObjectDeep(target[key], source[key]));
    }
  }

  Object.assign(target || {}, source);
  return target;
};

export { mergeObjectDeep };
