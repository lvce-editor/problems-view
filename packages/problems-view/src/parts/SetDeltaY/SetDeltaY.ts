import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as UpdateVirtualList from '../UpdateVirtualList/UpdateVirtualList.ts'

export const setDeltaY = (state: ProblemsState, deltaY: number): ProblemsState => {
  return UpdateVirtualList.updateVirtualList(state, deltaY)
}
