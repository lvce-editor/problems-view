import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickMoreFilters } from '../src/parts/HandleClickMoreFilters/HandleClickMoreFilters.ts'

test('handleClickMoreFilters calls showContextMenu2 with correct parameters', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    uid: 42,
  }
  const eventX = 100
  const eventY = 200

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  await handleClickMoreFilters(state, eventX, eventY)

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ProblemsFilter,
      eventX,
      eventY,
      {
        menuId: MenuEntryId.ProblemsFilter,
      },
    ],
  ])
})

test('handleClickMoreFilters returns the same state', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    uid: 1,
  }
  const eventX = 50
  const eventY = 75

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  const result = await handleClickMoreFilters(state, eventX, eventY)

  expect(result).toBe(state)
  expect(mockRpc.invocations.length).toBe(1)
})

test('handleClickMoreFilters works with different coordinates', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    uid: 123,
  }
  const eventX = 0
  const eventY = 0

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  await handleClickMoreFilters(state, eventX, eventY)

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ProblemsFilter,
      eventX,
      eventY,
      {
        menuId: MenuEntryId.ProblemsFilter,
      },
    ],
  ])
})

test('handleClickMoreFilters uses correct menuId', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    uid: 99,
  }
  const eventX = 300
  const eventY = 400

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  await handleClickMoreFilters(state, eventX, eventY)

  const invocation = mockRpc.invocations[0]
  expect(invocation[2]).toBe(MenuEntryId.ProblemsFilter)
  expect(invocation[5].menuId).toBe(MenuEntryId.ProblemsFilter)
})

test('handleClickMoreFilters works with different state configurations', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test filter',
    focusedIndex: 3,
    height: 600,
    uid: 5,
    width: 800,
  }
  const eventX = 150
  const eventY = 250

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  const result = await handleClickMoreFilters(state, eventX, eventY)

  expect(result).toBe(state)
  expect(result.filterValue).toBe('test filter')
  expect(result.focusedIndex).toBe(3)
  expect(mockRpc.invocations.length).toBe(1)
})
