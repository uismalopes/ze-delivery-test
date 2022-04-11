export function isEmptyObject(obj = {}) {
  if (Object.getPrototypeOf(obj) !== Object.prototype) return true;
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}
