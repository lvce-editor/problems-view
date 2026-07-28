import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetNewDeltaYPercent from '../GetNewDeltaYPercent/GetNewDeltaYPercent.ts'
import * as GetScrollBarTop from '../GetScrollBarTop/GetScrollBarTop.ts'
import * as SetDeltaY from '../SetDeltaY/SetDeltaY.ts'

export const handleScrollBarClick = (state: ProblemsState, eventY: number): ProblemsState => {
  const { deltaY, finalDeltaY, height, scrollBarHeight, smallWidthBreakPoint, viewMode, width, y } = state
  const listTopOffset = GetListHeight.getListTopOffset(width, smallWidthBreakPoint, viewMode)
  const listHeight = GetListHeight.getListHeight(height, width, smallWidthBreakPoint, viewMode)
  const relativeY = eventY - y - listTopOffset
  const scrollBarTop = GetScrollBarTop.getScrollBarTop(listHeight, finalDeltaY, deltaY, scrollBarHeight)
  const offsetInThumb = relativeY - scrollBarTop
  if (offsetInThumb >= 0 && offsetInThumb < scrollBarHeight) {
    return {
      ...state,
      handleOffset: offsetInThumb,
      scrollBarActive: true,
    }
  }
  const { handleOffset, percent } = GetNewDeltaYPercent.getNewDeltaYPercent(listHeight, scrollBarHeight, relativeY)
  return {
    ...SetDeltaY.setDeltaY(state, percent * finalDeltaY),
    handleOffset,
    scrollBarActive: true,
  }
}
