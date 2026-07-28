import { expect, test } from '@jest/globals'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleScrollBarCaptureLost } from '../src/parts/HandleScrollBarCaptureLost/HandleScrollBarCaptureLost.ts'
import { handleScrollBarClick } from '../src/parts/HandleScrollBarClick/HandleScrollBarClick.ts'
import { handleScrollBarMove } from '../src/parts/HandleScrollBarMove/HandleScrollBarMove.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

const createScrollState = (): ProblemsState => ({
  ...createDefaultState(),
  finalDeltaY: 1000,
  height: 500,
  itemHeight: 20,
  problems: Array.from({ length: 75 }, (_, index) => ({ message: `problem ${index}`, source: '', uri: `file://${index}` })) as any,
  scrollBarHeight: 100,
  viewMode: ProblemsViewMode.List,
  width: 800,
  y: 10,
})

test('handleScrollBarClick activates the existing thumb', () => {
  const state = createScrollState()

  const newState = handleScrollBarClick(state, state.y + 25)

  expect(newState.scrollBarActive).toBe(true)
  expect(newState.handleOffset).toBe(25)
  expect(newState.deltaY).toBe(0)
})

test('handleScrollBarClick moves to the clicked position', () => {
  const state = createScrollState()

  const newState = handleScrollBarClick(state, state.y + 250)

  expect(newState.scrollBarActive).toBe(true)
  expect(newState.handleOffset).toBe(50)
  expect(newState.deltaY).toBe(500)
})

test('handleScrollBarMove updates the scroll position while active', () => {
  const state = {
    ...createScrollState(),
    handleOffset: 25,
    scrollBarActive: true,
  }

  const newState = handleScrollBarMove(state, state.y + state.handleOffset + 200)

  expect(newState.deltaY).toBe(500)
})

test('handleScrollBarMove ignores movement while inactive', () => {
  const state = createScrollState()

  expect(handleScrollBarMove(state, 200)).toBe(state)
})

test('handleScrollBarCaptureLost deactivates the scrollbar', () => {
  const state = {
    ...createScrollState(),
    scrollBarActive: true,
  }

  expect(handleScrollBarCaptureLost(state).scrollBarActive).toBe(false)
})
