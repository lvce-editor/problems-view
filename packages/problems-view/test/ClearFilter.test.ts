import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import * as ClearFilter from '../src/parts/ClearFilter/ClearFilter.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('clearFilter resets filterValue and sets inputSource to Script', () => {
  const state: ProblemsState = {
    ...CreateDefaultState.createDefaultState(),
    filterValue: 'some filter',
    focusedIndex: 0,
    height: 100,
    uid: 1,
    width: 100,
  }
  const result = ClearFilter.clearFilter(state)
  expect(result.filterValue).toBe('')
  expect(result.inputSource).toBe(InputSource.Script)
  // All other properties should remain unchanged
  expect(result.uid).toBe(state.uid)
  expect(result.height).toBe(state.height)
})
