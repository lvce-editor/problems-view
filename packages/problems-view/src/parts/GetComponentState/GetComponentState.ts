import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'

export const getComponentState = (uid: number): ProblemsState => {
  return ProblemsStates.get(uid).newState
}
