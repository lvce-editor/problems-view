import { test, expect } from '@jest/globals'
import { toProblems } from '../src/parts/ToProblems/ToProblems.ts'

test('toProblems returns correct problems for single diagnostic', () => {
  const diagnostics = [
    {
      message: 'msg',
      uri: 'file:///a',
      listItemType: 0,
      source: 'src',
      rowIndex: 1,
      columnIndex: 2,
      relativePath: '',
      code: 'E1',
      type: 'error',
    },
  ]
  const problems = toProblems(diagnostics)
  expect(problems.length).toBeGreaterThan(0)
  expect(problems[0].uri).toBe('file:///a')
})