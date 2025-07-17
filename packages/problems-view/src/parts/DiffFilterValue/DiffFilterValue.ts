import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const isEqual = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  return newState.inputSource === InputSource.User || oldState.filterValue === newState.filterValue
}
