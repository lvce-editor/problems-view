import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleShowWarnings = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    showWarnings: !state.showWarnings,
  }
}
