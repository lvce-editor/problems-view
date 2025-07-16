import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const focusIndex = (state: ProblemsState, index: number): ProblemsState => {
  return {
    ...state,
    focusedIndex: index,
  }
}
