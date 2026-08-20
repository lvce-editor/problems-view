import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleFileGroup } from '../src/parts/ToggleFileGroup/ToggleFileGroup.ts'

test('toggleFileGroup collapses an expanded file group', () => {
  const state = createDefaultState()

  const result = toggleFileGroup(state, 'file:///file.ts')

  expect(result.collapsedUris).toEqual(['file:///file.ts'])
})

test('toggleFileGroup expands a collapsed file group', () => {
  const state = {
    ...createDefaultState(),
    collapsedUris: ['file:///file.ts', 'file:///other.ts'],
  }

  const result = toggleFileGroup(state, 'file:///file.ts')

  expect(result.collapsedUris).toEqual(['file:///other.ts'])
})
