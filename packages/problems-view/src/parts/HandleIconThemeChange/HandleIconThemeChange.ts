import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const handleIconThemeChange = (state: ProblemsState): ProblemsState => {
  const { problems } = state
  return {
    ...state,
    problems: [...problems],
  }
}
