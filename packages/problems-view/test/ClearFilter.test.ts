import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { clearFilter } from '../src/parts/ClearFilter/ClearFilter.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('clearFilter resets filterValue and sets inputSource to Script', () => {
  const state: ProblemsState = {
    uid: 1,
    parentUid: 0,
    problems: [],
    focusedIndex: 0,
    message: '',
    itemHeight: 22,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    filterValue: 'some filter',
    viewMode: 0,
    inputSource: InputSource.User,
    minLineY: 0,
    maxLineY: 0,
    listItems: [],
    collapsedUris: [],
    smallWidthBreakPoint: 650,
    filteredProblems: [],
  }
  const result = clearFilter(state)
  expect(result.filterValue).toBe('')
  expect(result.inputSource).toBe(InputSource.Script)
  // All other properties should remain unchanged
  expect(result.uid).toBe(state.uid)
  expect(result.height).toBe(state.height)
})