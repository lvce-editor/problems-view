import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import type { SavedState } from '../src/parts/SavedState/SavedState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should extract viewMode, filterValue, and collapsedUris from ProblemsState', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
    filterValue: 'test filter',
    viewMode: ProblemsViewMode.List,
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
    filterValue: 'test filter',
    viewMode: ProblemsViewMode.List,
  })
})

test('saveState should handle empty state values', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    collapsedUris: [],
    filterValue: '',
    viewMode: ProblemsViewMode.None,
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    collapsedUris: [],
    filterValue: '',
    viewMode: ProblemsViewMode.None,
  })
})

test('saveState should preserve all other state properties but only return the required ones', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    filteredProblems: [{ id: '2', message: 'filtered' } as any],
    filterValue: 'complex filter',
    focusedIndex: 5,
    height: 400,
    inputSource: InputSource.Script,
    itemHeight: 30,
    listItems: [{ id: '1' } as any],
    maxLineY: 20,
    message: 'some message',
    minLineY: 10,
    problems: [{ id: '1', message: 'test' } as any],
    smallWidthBreakPoint: 800,
    uid: 999,
    viewMode: ProblemsViewMode.Table,
    width: 300,
    x: 100,
    y: 200,
  }

  const result: SavedState = saveState(state)

  // Should only contain the three required properties
  expect(Object.keys(result)).toHaveLength(3)
  expect(result).toEqual({
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    filterValue: 'complex filter',
    viewMode: ProblemsViewMode.Table,
  })

  // Original state should remain unchanged
  expect(state.uid).toBe(999)
  expect(state.problems).toHaveLength(1)
  expect(state.focusedIndex).toBe(5)
})
