import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'
import type { ProblemsState } from '../src/parts/ProblemsState/ProblemsState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'

test('getMenuEntries2 returns filter menu entries for ProblemsFilter menuId', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
  }
  const props: ContextMenuProps = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const result: readonly MenuEntry[] = getMenuEntries2(state, props)

  expect(result.length).toBe(3)
  expect(result[0].id).toBe('show-errors')
  expect(result[1].id).toBe('show-warnings')
  expect(result[2].id).toBe('show-infos')
})

test('getMenuEntries2 works with different state values', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
    filterValue: 'test',
    uid: 123,
  }
  const props: ContextMenuProps = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const result: readonly MenuEntry[] = getMenuEntries2(state, props)

  expect(result.length).toBe(3)
})

test('getMenuEntries2 returns correct menu entry structure', () => {
  const state: ProblemsState = {
    ...createDefaultState(),
  }
  const props: ContextMenuProps = {
    menuId: MenuEntryId.ProblemsFilter,
  }

  const result: readonly MenuEntry[] = getMenuEntries2(state, props)

  expect(result.length).toBe(3)
  for (const entry of result) {
    expect(entry).toHaveProperty('command')
    expect(entry).toHaveProperty('flags')
    expect(entry).toHaveProperty('id')
    expect(entry).toHaveProperty('label')
    expect(typeof entry.command).toBe('string')
    expect(typeof entry.flags).toBe('number')
    expect(typeof entry.id).toBe('string')
    expect(typeof entry.label).toBe('string')
  }
})
