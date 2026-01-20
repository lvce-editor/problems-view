import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleShowInfos = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    showInfos: !state.showInfos,
  }
}
