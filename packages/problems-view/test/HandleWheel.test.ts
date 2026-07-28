import { expect, test } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import { updateVirtualList } from '../src/parts/UpdateVirtualList/UpdateVirtualList.ts'

const problem = {
  code: '',
  columnIndex: 1,
  count: 1,
  fileName: 'file.ts',
  level: 2,
  listItemType: 0,
  message: 'problem',
  posInSet: 1,
  relativePath: 'file.ts',
  rowIndex: 1,
  setSize: 1,
  source: 'test',
  type: 'error',
  uri: 'file:///file.ts',
} satisfies Problem

test('handleWheel updates the virtual range', () => {
  const state = updateVirtualList({
    ...createDefaultState(),
    height: 100,
    itemHeight: 20,
    problems: Array.from({ length: 20 }, () => ({ ...problem })),
    viewMode: ProblemsViewMode.List,
    width: 800,
  })

  const newState = handleWheel(state, 0, 50)

  expect(newState.deltaY).toBe(50)
  expect(newState.minLineY).toBe(2)
  expect(newState.maxLineY).toBe(8)
})

test('handleWheel clamps scrolling above and below the content', () => {
  const state = updateVirtualList({
    ...createDefaultState(),
    height: 100,
    itemHeight: 20,
    problems: Array.from({ length: 10 }, () => ({ ...problem })),
    viewMode: ProblemsViewMode.List,
    width: 800,
  })

  expect(handleWheel(state, 0, -50).deltaY).toBe(0)
  expect(handleWheel(state, 0, 1000).deltaY).toBe(100)
})
