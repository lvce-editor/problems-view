import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleArrowLeft from '../src/parts/HandleArrowLeft/HandleArrowLeft.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

const defaultProblem: Problem = {
  code: '',
  columnIndex: 0,
  count: 0,
  fileName: '',
  level: 0,
  listItemType: ProblemListItemType.Item,
  message: '',
  posInSet: 0,
  relativePath: '',
  rowIndex: 0,
  setSize: 0,
  source: '',
  type: '',
  uri: '',
}

test('handleArrowLeft collapses and focuses on first expandable problem', () => {
  const problems: Problem[] = [
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'a' },
    { ...defaultProblem, listItemType: ProblemListItemType.Expanded, uri: 'b' },
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'c' },
  ]
  const state: ProblemsState = { ...CreateDefaultState.createDefaultState(), collapsedUris: [], focusedIndex: 2, problems }
  const newState: ProblemsState = HandleArrowLeft.handleArrowLeft(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toContain('b')
})

test('handleArrowLeft does not collapse if no expandable problem before focus', () => {
  const problems: Problem[] = [
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'a' },
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'b' },
  ]
  const state: ProblemsState = { ...CreateDefaultState.createDefaultState(), collapsedUris: [], focusedIndex: 1, problems }
  const newState: ProblemsState = HandleArrowLeft.handleArrowLeft(state)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.collapsedUris).toEqual([])
})

test('handleArrowLeft collapses Collapsed type as well', () => {
  const problems: Problem[] = [
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'a' },
    { ...defaultProblem, listItemType: ProblemListItemType.Collapsed, uri: 'b' },
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'c' },
  ]
  const state: ProblemsState = { ...CreateDefaultState.createDefaultState(), collapsedUris: [], focusedIndex: 2, problems }
  const newState: ProblemsState = HandleArrowLeft.handleArrowLeft(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toContain('b')
})
