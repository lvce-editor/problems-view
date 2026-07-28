import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as SetDeltaY from '../SetDeltaY/SetDeltaY.ts'

export const handleWheel = (state: ProblemsState, deltaMode: number, deltaY: number): ProblemsState => {
  const { deltaY: currentDeltaY } = state
  return SetDeltaY.setDeltaY(state, currentDeltaY + deltaY)
}
