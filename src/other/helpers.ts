export function isObject(obj: unknown) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

export function deepOmit(target: any, key: string) {
  if (Array.isArray(target)) {
    for (let idx = 0; idx < target.length; idx++) {
      target[idx] = deepOmit(target[idx], key);
    }
    return target;
  }

  if (!isObject(target)) {
    return target;
  }

  return Object.keys(target).reduce(
    (a, c) => {
      if (c !== key) {
        a[c] = deepOmit(target[c], key);
      }
      return a;
    },
    {} as any
  );
}

export function deepCopy(thing: any) {
  return JSON.parse(JSON.stringify(thing));
}
