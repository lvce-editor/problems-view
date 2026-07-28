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
    filterValue,
    finalDeltaY,
    focusedIndex,
    height,
    itemHeight,
    maxLineY,
    minLineY,
    problems,
    scrollBarHeight,
    smallWidthBreakPoint,
    uid,
    viewMode,
    width,
  } = newState
  const visibleProblems = GetVisibleProblems.getVisibleProblems(problems, collapsedUris, focusedIndex, filterValue, minLineY, maxLineY, viewMode)
  const uniqueIndents = GetUniqueIndents.getUniqueIndents(visibleProblems)
  const listHeight = GetListHeight.getListHeight(height, width, smallWidthBreakPoint, viewMode)
  const scrollBarTop = GetScrollBarTop.getScrollBarTop(listHeight, finalDeltaY, deltaY, scrollBarHeight)
  const itemOffset = itemHeight > 0 ? -(deltaY % itemHeight) : 0
  const rules = [
    `.Problems {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.ProblemsContent {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}
.ProblemsList {
  contain: strict;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.ProblemsTableBody {
  overflow: hidden;
}
.ProblemsTableRow {
  height: ${itemHeight}px;
}
.ProblemsContentTable > .ScrollBar {
  top: 22px;
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
