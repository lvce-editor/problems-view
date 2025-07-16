import { test, expect } from '@jest/globals'
import { viewAsList } from '../src/parts/ViewAsList/ViewAsList.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('viewAsList should set viewMode to List', () => {
  const state = createDefaultState()
  const result = viewAsList(state)
  expect(result.viewMode).toBe(ProblemsViewMode.List)
})
