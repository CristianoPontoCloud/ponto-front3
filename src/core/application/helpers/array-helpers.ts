function swapWithPrevious({ arr, index }: { arr: Array<unknown>, index: number }) {
  if (index === 0 || index >= arr.length) return;
  [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
}
function swapWithNext({ arr, index }: { arr: Array<unknown>, index: number }) {
  if (index < 0 || index >= arr.length - 1) return;
  [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
}
export const arrayHelper = {
  swapWithPrevious,
  swapWithNext,
  // excludeItem
}
