import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

export const isEqual = (oldState: ProblemsState, newState: ProblemsState): boolean => {
  return (
    oldState.collapsedUris === newState.collapsedUris &&
    oldState.deltaY === newState.deltaY &&
    oldState.filterValue === newState.filterValue &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.height === newState.height &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.problems === newState.problems &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.viewMode === newState.viewMode &&
    oldState.width === newState.width
  )
}
