import { test, expect } from '@jest/globals'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'
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
      type: ProblemType.None,
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
      type: ProblemType.Error,
      uri: 'file:///workspace/file.ts',
    },
  ])
})

type UriTestCase = Readonly<{ diagnosticUri: string; workspaceUri: string }>

test.each([
  {
    diagnosticUri: '/workspace/packages/running-extensions-view/src/parts/DisableWorkspace/DisableWorkspace.ts',
    workspaceUri: 'file:///workspace',
  },
  {
    diagnosticUri: 'file:///workspace/packages/running-extensions-view/src/parts/DisableWorkspace/DisableWorkspace.ts',
    workspaceUri: '/workspace',
  },
])('toProblems normalizes file URIs when computing relative paths', ({ diagnosticUri, workspaceUri }: UriTestCase) => {
  const diagnostics = [
    {
      code: 'TS2307',
      columnIndex: 42,
      listItemType: 0,
      message: 'Cannot find module',
      relativePath: '',
      rowIndex: 0,
      source: 'TypeScript',
      type: 'error',
      uri: diagnosticUri,
    },
  ]

  const problems = toProblems(diagnostics, workspaceUri)

  expect(problems[0].relativePath).toBe('packages/running-extensions-view/src/parts/DisableWorkspace')
  expect(problems[1].relativePath).toBe('packages/running-extensions-view/src/parts/DisableWorkspace')
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
    type: ProblemType.Error,
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

test('toProblems adds related locations beneath their diagnostic without increasing the problem count', () => {
  const diagnostics = [
    {
      code: 2322,
      columnIndex: 8,
      message: "Type 'number' is not assignable to type 'string'.",
      relatedInformation: [
        {
          columnIndex: 2,
          endColumnIndex: 6,
          endRowIndex: 1,
          message: "The expected type comes from property 'name'.",
          rowIndex: 1,
          uri: 'file:///workspace/types.ts',
        },
      ],
      rowIndex: 4,
      source: 'ts',
      type: 'error',
      uri: 'file:///workspace/main.ts',
    },
  ] as any

  const problems = toProblems(diagnostics, 'file:///workspace')

  expect(problems[0].count).toBe(1)
  expect(problems[2]).toEqual({
    code: '',
    columnIndex: 2,
    count: 0,
    fileName: 'types.ts',
    level: 3,
    listItemType: 0,
    message: "The expected type comes from property 'name'.",
    posInSet: 1,
    relativePath: '',
    rowIndex: 1,
    setSize: 1,
    source: 'types.ts',
    targetUri: 'file:///workspace/types.ts',
    type: ProblemType.Error,
    uri: 'file:///workspace/main.ts',
  })
})

test.each([
  ['error', ProblemType.Error],
  ['warning', ProblemType.Warning],
  ['spelling', ProblemType.Spelling],
  ['info', ProblemType.Info],
  ['other', ProblemType.Other],
  ['unknown', ProblemType.Other],
  ['', ProblemType.Error],
])('toProblems converts %s to a numeric type for diagnostics and related locations', (type, expectedType) => {
  const diagnostic = {
    code: '',
    columnIndex: 0,
    listItemType: 0,
    message: 'problem',
    relatedInformation: [
      {
        columnIndex: 0,
        endColumnIndex: 1,
        endRowIndex: 0,
        message: 'related problem',
        rowIndex: 0,
        uri: 'file:///workspace/related.ts',
      },
    ],
    relativePath: '',
    rowIndex: 0,
    source: 'test',
    type,
    uri: 'file:///workspace/main.ts',
  }

  const problems = toProblems([diagnostic])

  expect(problems.map((problem) => problem.type)).toEqual([ProblemType.None, expectedType, expectedType])
  expect(problems.every((problem) => typeof problem.type === 'number')).toBe(true)
  expect(diagnostic.type).toBe(type)
})
