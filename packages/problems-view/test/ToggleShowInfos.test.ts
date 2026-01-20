import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleShowInfos } from '../src/parts/ToggleShowInfos/ToggleShowInfos.ts'

test('toggleShowInfos toggles showInfos from true to false', () => {
  const state = createDefaultState()
  expect(state.showInfos).toBe(true)
  const newState = toggleShowInfos(state)
  expect(newState.showInfos).toBe(false)
})

test('toggleShowInfos toggles showInfos from false to true', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    showInfos: false,
  }
  expect(state.showInfos).toBe(false)
  const newState = toggleShowInfos(state)
  expect(newState.showInfos).toBe(true)
})

test('toggleShowInfos does not modify other properties', () => {
  const state = createDefaultState()
  const newState = toggleShowInfos(state)
  expect(newState.showErrors).toBe(state.showErrors)
  expect(newState.showWarnings).toBe(state.showWarnings)
  expect(newState.problems).toBe(state.problems)
  expect(newState.filterValue).toBe(state.filterValue)
})
