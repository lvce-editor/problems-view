import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetProblemsVirtualDom from '../GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderItems = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const { problems, width, smallWidthBreakPoint, collapsedUris, focusedIndex, viewMode, filterValue, message } = newState
  const visible = GetVisibleProblems.getVisibleProblems(problems, collapsedUris, focusedIndex, filterValue)
  const isSmall = width <= smallWidthBreakPoint
  const dom = GetProblemsVirtualDom.getProblemsVirtualDom(viewMode, visible, filterValue, isSmall, message)
  return ['Viewlet.setDom2', dom]
}
