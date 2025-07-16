import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusIndex } from '../src/parts/FocusIndex/FocusIndex.ts'

test('setFocusedIndex', () => {
  const state = createDefaultState()
  expect(focusIndex(state, -1)).toMatchObject({
    focusedIndex: -1,
  })
})
