export const getScrollBarSize = (size: number, contentSize: number, minimumSliderSize: number): number => {
  if (size <= 0 || size >= contentSize) {
    return 0
  }
  return Math.min(Math.max(Math.round(size ** 2 / contentSize), minimumSliderSize), size)
}
