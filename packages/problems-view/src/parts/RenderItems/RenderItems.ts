import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetProblemsVirtualDom from '../GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as GetVisibleProblemCount from '../GetVisibleProblemCount/GetVisibleProblemCount.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderItems = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const {
    collapsedUris,
    fileIconCache,
    filterValue,
    focusedIndex,
    inputSource,
    maxLineY,
    message,
    minLineY,
    problems,
    scrollBarActive,
    scrollBarHeight,
    showErrors,
    showInfos,
    showWarnings,
    smallWidthBreakPoint,
    viewMode,
    width,
    workspaceUri,
  } = newState
  const problemCount = GetVisibleProblemCount.getVisibleProblemCount(
    problems,
    collapsedUris,
    filterValue,
    viewMode,
    showErrors,
    showWarnings,
    showInfos,
  )
  const visible = GetVisibleProblems.getVisibleProblems(
    problems,
    fileIconCache,
    collapsedUris,
    focusedIndex,
    filterValue,
    minLineY,
    maxLineY,
    viewMode,
    showErrors,
    showWarnings,
    showInfos,
  )
  const isSmall = width <= smallWidthBreakPoint
  const dom = GetProblemsVirtualDom.getProblemsVirtualDom(
    viewMode,
    visible,
    filterValue,
    inputSource,
    isSmall,
    message,
    scrollBarHeight,
    scrollBarActive,
    problemCount,
    workspaceUri,
  )
  return ['Viewlet.setDom2', newState.uid, dom]
}
