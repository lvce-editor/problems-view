import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { filterProblems } from '../src/parts/FilterProblems/FilterProblems.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

test('filterProblems returns empty array when no problems match filter', () => {
  const problems: readonly Problem[] = [
    {
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/FILE.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Expanded,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file.ts',
      listItemType: ProblemListItemType.Expanded,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 0,
      count: 1,
      fileName: '',
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
      message: 'Error in file',
      uri: '/path/to/file1.ts',
      listItemType: ProblemListItemType.Item,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 5,
      relativePath: 'file1.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 2,
      level: 0,
      count: 1,
      fileName: '',
    },
    {
      message: 'Warning in file',
      uri: '/path/to/file2.ts',
      listItemType: ProblemListItemType.Item,
      source: 'ESLint',
      rowIndex: 2,
      columnIndex: 10,
      relativePath: 'file2.ts',
      code: 'ESL123',
      type: 'warning',
      posInSet: 2,
      setSize: 2,
      level: 1,
      count: 1,
      fileName: '',
    },
  ]
  const collapsedUris: readonly string[] = []
  const filterValue = 'file'

  const result = filterProblems(problems, collapsedUris, filterValue)

  expect(result).toHaveLength(2)
  expect(result[0].uriMatchIndex).toBeGreaterThanOrEqual(0)
  expect(result[1].uriMatchIndex).toBeGreaterThanOrEqual(0)
})
