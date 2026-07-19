import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleShowWarnings = (state: ProblemsState): ProblemsState => {
  const { showWarnings } = state
  return {
    ...state,
    showWarnings: !showWarnings,
  }
}
