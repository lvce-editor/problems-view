import * as Diff from '../Diff/Diff.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'
import * as UpdateVirtualList from '../UpdateVirtualList/UpdateVirtualList.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { newState, oldState } = ProblemsStates.get(uid)
  const updatedState = UpdateVirtualList.updateVirtualList(newState)
  ProblemsStates.set(uid, oldState, updatedState)
  const diffResult = Diff.diff(oldState, updatedState)
  return diffResult
}
