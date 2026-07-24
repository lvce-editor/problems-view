import { expect, test } from '@jest/globals'
import type { Problem } from '../src/parts/Problem/Problem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

const createProblem = (listItemType: number, uri: string): Problem => {
  return {
    code: '',
    columnIndex: 1,
    count: 1,
    fileName: 'file.ts',
    level: 1,
    listItemType,
    message: 'message',
    posInSet: 1,
    relativePath: 'file.ts',
    rowIndex: 1,
    setSize: 1,
    source: '',
    type: 'error',
    uri,
  }
}

test('renderCss returns empty CSS when there are no visible problems', () => {
  const state = createDefaultState()
  expect(renderCss(state, state)).toEqual(['Viewlet.setCss', 0, ''])
})

test('renderCss generates matching rules for unique visible indents', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    problems: [
      createProblem(ProblemListItemType.Expanded, 'file:///file.ts'),
      createProblem(ProblemListItemType.Item, 'file:///file.ts'),
      createProblem(ProblemListItemType.Item, 'file:///file.ts'),
    ],
    uid: 12,
  }
  expect(renderCss(oldState, newState)).toEqual([
    'Viewlet.setCss',
    12,
    `.Indent-1rem {
  padding-left: 1rem;
}
.Indent-2rem {
  padding-left: 2rem;
}`,
  ])
})
