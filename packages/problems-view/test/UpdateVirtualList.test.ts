import { expect, test } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import { updateVirtualList } from '../src/parts/UpdateVirtualList/UpdateVirtualList.ts'

const createProblem = (index: number): Problem => ({
  code: '',
  columnIndex: 1,
  count: 1,
  fileName: `file-${index}.ts`,
  level: 2,
  listItemType: 0,
  message: `problem ${index}`,
  posInSet: index + 1,
  relativePath: `file-${index}.ts`,
  rowIndex: index,
  setSize: 100,
  source: 'test',
  type: 'error',
  uri: `file:///file-${index}.ts`,
})

test('updateVirtualList derives the visible range and scrollbar geometry', () => {
  const problems = Array.from({ length: 100 }, (_, index) => createProblem(index))
  const state = {
    ...createDefaultState(),
    height: 100,
    itemHeight: 20,
    problems,
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const newState = updateVirtualList(state)

  expect(newState.deltaY).toBe(0)
  expect(newState.finalDeltaY).toBe(1900)
  expect(newState.minLineY).toBe(0)
  expect(newState.maxLineY).toBe(6)
  expect(newState.scrollBarHeight).toBe(20)
})

test('updateVirtualList preserves pixel scrolling and clamps to the end', () => {
  const problems = Array.from({ length: 10 }, (_, index) => createProblem(index))
  const state = {
    ...createDefaultState(),
    height: 100,
    itemHeight: 20,
    problems,
    viewMode: ProblemsViewMode.List,
    width: 800,
  }

  const middleState = updateVirtualList(state, 55)
  const endState = updateVirtualList(state, 1000)

  expect(middleState.deltaY).toBe(55)
  expect(middleState.minLineY).toBe(2)
  expect(middleState.maxLineY).toBe(8)
  expect(endState.deltaY).toBe(100)
  expect(endState.minLineY).toBe(5)
  expect(endState.maxLineY).toBe(10)
})

test('updateVirtualList excludes group rows in table mode', () => {
  const group = {
    ...createProblem(0),
    level: 1,
    listItemType: 1,
    message: '',
  }
  const state = {
    ...createDefaultState(),
    height: 42,
    itemHeight: 20,
    problems: [group, createProblem(1), createProblem(2)],
    viewMode: ProblemsViewMode.Table,
    width: 800,
  }

  const newState = updateVirtualList(state)

  expect(newState.finalDeltaY).toBe(20)
  expect(newState.maxLineY).toBe(2)
})

test('updateVirtualList accounts for the narrow-width filter', () => {
  const problems = Array.from({ length: 10 }, (_, index) => createProblem(index))
  const state = {
    ...createDefaultState(),
    height: 100,
    itemHeight: 20,
    problems,
    viewMode: ProblemsViewMode.List,
    width: 600,
  }

  const newState = updateVirtualList(state)

  expect(newState.finalDeltaY).toBe(124)
  expect(newState.maxLineY).toBe(5)
})
