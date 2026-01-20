import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { show2 } from '../src/parts/ContextMenu/ContextMenu.ts'

test('show2 calls showContextMenu2 with correct parameters', async () => {
  const uid = 42
  const menuId = MenuEntryId.ProblemsFilter
  const x = 100
  const y = 200
  const args = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  // @ts-ignore
  // @ts-ignore
  await show2(uid, menuId, x, y, args)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', uid, menuId, x, y, args]])
})

test('show2 works with different coordinates', async () => {
  const uid = 123
  const menuId = MenuEntryId.ProblemsFilter
  const x = 0
  const y = 0
  const args = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  // @ts-ignore
  await show2(uid, menuId, x, y, args)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', uid, menuId, x, y, args]])
})

test('show2 works with different uid values', async () => {
  const uid = 999
  const menuId = MenuEntryId.ProblemsFilter
  const x = 300
  const y = 400
  const args = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  // @ts-ignore
  await show2(uid, menuId, x, y, args)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', uid, menuId, x, y, args]])
})

test('show2 passes through all parameters correctly', async () => {
  const uid = 5
  const menuId = MenuEntryId.ProblemsFilter
  const x = 150
  const y = 250
  const args = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  // @ts-ignore
  await show2(uid, menuId, x, y, args)

  const invocation = mockRpc.invocations[0]
  expect(invocation[0]).toBe('ContextMenu.show2')
  expect(invocation[1]).toBe(uid)
  expect(invocation[2]).toBe(menuId)
  expect(invocation[3]).toBe(x)
  expect(invocation[4]).toBe(y)
  expect(invocation[5]).toBe(args)
  expect(invocation[5].menuId).toBe(MenuEntryId.ProblemsFilter)
})
