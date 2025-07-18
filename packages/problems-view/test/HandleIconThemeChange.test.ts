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
    width: 800,
    height: 600,
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
    { uri: 'file1.ts', message: 'Error 1', line: 1, column: 1, severity: 'error' },
    { uri: 'file2.ts', message: 'Warning 1', line: 2, column: 3, severity: 'warning' },
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