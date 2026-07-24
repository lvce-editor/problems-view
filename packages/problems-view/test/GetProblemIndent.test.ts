import { expect, test } from '@jest/globals'
import { getProblemIndent } from '../src/parts/GetProblemIndent/GetProblemIndent.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

test('getProblemIndent returns one rem for expanded groups', () => {
  expect(getProblemIndent(ProblemListItemType.Expanded)).toBe('1rem')
})

test('getProblemIndent returns one rem for collapsed groups', () => {
  expect(getProblemIndent(ProblemListItemType.Collapsed)).toBe('1rem')
})

test('getProblemIndent returns two rem for problem items', () => {
  expect(getProblemIndent(ProblemListItemType.Item)).toBe('2rem')
})
