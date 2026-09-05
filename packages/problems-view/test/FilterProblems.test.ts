import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { filterProblems } from '../src/parts/FilterProblems/FilterProblems.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'

test('filterProblems returns empty array when no problems match filter', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'nonexistent'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toEqual([])
})

test('filterProblems returns all problems when filter is empty', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = ''

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].uriMatchIndex).toBe(0)
  expect(result[0].sourceMatchIndex).toBe(0)
  expect(result[0].messageMatchIndex).toBe(0)
  expect(result[0].isCollapsed).toBe(false)
})

test('filterProblems matches by uri', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'file.ts'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].uriMatchIndex).toBeGreaterThanOrEqual(0)
  expect(result[0].sourceMatchIndex).toBe(-1)
  expect(result[0].messageMatchIndex).toBe(-1)
})

test('filterProblems matches by source', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'typescript'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].uriMatchIndex).toBe(-1)
  expect(result[0].sourceMatchIndex).toBeGreaterThanOrEqual(0)
  expect(result[0].messageMatchIndex).toBe(-1)
})

test('filterProblems matches by message', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'error'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].uriMatchIndex).toBe(-1)
  expect(result[0].sourceMatchIndex).toBe(-1)
  expect(result[0].messageMatchIndex).toBeGreaterThanOrEqual(0)
})

test('filterProblems matches case insensitive', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/FILE.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'file'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].uriMatchIndex).toBeGreaterThanOrEqual(0)
})

test('filterProblems excludes collapsed items when listItemType is Item', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = ['/path/to/file.ts']
  const filterValue = 'error'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(0)
})

test('filterProblems includes collapsed items when listItemType is not Item', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Expanded,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = ['/path/to/file.ts']
  const filterValue = 'error'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].isCollapsed).toBe(true)
  expect(result[0].listItemType).toBe(ProblemListItemType.Collapsed)
})

test('filterProblems sets correct listItemType for non-collapsed items', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Expanded,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'error'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(1)
  expect(result[0].listItemType).toBe(ProblemListItemType.Expanded)
  expect(result[0].isCollapsed).toBe(false)
})

test('filterProblems handles multiple problems with different matches', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 1,
      fileName: '',
      level: 0,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: 'file1.ts',
      rowIndex: 1,
      setSize: 2,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/file1.ts',
    },
    {
      code: 'ESL123',
      columnIndex: 10,
      count: 1,
      fileName: '',
      level: 1,
      listItemType: ProblemListItemType.Item,
      message: 'Warning in file',
      posInSet: 2,
      relativePath: 'file2.ts',
      rowIndex: 2,
      setSize: 2,
      source: 'ESLint',
      type: ProblemType.Warning,
      uri: '/path/to/file2.ts',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'file'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(2)
  expect(result[0].uriMatchIndex).toBeGreaterThanOrEqual(0)
  expect(result[1].uriMatchIndex).toBeGreaterThanOrEqual(0)
})

test('filterProblems excludes errors and empty file groups when showErrors is false', () => {
  const problems: readonly Problem[] = [
    {
      code: '',
      columnIndex: 0,
      count: 1,
      fileName: 'error.ts',
      level: 1,
      listItemType: ProblemListItemType.Expanded,
      message: '',
      posInSet: 1,
      relativePath: '',
      rowIndex: 0,
      setSize: 1,
      source: '',
      type: ProblemType.None,
      uri: '/path/to/error.ts',
    },
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 0,
      fileName: 'error.ts',
      level: 2,
      listItemType: ProblemListItemType.Item,
      message: 'Error in file',
      posInSet: 1,
      relativePath: '',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Error,
      uri: '/path/to/error.ts',
    },
    {
      code: '',
      columnIndex: 0,
      count: 1,
      fileName: 'warning.ts',
      level: 1,
      listItemType: ProblemListItemType.Expanded,
      message: '',
      posInSet: 1,
      relativePath: '',
      rowIndex: 0,
      setSize: 1,
      source: '',
      type: ProblemType.None,
      uri: '/path/to/warning.ts',
    },
    {
      code: 'TS5678',
      columnIndex: 5,
      count: 0,
      fileName: 'warning.ts',
      level: 2,
      listItemType: ProblemListItemType.Item,
      message: 'Warning in file',
      posInSet: 1,
      relativePath: '',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Warning,
      uri: '/path/to/warning.ts',
    },
  ]

  const result = filterProblems(problems, [], '', false, true, true)

  expect(result).toHaveLength(2)
  expect(result.map((problem) => problem.uri)).toEqual(['/path/to/warning.ts', '/path/to/warning.ts'])
})

test('filterProblems treats non-error and non-warning diagnostics as infos', () => {
  const problems: readonly Problem[] = [
    {
      code: 'TS1234',
      columnIndex: 5,
      count: 0,
      fileName: 'info.ts',
      level: 2,
      listItemType: ProblemListItemType.Item,
      message: 'Info in file',
      posInSet: 1,
      relativePath: '',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      type: ProblemType.Info,
      uri: '/path/to/info.ts',
    },
  ]

  expect(filterProblems(problems, [], '', true, true, false)).toEqual([])
  expect(filterProblems(problems, [], '', true, true, true)).toHaveLength(1)
})
