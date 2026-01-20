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

test('toProblems increments relativeIndex and count for multiple diagnostics with same URI', () => {
  const diagnostics = [
    {
      code: 'E1',
      columnIndex: 2,
      listItemType: 0,
      message: 'msg1',
      relativePath: '',
      rowIndex: 1,
      source: 'src',
      type: 'error',
      uri: 'file:///a',
    },
    {
      code: 'E2',
      columnIndex: 3,
      listItemType: 0,
      message: 'msg2',
      relativePath: '',
      rowIndex: 2,
      source: 'src',
      type: 'error',
      uri: 'file:///a',
    },
    {
      code: 'E3',
      columnIndex: 4,
      listItemType: 0,
      message: 'msg3',
      relativePath: '',
      rowIndex: 3,
      source: 'src',
      type: 'error',
      uri: 'file:///a',
    },
  ]
  const problems = toProblems(diagnostics)
  const headerProblem = problems.find((p) => p.level === 1)
  expect(headerProblem).toBeDefined()
  expect(headerProblem?.count).toBe(3)
  expect(headerProblem?.uri).toBe('file:///a')
  const itemProblems = problems.filter((p) => p.level === 2)
  expect(itemProblems.length).toBe(3)
  expect(itemProblems[0].posInSet).toBe(1)
  expect(itemProblems[1].posInSet).toBe(2)
  expect(itemProblems[2].posInSet).toBe(3)
})
