import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const resize = (state: ProblemsState, dimensions: any): ProblemsState => {
  return {
    ...state,
    ...dimensions,
  }
}
