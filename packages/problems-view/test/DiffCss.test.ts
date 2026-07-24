import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffCss/DiffCss.ts'

test('isEqual returns true when CSS inputs are unchanged', () => {
  const state = createDefaultState()
  expect(isEqual(state, state)).toBe(true)
})

test('isEqual returns false when problems change', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    problems: [
      {
        code: '',
        columnIndex: 1,
        count: 1,
        fileName: 'file.ts',
        level: 1,
        listItemType: 0,
        message: 'message',
        posInSet: 1,
        relativePath: 'file.ts',
        rowIndex: 1,
        setSize: 1,
        source: '',
        type: 'error',
        uri: 'file:///file.ts',
      },
    ],
  }
  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when the filter changes', () => {
  const oldState = createDefaultState()
  const newState = { ...oldState, filterValue: 'error' }
  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when collapsed uris change', () => {
  const oldState = createDefaultState()
  const newState = { ...oldState, collapsedUris: ['file:///file.ts'] }
  expect(isEqual(oldState, newState)).toBe(false)
})
