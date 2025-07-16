import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import type { SavedState } from '../src/parts/SavedState/SavedState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should extract viewMode, filterValue, and collapsedUris from ProblemsState', () => {
  const state: ProblemsState = {
    uid: 1,
    parentUid: 0,
    problems: [],
    focusedIndex: -2,
    message: '',
    itemHeight: 22,
    x: 0,
    y: 0,
    width: 100,
    height: 200,
    filterValue: 'test filter',
    viewMode: ProblemsViewMode.List,
    inputSource: InputSource.User,
    minLineY: 0,
    maxLineY: 0,
    listItems: [],
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
    smallWidthBreakPoint: 650,
    filteredProblems: [],
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    viewMode: ProblemsViewMode.List,
    filterValue: 'test filter',
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
  })
})

test('saveState should handle empty state values', () => {
  const state: ProblemsState = {
    uid: 1,
    parentUid: 0,
    problems: [],
    focusedIndex: -2,
    message: '',
    itemHeight: 22,
    x: 0,
    y: 0,
    width: 100,
    height: 200,
    filterValue: '',
    viewMode: ProblemsViewMode.None,
    inputSource: InputSource.User,
    minLineY: 0,
    maxLineY: 0,
    listItems: [],
    collapsedUris: [],
    smallWidthBreakPoint: 650,
    filteredProblems: [],
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    viewMode: ProblemsViewMode.None,
    filterValue: '',
    collapsedUris: [],
  })
})

test('saveState should preserve all other state properties but only return the required ones', () => {
  const state: ProblemsState = {
    uid: 999,
    parentUid: 888,
    problems: [{ id: '1', message: 'test' } as any],
    focusedIndex: 5,
    message: 'some message',
    itemHeight: 30,
    x: 100,
    y: 200,
    width: 300,
    height: 400,
    filterValue: 'complex filter',
    viewMode: ProblemsViewMode.Table,
    inputSource: InputSource.Script,
    minLineY: 10,
    maxLineY: 20,
    listItems: [{ id: '1' } as any],
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    smallWidthBreakPoint: 800,
    filteredProblems: [{ id: '2', message: 'filtered' } as any],
  }

  const result: SavedState = saveState(state)

  // Should only contain the three required properties
  expect(Object.keys(result)).toHaveLength(3)
  expect(result).toEqual({
    viewMode: ProblemsViewMode.Table,
    filterValue: 'complex filter',
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
  })

  // Original state should remain unchanged
  expect(state.uid).toBe(999)
  expect(state.problems).toHaveLength(1)
  expect(state.focusedIndex).toBe(5)
})