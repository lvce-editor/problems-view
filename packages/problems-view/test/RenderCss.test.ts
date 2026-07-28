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

test('renderCss returns the virtual list base CSS when there are no visible problems', () => {
  const state = createDefaultState()
  const result = renderCss(state, state)

  expect(result[0]).toBe('Viewlet.setCss')
  expect(result[1]).toBe(0)
  expect(result[2]).toContain('.ProblemsContent')
  expect(result[2]).toContain('height: 0px;')
})

test('renderCss generates matching rules for unique visible indents', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    maxLineY: 3,
    problems: [
      createProblem(ProblemListItemType.Expanded, 'file:///file.ts'),
      createProblem(ProblemListItemType.Item, 'file:///file.ts'),
      createProblem(ProblemListItemType.Item, 'file:///file.ts'),
    ],
    uid: 12,
  }
  const result = renderCss(oldState, newState)

  expect(result[0]).toBe('Viewlet.setCss')
  expect(result[1]).toBe(12)
  expect(result[2]).toContain(`.Indent-1rem {
  padding-left: 1rem;
}
.Indent-2rem {
  padding-left: 2rem;
}`)
})

test('renderCss positions the thumb and first partially visible item', () => {
  const state = {
    ...createDefaultState(),
    deltaY: 45,
    finalDeltaY: 200,
    height: 100,
    itemHeight: 20,
    scrollBarHeight: 20,
    viewMode: 2,
    width: 800,
  }

  const result = renderCss(createDefaultState(), state)

  expect(result[2]).toContain('translate: 0 18px;')
  expect(result[2]).toContain('margin-top: -5px;')
})
