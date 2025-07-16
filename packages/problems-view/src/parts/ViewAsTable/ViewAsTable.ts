import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const viewAsTable = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    viewMode: ProblemsViewMode.Table,
  }
}
