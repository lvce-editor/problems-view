import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const resize = (state: ProblemsState, dimensions: Partial<Pick<ProblemsState, 'height' | 'width' | 'x' | 'y'>>): ProblemsState => {
  return {
    ...state,
    ...dimensions,
  }
}
