import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const isEqual = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  return newState.focusedIndex < 0 || (oldState.focusedIndex === newState.focusedIndex && oldState.collapsedUris === newState.collapsedUris)
}
