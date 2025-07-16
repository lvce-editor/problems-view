import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleArrowRight } from '../src/parts/HandleArrowRight/HandleArrowRight.ts'
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

test('handleArrowRight expands and focuses on the same problem', () => {
  const problems: Problem[] = [
    { ...defaultProblem, uri: 'a', listItemType: ProblemListItemType.Item },
    { ...defaultProblem, uri: 'b', listItemType: ProblemListItemType.Collapsed },
    { ...defaultProblem, uri: 'c', listItemType: ProblemListItemType.Item },
  ]
  const state = { ...createDefaultState(), problems, focusedIndex: 1, collapsedUris: ['b'] }
  const newState = handleArrowRight(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).not.toContain('b')
})

test('handleArrowRight does not change focus if problem is not collapsed', () => {
  const problems: Problem[] = [
    { ...defaultProblem, uri: 'a', listItemType: ProblemListItemType.Item },
    { ...defaultProblem, uri: 'b', listItemType: ProblemListItemType.Expanded },
    { ...defaultProblem, uri: 'c', listItemType: ProblemListItemType.Item },
  ]
  const state = { ...createDefaultState(), problems, focusedIndex: 1, collapsedUris: [] }
  const newState = handleArrowRight(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toEqual([])
})

test('handleArrowRight removes uri from collapsedUris if present', () => {
  const problems: Problem[] = [
    { ...defaultProblem, uri: 'a', listItemType: ProblemListItemType.Item },
    { ...defaultProblem, uri: 'b', listItemType: ProblemListItemType.Collapsed },
    { ...defaultProblem, uri: 'c', listItemType: ProblemListItemType.Item },
  ]
  const state = { ...createDefaultState(), problems, focusedIndex: 1, collapsedUris: ['a', 'b', 'c'] }
  const newState = handleArrowRight(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toEqual(['a', 'c'])
})