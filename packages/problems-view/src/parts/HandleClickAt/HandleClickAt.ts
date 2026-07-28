import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as GetVisibleProblemCount from '../GetVisibleProblemCount/GetVisibleProblemCount.ts'

export const handleClickAt = (state: ProblemsState, eventX: number, eventY: number): ProblemsState => {
  const { collapsedUris, deltaY, filterValue, itemHeight, problems, smallWidthBreakPoint, viewMode, width, x, y } = state

  // TODO use functional focus rendering
  // Focus.setFocus(FocusKey.Problems)
  const problemCount = GetVisibleProblemCount.getVisibleProblemCount(problems, collapsedUris, filterValue, viewMode)
  if (problemCount === 0) {
    return focusIndex(state, -1)
  }
  const listTopOffset = GetListHeight.getListTopOffset(width, smallWidthBreakPoint, viewMode)
  const index = GetListIndex.getListIndex(eventX, eventY, x, y + listTopOffset, deltaY, itemHeight)
  if (index < 0 || index >= problemCount) {
    return focusIndex(state, -1)
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
