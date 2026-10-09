import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemsStates from '../ProblemsStates/ProblemsStates.ts'

const applyComponentState = (currentState: ProblemsState, state: ProblemsState): ProblemsState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Problems state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Problems state uid must remain ${currentUid}`)
  }
  return state
}

export const setComponentState = ProblemsStates.wrapCommand(applyComponentState)
