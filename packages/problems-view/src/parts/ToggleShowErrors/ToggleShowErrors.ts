import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleShowErrors = (state: ProblemsState): ProblemsState => {
  const { showErrors } = state
  return {
    ...state,
    showErrors: !showErrors,
  }
}
