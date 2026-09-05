import { expect, test } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { getVisibleProblems } from '../src/parts/GetVisibleProblems/GetVisibleProblems.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import * as ProblemType from '../src/parts/ProblemType/ProblemType.ts'

const createProblem = (listItemType: number, message: string): Problem => ({
  code: 'test',
  columnIndex: 1,
  count: 1,
  fileName: 'file.ts',
  level: listItemType === ProblemListItemType.Item ? 2 : 1,
  listItemType,
  message,
  posInSet: 1,
  rowIndex: 1,
  setSize: 1,
  source: 'test',
  type: ProblemType.Error,
  uri: 'file:///file.ts',
})

test('table mode includes problems from collapsed list groups', () => {
  const problems = [createProblem(ProblemListItemType.Expanded, ''), createProblem(ProblemListItemType.Item, 'problem')]

  const result = getVisibleProblems(problems, {}, ['file:///file.ts'], -1, '', 0, Infinity, ProblemsViewMode.Table)

  expect(result).toHaveLength(1)
  expect(result[0].message).toBe('problem')
})
