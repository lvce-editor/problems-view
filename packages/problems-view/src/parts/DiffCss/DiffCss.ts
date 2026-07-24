import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const isEqual = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  return oldState.collapsedUris === newState.collapsedUris && oldState.filterValue === newState.filterValue && oldState.problems === newState.problems
}
