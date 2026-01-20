import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'

test('handleClickAt with empty problems returns focusedIndex -1', () => {
  const state: ProblemsState = createDefaultState()
  const result = handleClickAt(state, 100, 100)

  expect(result.focusedIndex).toBe(-1)
})

test('handleClickAt with problems and click at first item', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
      { column: 2, line: 2, message: 'Error 2', severity: 'error', uri: 'file2.ts' },
    ] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 11)

  expect(result.focusedIndex).toBe(0)
})

test('handleClickAt with problems and click at second item', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
      { column: 2, line: 2, message: 'Error 2', severity: 'error', uri: 'file2.ts' },
    ] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 33)

  expect(result.focusedIndex).toBe(1)
})

test('handleClickAt with problems and click at last item', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
      { column: 2, line: 2, message: 'Error 2', severity: 'error', uri: 'file2.ts' },
    ] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 43)

  expect(result.focusedIndex).toBe(1)
})

test('handleClickAt with problems and click beyond problems length returns focusedIndex -1', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [{ column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' }] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 50)

  expect(result.focusedIndex).toBe(-1)
})

test('handleClickAt with problems and click exactly at problems length boundary returns focusedIndex -1', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [{ column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' }] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 44)

  expect(result.focusedIndex).toBe(-1)
})

test('handleClickAt with offset y position', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
      { column: 2, line: 2, message: 'Error 2', severity: 'error', uri: 'file2.ts' },
    ] as any,
    x: 10,
    y: 20,
  }
  const result = handleClickAt(state, 50, 31)

  expect(result.focusedIndex).toBe(0)
})

test('handleClickAt preserves other state properties', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test',
    focusedIndex: 5,
    itemHeight: 22,
    problems: [{ column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' }] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 11)

  expect(result.focusedIndex).toBe(0)
  expect(result.filterValue).toBe('test')
  expect(result.problems).toBe(state.problems)
})

test('handleClickAt with multiple problems and click at middle item', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    itemHeight: 22,
    problems: [
      { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
      { column: 2, line: 2, message: 'Error 2', severity: 'error', uri: 'file2.ts' },
      { column: 3, line: 3, message: 'Error 3', severity: 'error', uri: 'file3.ts' },
      { column: 4, line: 4, message: 'Error 4', severity: 'error', uri: 'file4.ts' },
    ] as any,
    x: 0,
    y: 0,
  }
  const result = handleClickAt(state, 50, 55)

  expect(result.focusedIndex).toBe(2)
})
