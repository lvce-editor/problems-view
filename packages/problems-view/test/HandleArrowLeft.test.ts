import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleArrowLeft from '../src/parts/HandleArrowLeft/HandleArrowLeft.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

const defaultProblem: Problem = {
  message: '',
  uri: '',
  listItemType: ProblemListItemType.Item,
  source: '',
  rowIndex: 0,
  columnIndex: 0,
  relativePath: '',
  code: '',
  type: '',
  posInSet: 0,
  setSize: 0,
  level: 0,
  count: 0,
}

test('handleArrowLeft collapses and focuses on first expandable problem', () => {
  const problems: Problem[] = [
    { ...defaultProblem, uri: 'a', listItemType: ProblemListItemType.Item },
    { ...defaultProblem, uri: 'b', listItemType: ProblemListItemType.Expanded },
    { ...defaultProblem, uri: 'c', listItemType: ProblemListItemType.Item },
  ]
  const state = { ...CreateDefaultState.createDefaultState(), problems, focusedIndex: 2, collapsedUris: [] }
  const newState = HandleArrowLeft.handleArrowLeft(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toContain('b')
})

test('handleArrowLeft does not collapse if no expandable problem before focus', () => {
  const problems: Problem[] = [
    { ...defaultProblem, uri: 'a', listItemType: ProblemListItemType.Item },
    { ...defaultProblem, uri: 'b', listItemType: ProblemListItemType.Item },
  ]
  const state = { ...CreateDefaultState.createDefaultState(), problems, focusedIndex: 1, collapsedUris: [] }
  const newState = HandleArrowLeft.handleArrowLeft(state)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.collapsedUris).toEqual([])
})

test('handleArrowLeft collapses Collapsed type as well', () => {
  const problems: Problem[] = [
    { ...defaultProblem, uri: 'a', listItemType: ProblemListItemType.Item },
    { ...defaultProblem, uri: 'b', listItemType: ProblemListItemType.Collapsed },
    { ...defaultProblem, uri: 'c', listItemType: ProblemListItemType.Item },
  ]
  const state = { ...CreateDefaultState.createDefaultState(), problems, focusedIndex: 2, collapsedUris: [] }
  const newState = HandleArrowLeft.handleArrowLeft(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toContain('b')
})
