import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const toggleFileGroup = (state: ProblemsState, uri: string): ProblemsState => {
  const { collapsedUris } = state
  const newCollapsedUris = collapsedUris.includes(uri) ? collapsedUris.filter((collapsedUri) => collapsedUri !== uri) : [...collapsedUris, uri]
  return {
    ...state,
    collapsedUris: newCollapsedUris,
  }
}
