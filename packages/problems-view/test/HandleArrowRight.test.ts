import { test, expect } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleArrowRight } from '../src/parts/HandleArrowRight/HandleArrowRight.ts'
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

test('handleArrowRight expands and focuses on the same problem', () => {
  const problems: Problem[] = [
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'a' },
    { ...defaultProblem, listItemType: ProblemListItemType.Collapsed, uri: 'b' },
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'c' },
  ]
  const state: ProblemsState = { ...createDefaultState(), collapsedUris: ['b'], focusedIndex: 1, problems }
  const newState: ProblemsState = handleArrowRight(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).not.toContain('b')
})

test('handleArrowRight does not change focus if problem is not collapsed', () => {
  const problems: Problem[] = [
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'a' },
    { ...defaultProblem, listItemType: ProblemListItemType.Expanded, uri: 'b' },
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'c' },
  ]
  const state: ProblemsState = { ...createDefaultState(), collapsedUris: [], focusedIndex: 1, problems }
  const newState: ProblemsState = handleArrowRight(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toEqual([])
})

test('handleArrowRight removes uri from collapsedUris if present', () => {
  const problems: Problem[] = [
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'a' },
    { ...defaultProblem, listItemType: ProblemListItemType.Collapsed, uri: 'b' },
    { ...defaultProblem, listItemType: ProblemListItemType.Item, uri: 'c' },
  ]
  const state: ProblemsState = { ...createDefaultState(), collapsedUris: ['a', 'b', 'c'], focusedIndex: 1, problems }
  const newState: ProblemsState = handleArrowRight(state)
  expect(newState.focusedIndex).toBe(1)
  expect(newState.collapsedUris).toEqual(['a', 'c'])
})
