import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

const haveSameCollapsedUris = (oldState: ProblemsState, newState: ProblemsState): boolean => {
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

export const isEqual = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  return (
    oldState.activeUri === newState.activeUri &&
    haveSameCollapsedUris(oldState, newState) &&
    oldState.fileIconCache === newState.fileIconCache &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.height === newState.height &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.problems === newState.problems &&
    oldState.filterValue === newState.filterValue &&
    oldState.message === newState.message &&
    oldState.scrollBarActive === newState.scrollBarActive &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.width === newState.width &&
    oldState.viewMode === newState.viewMode
  )
}
