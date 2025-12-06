import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: ProblemsState): SavedState => {
  const { collapsedUris, filterValue, viewMode } = state
  return {
    collapsedUris,
    filterValue,
    viewMode,
  }
}
