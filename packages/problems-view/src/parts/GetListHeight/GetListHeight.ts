import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

const FilterHeight = 24
const TableHeaderHeight = 22

export const getListTopOffset = (width: number, smallWidthBreakPoint: number, viewMode: number): number => {
  const filterHeight = viewMode !== ProblemsViewMode.None && width <= smallWidthBreakPoint ? FilterHeight : 0
  const tableHeaderHeight = viewMode === ProblemsViewMode.Table ? TableHeaderHeight : 0
  return filterHeight + tableHeaderHeight
}

export const getListHeight = (height: number, width: number, smallWidthBreakPoint: number, viewMode: number): number => {
  return Math.max(height - getListTopOffset(width, smallWidthBreakPoint, viewMode), 0)
}
