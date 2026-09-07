import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { haveSameCollapsedUris } from '../HaveSameCollapsedUris/HaveSameCollapsedUris.ts'

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
    oldState.showErrors === newState.showErrors &&
    oldState.showInfos === newState.showInfos &&
    oldState.showWarnings === newState.showWarnings &&
    oldState.filterValue === newState.filterValue &&
    oldState.message === newState.message &&
    oldState.scrollBarActive === newState.scrollBarActive &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.width === newState.width &&
    oldState.viewMode === newState.viewMode
  )
}
