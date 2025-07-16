import { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const isEqual = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  return oldState.problems === newState.problems
}
