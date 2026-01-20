import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleShowErrors = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    showErrors: !state.showErrors,
  }
}
