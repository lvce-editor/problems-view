import { expect, test } from '@jest/globals'
import type { Diagnostic } from '../src/parts/Diagnostic/Diagnostic.ts'
import { countByType } from '../src/parts/CountByType/CountByType.ts'

test('returns zero for empty diagnostics', () => {
  expect(countByType([], 'error')).toBe(0)
})

test('counts only diagnostics of the requested type, including duplicates', () => {
  const error: Diagnostic = {
    code: '',
    columnIndex: 0,
    listItemType: 0,
    message: 'error',
    rowIndex: 0,
    source: 'typescript',
    type: 'error',
    uri: 'file:///test.ts',
  }
  const diagnostics: readonly Diagnostic[] = Object.freeze([
    error,
    { ...error, message: 'warning', type: 'warning' },
    error,
    { ...error, message: 'info', type: 'other' },
  ])

  expect(countByType(diagnostics, 'error')).toBe(2)
  expect(countByType(diagnostics, 'warning')).toBe(1)
  expect(countByType(diagnostics, 'other')).toBe(1)
  expect(countByType(diagnostics, 'unknown')).toBe(0)
  expect(countByType(diagnostics, 'Error')).toBe(0)
})
