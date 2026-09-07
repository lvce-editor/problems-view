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
  { expected: true, name: 'separate empty arrays', newUris: [], oldUris: [] },
  { expected: true, name: 'equal uri lists', newUris: ['file:///a.ts', 'file:///b.ts'], oldUris: ['file:///a.ts', 'file:///b.ts'] },
  { expected: false, name: 'an added uri', newUris: ['file:///a.ts', 'file:///b.ts'], oldUris: ['file:///a.ts'] },
  { expected: false, name: 'a removed uri', newUris: ['file:///a.ts'], oldUris: ['file:///a.ts', 'file:///b.ts'] },
  { expected: false, name: 'different uris of the same length', newUris: ['file:///b.ts'], oldUris: ['file:///a.ts'] },
  { expected: false, name: 'reordered uris', newUris: ['file:///b.ts', 'file:///a.ts'], oldUris: ['file:///a.ts', 'file:///b.ts'] },
  { expected: false, name: 'an empty old list', newUris: ['file:///a.ts'], oldUris: [] },
  { expected: false, name: 'an empty new list', newUris: [], oldUris: ['file:///a.ts'] },
] as const)('haveSameCollapsedUris returns $expected for $name', ({ expected, newUris, oldUris }) => {
  const oldState = { ...createDefaultState(), collapsedUris: oldUris }
  const newState = { ...createDefaultState(), collapsedUris: newUris }

  expect(haveSameCollapsedUris(oldState, newState)).toBe(expected)
})

test.each([
  { expected: true, name: 'both lists missing', newUris: undefined, oldUris: undefined },
  { expected: false, name: 'the old list missing', newUris: [], oldUris: undefined },
  { expected: false, name: 'the new list missing', newUris: undefined, oldUris: [] },
] as const)('haveSameCollapsedUris returns $expected for $name', ({ expected, newUris, oldUris }) => {
  // Preserve the defensive handling of states missing collapsedUris at runtime.
  const oldState = { ...createDefaultState(), collapsedUris: oldUris } as unknown as ProblemsState
  const newState = { ...createDefaultState(), collapsedUris: newUris } as unknown as ProblemsState

  expect(haveSameCollapsedUris(oldState, newState)).toBe(expected)
})
