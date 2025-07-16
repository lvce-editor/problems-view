import { test, expect } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { handleBlur } from '../src/parts/HandleBlur/HandleBlur.ts'

const createState = (focusedIndex: number): ProblemsState => ({
  uid: 1,
  parentUid: 0,
  problems: [],
  focusedIndex,
  message: '',
  itemHeight: 22,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  filterValue: '',
  viewMode: 0,
  inputSource: 0,
  minLineY: 0,
  maxLineY: 0,
  listItems: [],
  collapsedUris: [],
  smallWidthBreakPoint: 650,
  filteredProblems: [],
})

test('handleBlur sets focusedIndex to -2', () => {
  const state = createState(5)
  const result = handleBlur(state)
  expect(result.focusedIndex).toBe(-2)
  // All other properties should remain unchanged
  expect(result.uid).toBe(state.uid)
  expect(result.height).toBe(state.height)
  expect(result.filterValue).toBe(state.filterValue)
})