import { test, expect } from '@jest/globals'
import { toProblems } from '../src/parts/ToProblems/ToProblems.ts'

test('toProblems returns correct problems for single diagnostic', () => {
  const diagnostics = [
    {
      code: 'E1',
      columnIndex: 2,
      listItemType: 0,
      message: 'msg',
      relativePath: '',
      rowIndex: 1,
      source: 'src',
      type: 'error',
      uri: 'file:///a',
    },
  ]
  const problems = toProblems(diagnostics)
  expect(problems.length).toBeGreaterThan(0)
  expect(problems[0].uri).toBe('file:///a')
})
