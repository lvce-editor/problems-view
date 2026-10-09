import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const haveSameCollapsedUris = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  const oldCollapsedUris = oldState.collapsedUris
  const newCollapsedUris = newState.collapsedUris
  if (oldCollapsedUris === newCollapsedUris) {
    return true
  }
  if (!oldCollapsedUris || !newCollapsedUris) {
    return false
  }
  return oldCollapsedUris.length === newCollapsedUris.length && oldCollapsedUris.every((uri, index) => uri === newCollapsedUris[index])
}
