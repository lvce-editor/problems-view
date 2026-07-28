import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const handleScrollBarCaptureLost = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    scrollBarActive: false,
  }
}
