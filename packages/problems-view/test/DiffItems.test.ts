import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual returns true when problems arrays are the same reference', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TEST',
      columnIndex: 1,
      count: 1,
      fileName: '',
      level: 1,
      listItemType: 0,
      message: 'test',
      posInSet: 1,
      relativePath: 'test.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'test',
      type: 'error',
      uri: 'test.ts',
    },
  ]
  const oldState: ProblemsState = { ...createDefaultState(), problems }
  const newState: ProblemsState = { ...createDefaultState(), problems }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when problems arrays are different', () => {
  const oldProblems: readonly Problem[] = [
    {
      code: 'OLD',
      columnIndex: 1,
      count: 1,
      fileName: '',
      level: 1,
      listItemType: 0,
      message: 'old',
      posInSet: 1,
      relativePath: 'old.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'old',
      type: 'error',
      uri: 'old.ts',
    },
  ]
  const newProblems: readonly Problem[] = [
    {
      code: 'NEW',
      columnIndex: 1,
      count: 1,
      fileName: '',
      level: 1,
      listItemType: 0,
      message: 'new',
      posInSet: 1,
      relativePath: 'new.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'new',
      type: 'error',
      uri: 'new.ts',
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
