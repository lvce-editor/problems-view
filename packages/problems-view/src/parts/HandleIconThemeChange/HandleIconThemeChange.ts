import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const handleIconThemeChange = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    problems: [...state.problems],
  }
}
