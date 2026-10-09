import { expect, test } from '@jest/globals'
import { getSavedCollapsedUris } from '../src/parts/GetSavedCollapsedUris/GetSavedCollapsedUris.ts'
import { getSavedFilterValue } from '../src/parts/GetSavedFilterValue/GetSavedFilterValue.ts'
import { getSavedViewMode } from '../src/parts/GetSavedViewMode/GetSavedViewMode.ts'
import * as ProblemsViewMode from '../src/parts/ProblemsViewMode/ProblemsViewMode.ts'

test.each([null, undefined, false, true, 0, 42, '', 'saved state', Symbol('state'), 1n, [], {}])(
  'saved state readers default for invalid or missing state %p',
  (savedState: unknown) => {
    expect(getSavedFilterValue(savedState)).toBe('')
    expect(getSavedViewMode(savedState)).toBe(ProblemsViewMode.List)
    expect(getSavedCollapsedUris(savedState)).toEqual([])
  },
)

test.each([null, undefined, false, 42, [], {}])('filter value defaults for a non-string property %p', (filterValue: unknown) => {
  expect(getSavedFilterValue({ filterValue })).toBe('')
})

test.each([null, undefined, false, '1', [], {}])('view mode defaults for a non-number property %p', (viewMode: unknown) => {
  expect(getSavedViewMode({ viewMode })).toBe(ProblemsViewMode.List)
})

test.each([null, undefined, false, 42, 'file:///test.ts', {}, ['file:///test.ts', 42]])(
  'collapsed uris default for an invalid property %p',
  (collapsedUris: unknown) => {
    expect(getSavedCollapsedUris({ collapsedUris })).toEqual([])
  },
)

test('saved state readers restore valid values and deduplicate collapsed uris', () => {
  const savedState: unknown = {
    collapsedUris: ['file:///a.ts', 'file:///a.ts', 'file:///b.ts'],
    filterValue: 'error',
    viewMode: ProblemsViewMode.Table,
  }
  expect(getSavedFilterValue(savedState)).toBe('error')
  expect(getSavedViewMode(savedState)).toBe(ProblemsViewMode.Table)
  expect(getSavedCollapsedUris(savedState)).toEqual(['file:///a.ts', 'file:///b.ts'])
})

test('saved state readers preserve empty values and zero view mode', () => {
  const savedState: unknown = { collapsedUris: [], filterValue: '', viewMode: 0 }
  expect(getSavedFilterValue(savedState)).toBe('')
  expect(getSavedViewMode(savedState)).toBe(0)
  expect(getSavedCollapsedUris(savedState)).toEqual([])
})
