import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { getArrowRightNewFocusedIndex } from '../GetArrowRightNewFocusedIndex/GetArrowRightNewFocusedIndex.ts'

export const handleArrowRight = (state: ProblemsState): ProblemsState => {
  const { collapsedUris, focusedIndex, problems } = state
  const { index, newCollapsedUris } = getArrowRightNewFocusedIndex(problems, collapsedUris, focusedIndex)
  return {
    ...state,
    collapsedUris: newCollapsedUris,
    focusedIndex: index,
  }
}
