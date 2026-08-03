import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickButton } from '../src/parts/HandleClickButton/HandleClickButton.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test('handleClickButton collapses all problem groups', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    problems: [
      { listItemType: 1, uri: 'file:///one.ts' },
      { listItemType: 0, uri: 'file:///one.ts' },
      { listItemType: 1, uri: 'file:///two.ts' },
      { listItemType: 0, uri: 'file:///two.ts' },
    ] as any,
  }

  const result = await handleClickButton(state, 'collapseAll')

  expect(result.collapsedUris).toEqual(['file:///one.ts', 'file:///two.ts'])
})

test('handleClickButton switches between table and list view modes', async () => {
  const state: ProblemsState = createDefaultState()

  const tableState = await handleClickButton(state, 'viewAsTable')
  const listState = await handleClickButton(tableState, 'viewAsList')

  expect(tableState.viewMode).toBe(ProblemsViewMode.Table)
  expect(listState.viewMode).toBe(ProblemsViewMode.List)
})

test('handleClickButton opens the problems filter menu at the click coordinates', async () => {
  const state: ProblemsState = { ...createDefaultState(), uid: 42 }
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  const result = await handleClickButton(state, 'more filters', 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations[0]).toEqual(['ContextMenu.show2', 42, MenuEntryId.ProblemsFilter, 100, 200, { menuId: MenuEntryId.ProblemsFilter }])
})

test('handleClickButton returns the same state for any button name', async () => {
  const state: ProblemsState = createDefaultState()
  const result = await handleClickButton(state, 'testButton')

  expect(result).toBe(state)
})

test('handleClickButton returns the same state for empty button name', async () => {
  const state: ProblemsState = createDefaultState()
  const result = await handleClickButton(state, '')

  expect(result).toBe(state)
})

test('handleClickButton returns the same state for special characters in button name', async () => {
  const state: ProblemsState = createDefaultState()
  const result = await handleClickButton(state, 'button-with-special-chars!@#$%')

  expect(result).toBe(state)
})

test('handleClickButton returns the same state for different state configurations', async () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test filter',
    focusedIndex: 5,
    height: 600,
    width: 800,
  }
  const result = await handleClickButton(state, 'someButton')

  expect(result).toBe(state)
  expect(result.filterValue).toBe('test filter')
  expect(result.focusedIndex).toBe(5)
  expect(result.width).toBe(800)
  expect(result.height).toBe(600)
})

test('handleClickButton returns the same state for state with problems', async () => {
  const mockProblems = [
    { column: 1, line: 1, message: 'Error 1', severity: 'error', uri: 'file1.ts' },
    { column: 3, line: 2, message: 'Warning 1', severity: 'warning', uri: 'file2.ts' },
  ] as any

  const state: ProblemsState = {
    ...createDefaultState(),
    problems: mockProblems,
  }
  const result = await handleClickButton(state, 'actionButton')

  expect(result).toBe(state)
  expect(result.problems).toBe(mockProblems)
  expect(result.problems).toHaveLength(2)
})
