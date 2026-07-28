import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetProblemsVirtualDom from '../GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as GetVisibleProblemCount from '../GetVisibleProblemCount/GetVisibleProblemCount.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderItems = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const {
    activeUri,
    collapsedUris,
    filterValue,
    focusedIndex,
    maxLineY,
    message,
    minLineY,
    problems,
    scrollBarActive,
    scrollBarHeight,
    smallWidthBreakPoint,
    viewMode,
    width,
  } = newState
  const problemCount = GetVisibleProblemCount.getVisibleProblemCount(problems, collapsedUris, filterValue, viewMode)
  const visible = GetVisibleProblems.getVisibleProblems(problems, collapsedUris, focusedIndex, filterValue, minLineY, maxLineY, viewMode)
  const isSmall = width <= smallWidthBreakPoint
  const dom = GetProblemsVirtualDom.getProblemsVirtualDom(
    activeUri,
    viewMode,
    visible,
    filterValue,
    isSmall,
    message,
    scrollBarHeight,
    scrollBarActive,
    problemCount,
  )
  return ['Viewlet.setDom2', dom]
}
