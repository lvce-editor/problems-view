import { ViewletCommand as ViewletCommandConstants } from '@lvce-editor/constants'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetIndentRule from '../GetIndentRule/GetIndentRule.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetScrollBarTop from '../GetScrollBarTop/GetScrollBarTop.ts'
import { getTableColumnWidths } from '../GetTableColumnWidths/GetTableColumnWidths.ts'
import * as GetUniqueIndents from '../GetUniqueIndents/GetUniqueIndents.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderCss = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const {
    collapsedUris,
    columnWidths,
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
  const widths = getTableColumnWidths(width, columnWidths)
  const dividerRules = widths.slice(0, -1).map((_, index) => {
    const left = widths.slice(0, index + 1).reduce((sum, value) => sum + value, 0)
    return `.Problems .ProblemsTableDivider${index} { left: ${left}px; }`
  })
  const rules = [
    `.Problems:has(.ProblemsContentTable) {
  display: flex;
  flex-direction: column;
}
.Problems .ProblemsContentTable {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}
.Problems .ProblemsContentTable > .ScrollBar {
  top: 22px;
}
.Problems .ProblemsTable {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
}
.Problems .ProblemsTableRow {
  display: grid;
  grid-template-columns: ${widths.map((value) => `${value}px`).join(' ')};
  gap: 0;
  align-items: center;
}
.Problems .ProblemsTableHeader {
  flex: none;
  font-weight: 600;
  border-bottom: 1px solid var(--TableColumnsBorder, var(--PanelBorder, #454545));
  box-sizing: border-box;
  height: 22px;
  overflow: hidden;
}
.Problems .ProblemsTableHeader .ProblemsTableRow {
  height: 21px;
  cursor: default;
  background: transparent;
}
.Problems .ProblemsTableBody {
  overflow: hidden;
  flex: 1;
  min-height: 0;
}
.Problems .ProblemsTableRowItem {
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  padding: 0 10px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Problems .ProblemsTableRowItem:first-child {
  display: flex;
  justify-content: center;
  padding: 0;
}
.Problems .ProblemsTableDivider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  transform: translateX(-3px);
  cursor: col-resize;
  touch-action: none;
  z-index: 1;
}
.Problems .ProblemsTableDivider::before {
  content: '';
  position: absolute;
  left: 3px;
  height: 100%;
  width: 1px;
  background: var(--TableColumnsBorder, var(--PanelBorder, #454545));
  pointer-events: none;
}
.Problems .ProblemsTableDivider:hover::before {
  background: var(--SashHoverBorder, #007fd4);
}
.Problems .ProblemsTableDivider0 {
  pointer-events: none;
  cursor: default;
}`,
    ...dividerRules,
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
