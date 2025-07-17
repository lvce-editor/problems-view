import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { set } from '../src/parts/ProblemsStates/ProblemsStates.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('render2 returns ViewletCommands array', () => {
  const state = createDefaultState()
  set(1, state, state)
  const result = render2(1, [])
  expect(Array.isArray(result)).toBe(true)
})
