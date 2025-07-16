import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const viewAsList = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    viewMode: ProblemsViewMode.List,
  }
}
