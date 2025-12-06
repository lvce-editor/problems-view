import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'

export const handleClickAt = (state: ProblemsState, eventX: number, eventY: number): ProblemsState => {
  const { itemHeight, problems, x, y } = state

  // TODO use functional focus rendering
  // Focus.setFocus(FocusKey.Problems)
  if (problems.length === 0) {
    return focusIndex(state, -1)
  }
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, 0, itemHeight)
  if (index > problems.length) {
    return focusIndex(state, -1)
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
