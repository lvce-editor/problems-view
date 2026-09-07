import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { haveSameCollapsedUris } from '../src/parts/HaveSameCollapsedUris/HaveSameCollapsedUris.ts'

test('haveSameCollapsedUris returns true for the same array reference', () => {
  const collapsedUris = ['file:///a.ts']
  const oldState = { ...createDefaultState(), collapsedUris }
  const newState = { ...createDefaultState(), collapsedUris }

  expect(haveSameCollapsedUris(oldState, newState)).toBe(true)
})

test.each([
  { name: 'separate empty arrays', oldUris: [], newUris: [], expected: true },
  { name: 'equal uri lists', oldUris: ['file:///a.ts', 'file:///b.ts'], newUris: ['file:///a.ts', 'file:///b.ts'], expected: true },
  { name: 'an added uri', oldUris: ['file:///a.ts'], newUris: ['file:///a.ts', 'file:///b.ts'], expected: false },
  { name: 'a removed uri', oldUris: ['file:///a.ts', 'file:///b.ts'], newUris: ['file:///a.ts'], expected: false },
  { name: 'different uris of the same length', oldUris: ['file:///a.ts'], newUris: ['file:///b.ts'], expected: false },
  { name: 'reordered uris', oldUris: ['file:///a.ts', 'file:///b.ts'], newUris: ['file:///b.ts', 'file:///a.ts'], expected: false },
  { name: 'an empty old list', oldUris: [], newUris: ['file:///a.ts'], expected: false },
  { name: 'an empty new list', oldUris: ['file:///a.ts'], newUris: [], expected: false },
])('haveSameCollapsedUris returns $expected for $name', ({ oldUris, newUris, expected }) => {
  const oldState = { ...createDefaultState(), collapsedUris: oldUris }
  const newState = { ...createDefaultState(), collapsedUris: newUris }

  expect(haveSameCollapsedUris(oldState, newState)).toBe(expected)
})

test.each([
  { name: 'both lists missing', oldUris: undefined, newUris: undefined, expected: true },
  { name: 'the old list missing', oldUris: undefined, newUris: [], expected: false },
  { name: 'the new list missing', oldUris: [], newUris: undefined, expected: false },
])('haveSameCollapsedUris returns $expected for $name', ({ oldUris, newUris, expected }) => {
  // Preserve the defensive handling of states missing collapsedUris at runtime.
  const oldState = { ...createDefaultState(), collapsedUris: oldUris } as unknown as ProblemsState
  const newState = { ...createDefaultState(), collapsedUris: newUris } as unknown as ProblemsState

  expect(haveSameCollapsedUris(oldState, newState)).toBe(expected)
})
