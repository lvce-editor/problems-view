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
