import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleShowWarnings } from '../src/parts/ToggleShowWarnings/ToggleShowWarnings.ts'

test('toggleShowWarnings toggles showWarnings from true to false', () => {
  const state = createDefaultState()
  expect(state.showWarnings).toBe(true)
  const newState = toggleShowWarnings(state)
  expect(newState.showWarnings).toBe(false)
})

test('toggleShowWarnings toggles showWarnings from false to true', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    showWarnings: false,
  }
  expect(state.showWarnings).toBe(false)
  const newState = toggleShowWarnings(state)
  expect(newState.showWarnings).toBe(true)
})

test('toggleShowWarnings does not modify other properties', () => {
  const state = createDefaultState()
  const newState = toggleShowWarnings(state)
  expect(newState.showErrors).toBe(state.showErrors)
  expect(newState.showInfos).toBe(state.showInfos)
  expect(newState.problems).toBe(state.problems)
  expect(newState.filterValue).toBe(state.filterValue)
})
