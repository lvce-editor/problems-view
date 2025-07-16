import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleBlur } from '../src/parts/HandleBlur/HandleBlur.ts'

const createState = (focusedIndex: number): ProblemsState => ({
  ...createDefaultState(),
  focusedIndex,
})

test('handleBlur sets focusedIndex to -2', () => {
  const state = createState(5)
  const result = handleBlur(state)
  expect(result.focusedIndex).toBe(-2)
  // All other properties should remain unchanged
  expect(result.uid).toBe(state.uid)
  expect(result.height).toBe(state.height)
  expect(result.filterValue).toBe(state.filterValue)
})