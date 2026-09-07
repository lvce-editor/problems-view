import { ViewletCommand as ViewletCommandConstants } from '@lvce-editor/constants'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetIndentRule from '../GetIndentRule/GetIndentRule.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetScrollBarTop from '../GetScrollBarTop/GetScrollBarTop.ts'
import * as GetUniqueIndents from '../GetUniqueIndents/GetUniqueIndents.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderCss = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const {
    collapsedUris,
    deltaY,
    fileIconCache,
    filterValue,
    finalDeltaY,
    focusedIndex,
    height,
    itemHeight,
    maxLineY,
    minLineY,
    problems,
    scrollBarHeight,
    showErrors,
    showInfos,
    showWarnings,
    smallWidthBreakPoint,
    uid,
    viewMode,
    width,
  } = newState
  const visibleProblems = GetVisibleProblems.getVisibleProblems(
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
  const uniqueIndents = GetUniqueIndents.getUniqueIndents(visibleProblems)
  const listHeight = GetListHeight.getListHeight(height, width, smallWidthBreakPoint, viewMode)
  const scrollBarTop = GetScrollBarTop.getScrollBarTop(listHeight, finalDeltaY, deltaY, scrollBarHeight)
  const itemOffset = itemHeight > 0 ? -(deltaY % itemHeight) : 0
  const rules = [
    `.ProblemsTableRow {
  height: ${itemHeight}px;
}
.Problems .ScrollBarThumb {
  height: ${scrollBarHeight}px;
  translate: 0 ${scrollBarTop}px;
}
.ProblemsList > .Problem:first-child,
.ProblemsTableBody > .ProblemsTableRow:first-child {
  margin-top: ${itemOffset}px;
}`,
    ...uniqueIndents.map(GetIndentRule.getIndentRule),
  ]
  const css = rules.join('\n')
  return [ViewletCommandConstants.SetCss, uid, css]
}
