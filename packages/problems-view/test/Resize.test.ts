import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { resize } from '../src/parts/Resize/Resize.ts'

test('resize updates width and height', () => {
  const state: ProblemsState = createDefaultState()
  const newState: ProblemsState = resize(state, { height: 600, width: 800 })
  expect(newState.width).toBe(800)
  expect(newState.height).toBe(600)
})

test('resize preserves other state properties', () => {
  const state: ProblemsState = { ...createDefaultState(), message: 'hello' }
  const newState: ProblemsState = resize(state, { width: 100 })
  expect(newState.message).toBe('hello')
  expect(newState.width).toBe(100)
})

test('resize can update multiple properties', () => {
  const state: ProblemsState = createDefaultState()
  const newState: ProblemsState = resize(state, { height: 456, width: 123, x: 10, y: 20 })
  expect(newState).toMatchObject({ height: 456, width: 123, x: 10, y: 20 })
})

test('registered resize command updates the stored dimensions used by table columns', async () => {
  const { commandMap } = await import('../src/parts/CommandMap/CommandMap.ts')
  const { get } = await import('../src/parts/ProblemsStates/ProblemsStates.ts')
  commandMap['Problems.create'](887, '', 0, 0, 800, 300, '')
  await commandMap['Problems.resize'](887, { width: 1000 })
  expect(get(887).newState.width).toBe(1000)
  expect(get(887).newState.columnWidths).toEqual([0.13, 0.52, 0.27, 0.08])
})
