import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import * as GetVisibleProblemCount from '../GetVisibleProblemCount/GetVisibleProblemCount.ts'

export const updateVirtualList = (state: ProblemsState, newDeltaY?: number): ProblemsState => {
  const {
    collapsedUris,
    deltaY: currentDeltaY,
    filterValue,
    height,
    itemHeight,
    minimumSliderSize,
    problems,
    smallWidthBreakPoint,
    viewMode,
    width,
  } = state
  const itemCount = GetVisibleProblemCount.getVisibleProblemCount(problems, collapsedUris, filterValue, viewMode)
  const listHeight = GetListHeight.getListHeight(height, width, smallWidthBreakPoint, viewMode)
  const contentHeight = itemCount * itemHeight
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const requestedDeltaY = newDeltaY ?? currentDeltaY
  const deltaY = Math.min(Math.max(Number.isFinite(requestedDeltaY) ? requestedDeltaY : 0, 0), finalDeltaY)
  const minLineY = itemHeight > 0 ? Math.floor(deltaY / itemHeight) : 0
  const visibleCount = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(minLineY + visibleCount, itemCount)
  const scrollBarHeight = GetScrollBarSize.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
  return {
    ...state,
    deltaY,
    finalDeltaY,
    maxLineY,
    minLineY,
    scrollBarHeight,
  }
}
