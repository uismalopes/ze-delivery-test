export function isEmptyArray(arr: any) {
  if (!Array.isArray(arr)) return true;

  return arr.length === 0;
}
