import { expect, test } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffCss/DiffCss.ts'
import { getTableColumnWidths } from '../src/parts/GetTableColumnWidths/GetTableColumnWidths.ts'
import { handleColumnResizeEnd, handleColumnResizeMove, handleColumnResizeStart } from '../src/parts/HandleColumnResize/HandleColumnResize.ts'

const createState = (): ProblemsState => ({ ...createDefaultState(), columnWidths: [0.2, 0.4, 0.3, 0.1], width: 1030, x: 200 })

test.each([1, 2, 3])('divider %i resizes only adjacent columns from the pointer starting position', (column) => {
  const state = createState()
  const start = handleColumnResizeStart(state, String(column), 450)
  const moved = handleColumnResizeMove(start, 475)
  const final = handleColumnResizeMove(moved, 500)
  for (let index = 0; index < 4; index++) {
    let delta = 0
    if (index === column - 1) {
      delta = 0.05
    } else if (index === column) {
      delta = -0.05
    }
    expect(final.columnWidths[index]).toBeCloseTo(state.columnWidths[index] + delta)
  }
  expect(getTableColumnWidths(final.width, final.columnWidths)[0]).toBe(30)
  expect(final.columnWidths.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1)
  expect(isEqual(state, final)).toBe(false)
  expect(state.columnWidths).toEqual([0.2, 0.4, 0.3, 0.1])
})

test.each([-10_000, 10_000])('dragging beyond the table keeps adjacent columns at their minimum width (%i)', (clientX) => {
  const state = handleColumnResizeStart(createState(), '2', 450)
  const moved = handleColumnResizeMove(state, clientX)
  const widths = getTableColumnWidths(moved.width, moved.columnWidths)
  expect(Math.min(widths[2], widths[3])).toBeCloseTo(40)
  expect(widths.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1030)
})

test.each(['0', '4', 'invalid', '1.5'])('ignores invalid and fixed dividers (%s)', (name) => {
  const state = createState()
  expect(handleColumnResizeStart(state, name, 0)).toBe(state)
})

test('stops resizing on pointer release or capture loss', () => {
  const state = createState()
  expect(handleColumnResizeMove(state, 500)).toBe(state)
  const moved = handleColumnResizeMove(handleColumnResizeStart(state, '1', 450), 500)
  const ended = handleColumnResizeEnd(moved)
  expect(handleColumnResizeMove(ended, 800)).toBe(ended)
  expect(ended.columnWidths).toBe(moved.columnWidths)
})

test('handles a narrow or hidden panel without negative widths', () => {
  const narrow = { ...createState(), width: 100 }
  const moved = handleColumnResizeMove(handleColumnResizeStart(narrow, '3', 50), 1000)
  expect(getTableColumnWidths(100, moved.columnWidths).every((value) => value >= 0)).toBe(true)
  const hidden = handleColumnResizeStart({ ...createState(), width: 0 }, '1', 50)
  expect(handleColumnResizeMove(hidden, 100)).toBe(hidden)
})

test('keeps the severity column fixed and scales the other columns with the panel', () => {
  expect(getTableColumnWidths(530, [0.2, 0.4, 0.3, 0.1])).toEqual([30, 100, 200, 150, 50])
  expect(getTableColumnWidths(0, [0.2, 0.4, 0.3, 0.1])).toEqual([30, 0, 0, 0, 0])
})
