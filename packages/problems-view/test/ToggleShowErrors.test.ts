import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleShowErrors } from '../src/parts/ToggleShowErrors/ToggleShowErrors.ts'

test('toggleShowErrors toggles showErrors from true to false', () => {
  const state = createDefaultState()
  expect(state.showErrors).toBe(true)
  const newState = toggleShowErrors(state)
  expect(newState.showErrors).toBe(false)
})

test('toggleShowErrors toggles showErrors from false to true', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    showErrors: false,
  }
  expect(state.showErrors).toBe(false)
  const newState = toggleShowErrors(state)
  expect(newState.showErrors).toBe(true)
})

test('toggleShowErrors does not modify other properties', () => {
  const state = createDefaultState()
  const newState = toggleShowErrors(state)
  expect(newState.showWarnings).toBe(state.showWarnings)
  expect(newState.showInfos).toBe(state.showInfos)
  expect(newState.problems).toBe(state.problems)
  expect(newState.filterValue).toBe(state.filterValue)
})
