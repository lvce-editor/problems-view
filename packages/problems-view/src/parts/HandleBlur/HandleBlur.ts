import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const handleBlur = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    focusedIndex: -2,
  }
}
