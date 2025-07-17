import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleFilterInput } from '../src/parts/HandleFilterInput/HandleFilterInput.ts'

test('handleFilterInput sets filterValue', () => {
  const state = createDefaultState()
  const newState = handleFilterInput(state, 'foo')
  expect(newState.filterValue).toBe('foo')
  // Should not mutate original state
  expect(state.filterValue).toBe('')
})
