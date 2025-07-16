import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import { viewAsTable } from '../src/parts/ViewAsTable/ViewAsTable.ts'

test('viewAsTable should set viewMode to Table', () => {
  const state = createDefaultState()
  const result = viewAsTable(state)
  expect(result.viewMode).toBe(ProblemsViewMode.Table)
})
