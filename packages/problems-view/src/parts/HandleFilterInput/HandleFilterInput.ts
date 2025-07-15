import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const handleFilterInput = (state: ProblemsState, value: string): ProblemsState => {
  return {
    ...state,
    filterValue: value,
  }
}
