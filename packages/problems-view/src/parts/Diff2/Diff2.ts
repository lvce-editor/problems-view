import * as Diff from '../Diff/Diff.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = ProblemsStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
