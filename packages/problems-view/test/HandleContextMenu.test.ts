import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu returns the same state', async () => {
  const state = createDefaultState()
  const eventX = 100
  const eventY = 200
  const result = await handleContextMenu(state, eventX, eventY)
  expect(result).toBe(state)
})