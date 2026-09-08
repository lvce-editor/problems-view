import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { iconColumnWidth } from '../GetTableColumnWidths/GetTableColumnWidths.ts'

export const handleColumnResizeStart = (state: ProblemsState, name: string, clientX: number): ProblemsState => {
  const { columnWidths } = state
  const column = Number(name)
  if (!Number.isSafeInteger(column) || column < 1 || column > 3) {
    return state
  }
  return {
    ...state,
    resizeStartWidths: columnWidths,
    resizeStartX: clientX,
    resizingColumn: column,
  }
}

export const handleColumnResizeMove = (state: ProblemsState, clientX: number): ProblemsState => {
  const { resizeStartWidths, resizeStartX, resizingColumn, width } = state
  const availableWidth = width - iconColumnWidth
  if (!resizingColumn || availableWidth <= 0) {
    return state
  }
  const index = resizingColumn - 1
  const left = resizeStartWidths[index]
  const right = resizeStartWidths[index + 1]
  const minimum = Math.min(40 / availableWidth, left, right)
  const delta = Math.max(minimum - left, Math.min(right - minimum, (clientX - resizeStartX) / availableWidth))
  const columnWidths = [...resizeStartWidths]
  columnWidths[index] = left + delta
  columnWidths[index + 1] = right - delta
  return { ...state, columnWidths }
}

export const handleColumnResizeEnd = (state: ProblemsState): ProblemsState => {
  return { ...state, resizingColumn: 0 }
}
