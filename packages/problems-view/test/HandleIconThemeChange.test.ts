import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleIconThemeChange } from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'

test('handleIconThemeChange returns new state with recreated problems array', () => {
  const state: ProblemsState = createDefaultState()
  const result = handleIconThemeChange(state)

  expect(result).not.toBe(state)
  expect(result.problems).not.toBe(state.problems)
  expect(result.problems).toEqual(state.problems)
  expect(result).toEqual({
    ...state,
    problems: [...state.problems],
  })
})

test('handleIconThemeChange preserves all other state properties', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test filter',
    focusedIndex: 5,
    height: 600,
    width: 800,
  }

  const result = handleIconThemeChange(state)

  expect(result.filterValue).toBe(state.filterValue)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.width).toBe(state.width)
  expect(result.height).toBe(state.height)
  expect(result.uid).toBe(state.uid)
  expect(result.message).toBe(state.message)
})

test('handleIconThemeChange works with empty problems array', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    problems: [],
  }

  const result = handleIconThemeChange(state)

  expect(result.problems).toEqual([])
  expect(result.problems).not.toBe(state.problems)
})

test('handleIconThemeChange works with problems array containing items', () => {
  const mockProblems = [
    { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
    { column: 3, line: 2, message: 'Warning 1', severity: 'warning', uri: 'file2.ts' },
  ] as any

  const state: ProblemsState = {
    ...createDefaultState(),
    problems: mockProblems,
  }

  const result = handleIconThemeChange(state)

  expect(result.problems).toEqual(mockProblems)
  expect(result.problems).not.toBe(state.problems)
  expect(result.problems[0]).toBe(mockProblems[0])
  expect(result.problems[1]).toBe(mockProblems[1])
})
