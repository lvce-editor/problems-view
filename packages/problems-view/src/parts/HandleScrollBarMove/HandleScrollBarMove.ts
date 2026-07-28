import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as SetDeltaY from '../SetDeltaY/SetDeltaY.ts'

export const handleScrollBarMove = (state: ProblemsState, eventY: number): ProblemsState => {
  const { finalDeltaY, handleOffset, height, scrollBarActive, scrollBarHeight, smallWidthBreakPoint, viewMode, width, y } = state
  if (!scrollBarActive) {
    return state
  }
  const listTopOffset = GetListHeight.getListTopOffset(width, smallWidthBreakPoint, viewMode)
  const listHeight = GetListHeight.getListHeight(height, width, smallWidthBreakPoint, viewMode)
  const availableTrackHeight = listHeight - scrollBarHeight
  const relativeY = eventY - y - listTopOffset - handleOffset
  const percent = availableTrackHeight <= 0 ? 0 : relativeY / availableTrackHeight
  return SetDeltaY.setDeltaY(state, percent * finalDeltaY)
}
