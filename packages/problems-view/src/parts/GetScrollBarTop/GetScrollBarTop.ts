export const getScrollBarTop = (height: number, finalDeltaY: number, deltaY: number, scrollBarHeight: number): number => {
  if (finalDeltaY <= 0 || !Number.isFinite(finalDeltaY)) {
    return 0
  }
  const scrollBarTop = Math.round((deltaY / finalDeltaY) * (height - scrollBarHeight))
  return Number.isFinite(scrollBarTop) ? scrollBarTop : 0
}
