import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff } from '../src/parts/Diff/Diff.ts'
import { RenderFocus } from '../src/parts/DiffType/DiffType.ts'
import { renderFocus } from '../src/parts/RenderFocus/RenderFocus.ts'

test('focuses the selected row when the focused index changes', () => {
  const oldState = createDefaultState()
  const newState = { ...oldState, focusedIndex: 1 }
  expect(diff(oldState, newState)).toContain(RenderFocus)
  expect(renderFocus(oldState, newState)).toEqual([ViewletCommand.FocusSelector, 0, '.ProblemSelected'])
})

test('does not steal focus on blur or background updates', () => {
  const state = { ...createDefaultState(), focusedIndex: 1 }
  expect(diff(state, { ...state, focusedIndex: -2 })).not.toContain(RenderFocus)
  expect(diff(state, { ...state, fileIconCache: {} })).not.toContain(RenderFocus)
})

test('restores row focus after expanding or collapsing the selected group', () => {
  const state = { ...createDefaultState(), focusedIndex: 0 }
  expect(diff(state, { ...state, collapsedUris: ['file:///test.ts'] })).toContain(RenderFocus)
})
