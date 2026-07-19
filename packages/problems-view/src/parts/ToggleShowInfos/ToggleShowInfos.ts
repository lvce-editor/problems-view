import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleShowInfos = (state: ProblemsState): ProblemsState => {
  const { showInfos } = state
  return {
    ...state,
    showInfos: !showInfos,
  }
}
