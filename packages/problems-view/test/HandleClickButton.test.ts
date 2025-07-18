import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickButton } from '../src/parts/HandleClickButton/HandleClickButton.ts'

test('handleClickButton returns the same state for any button name', async () => {
  const state: ProblemsState = createDefaultState()
  const result = await handleClickButton(state, 'testButton')

  expect(result).toBe(state)
})

test('handleClickButton returns the same state for empty button name', async () => {
  const state: ProblemsState = createDefaultState()
  const result = await handleClickButton(state, '')

  expect(result).toBe(state)
})

test('handleClickButton returns the same state for special characters in button name', async () => {
  const state: ProblemsState = createDefaultState()
  const result = await handleClickButton(state, 'button-with-special-chars!@#$%')

  expect(result).toBe(state)
})

test('handleClickButton returns the same state for different state configurations', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test filter',
    focusedIndex: 5,
    width: 800,
    height: 600,
  }
  const result = await handleClickButton(state, 'someButton')

  expect(result).toBe(state)
  expect(result.filterValue).toBe('test filter')
  expect(result.focusedIndex).toBe(5)
  expect(result.width).toBe(800)
  expect(result.height).toBe(600)
})

test('handleClickButton returns the same state for state with problems', async () => {
  const mockProblems = [
    { uri: 'file1.ts', message: 'Error 1', line: 1, column: 1, severity: 'error' },
    { uri: 'file2.ts', message: 'Warning 1', line: 2, column: 3, severity: 'warning' },
  ] as any

  const state: ProblemsState = {
    ...createDefaultState(),
    problems: mockProblems,
  }
  const result = await handleClickButton(state, 'actionButton')

  expect(result).toBe(state)
  expect(result.problems).toBe(mockProblems)
  expect(result.problems).toHaveLength(2)
})