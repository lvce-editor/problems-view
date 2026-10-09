import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetProblemsVirtualDom from '../GetProblemsVirtualDom/GetProblemsVirtualDom.ts'
import * as GetVisibleProblemCount from '../GetVisibleProblemCount/GetVisibleProblemCount.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const getComponentDom = (state: ProblemsState): readonly VirtualDomNode[] => {
  const {
    collapsedUris,
    fileIconCache,
    filterValue,
    focusedIndex,
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
  } = state
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
  return GetProblemsVirtualDom.getProblemsVirtualDom(
    viewMode,
    visible,
    filterValue,
    width <= smallWidthBreakPoint,
    message,
    scrollBarHeight,
    scrollBarActive,
    problemCount,
    workspaceUri,
  )
}
