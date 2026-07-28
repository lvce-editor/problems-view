export const getNumberOfVisibleItems = (listHeight: number, itemHeight: number): number => {
  if (listHeight <= 0 || itemHeight <= 0) {
    return 0
  }
  return Math.ceil(listHeight / itemHeight) + 1
}
