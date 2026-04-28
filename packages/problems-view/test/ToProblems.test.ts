import { test, expect } from '@jest/globals'
import { toProblems } from '../src/parts/ToProblems/ToProblems.ts'

test('toProblems maps a single diagnostic to a header item and a problem item', () => {
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
      uri: 'file:///workspace/file.ts',
    },
  ]
  const problems = toProblems(diagnostics, 'file:///workspace')
  expect(problems).toEqual([
    {
      code: '',
      columnIndex: 0,
      count: 1,
      fileName: 'file.ts',
      level: 1,
      listItemType: 1,
      message: '',
      posInSet: 1,
      relativePath: '',
      rowIndex: 0,
      setSize: 123,
      source: '',
      type: '',
      uri: 'file:///workspace/file.ts',
    },
    {
      code: 'E1',
      columnIndex: 2,
      count: 0,
      fileName: 'file.ts',
      level: 2,
      listItemType: 0,
      message: 'msg',
      posInSet: 1,
      relativePath: '',
      rowIndex: 1,
      setSize: 1,
      source: 'src',
      type: 'error',
      uri: 'file:///workspace/file.ts',
    },
  ])
})

test('toProblems falls back to default item values for missing diagnostic fields', () => {
  const diagnostics = [
    {
      code: undefined,
      columnIndex: undefined,
      listItemType: 0,
      message: undefined,
      relativePath: '',
      rowIndex: undefined,
      source: undefined,
      type: undefined,
      uri: 'file:///workspace/defaults.ts',
    },
  ] as any
  const problems = toProblems(diagnostics, 'file:///workspace')
  expect(problems[1]).toEqual({
    code: '',
    columnIndex: 0,
    count: 0,
    fileName: 'defaults.ts',
    level: 2,
    listItemType: 0,
    message: '',
    posInSet: 1,
    relativePath: '',
    rowIndex: 0,
    setSize: 1,
    source: '',
    type: 'error',
    uri: 'file:///workspace/defaults.ts',
  })
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
