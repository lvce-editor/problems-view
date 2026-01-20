import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds returns array with ProblemsFilter', () => {
  const result: readonly number[] = getMenuIds()

  expect(result).toEqual([MenuEntryId.ProblemsFilter])
})

test('getMenuIds returns non-empty array', () => {
  const result: readonly number[] = getMenuIds()

  expect(result.length).toBeGreaterThan(0)
})

test('getMenuIds returns readonly array', () => {
  const result: readonly number[] = getMenuIds()

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(1)
  expect(result[0]).toBe(MenuEntryId.ProblemsFilter)
})
