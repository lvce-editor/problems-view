import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetProblemsVirtualDom from '../GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderItems = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const visible = GetVisibleProblems.getVisibleProblems(newState.problems, newState.collapsedUris, newState.focusedIndex, newState.filterValue)
  const isSmall = newState.width <= newState.smallWidthBreakPoint
  const dom = GetProblemsVirtualDom.getProblemsVirtualDom(newState.viewMode, visible, newState.filterValue, isSmall)
  return ['Viewlet.setDom2', dom]
}
