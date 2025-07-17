import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual returns true when problems arrays are the same reference', () => {
  const problems = [
    {
      message: 'test',
      uri: 'test.ts',
      listItemType: 0,
      source: 'test',
      rowIndex: 1,
      columnIndex: 1,
      relativePath: 'test.ts',
      code: 'TEST',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 1,
      count: 1,
    },
  ]
  const oldState: ProblemsState = { ...createDefaultState(), problems }
  const newState: ProblemsState = { ...createDefaultState(), problems }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when problems arrays are different', () => {
  const oldProblems = [
    {
      message: 'old',
      uri: 'old.ts',
      listItemType: 0,
      source: 'old',
      rowIndex: 1,
      columnIndex: 1,
      relativePath: 'old.ts',
      code: 'OLD',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 1,
      count: 1,
    },
  ]
  const newProblems = [
    {
      message: 'new',
      uri: 'new.ts',
      listItemType: 0,
      source: 'new',
      rowIndex: 1,
      columnIndex: 1,
      relativePath: 'new.ts',
      code: 'NEW',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 1,
      count: 1,
    },
  ]
  const oldState: ProblemsState = { ...createDefaultState(), problems: oldProblems }
  const newState: ProblemsState = { ...createDefaultState(), problems: newProblems }
  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns true when both states have the same empty problems array reference', () => {
  const emptyProblems: readonly Problem[] = []
  const oldState: ProblemsState = { ...createDefaultState(), problems: emptyProblems }
  const newState: ProblemsState = { ...createDefaultState(), problems: emptyProblems }
  expect(isEqual(oldState, newState)).toBe(true)
})
