import { test, expect } from '@jest/globals'
import * as ProblemStrings from '../src/parts/ProblemStrings/ProblemStrings.ts'

test('noProblemsDetected returns correct string', () => {
  const result = ProblemStrings.noProblemsDetected()
  expect(result).toBe('No problems have been detected in the workspace.')
})

test('getMessage returns no problems message when count is 0', () => {
  const result = ProblemStrings.getMessage(0)
  expect(result).toBe('No problems have been detected in the workspace.')
})

test('getMessage returns problems detected message when count is greater than 0', () => {
  const result = ProblemStrings.getMessage(5)
  expect(result).toBe('Some problems have been detected in the workspace.')
})

test('getMessage returns problems detected message when count is 1', () => {
  const result = ProblemStrings.getMessage(1)
  expect(result).toBe('Some problems have been detected in the workspace.')
})

test('getMessage returns problems detected message for negative count', () => {
  const result = ProblemStrings.getMessage(-1)
  expect(result).toBe('Some problems have been detected in the workspace.')
})

test('getMessage returns problems detected message for very large count', () => {
  const result = ProblemStrings.getMessage(1_000_000)
  expect(result).toBe('Some problems have been detected in the workspace.')
})

test('atLineColumn returns formatted line and column string', () => {
  const result = ProblemStrings.atLineColumn(10, 5)
  expect(result).toBe('[Ln 10, Col 5]')
})

test('atLineColumn returns formatted string for line 1 and column 1', () => {
  const result = ProblemStrings.atLineColumn(1, 1)
  expect(result).toBe('[Ln 1, Col 1]')
})

test('atLineColumn returns formatted string for line 0 and column 0', () => {
  const result = ProblemStrings.atLineColumn(0, 0)
  expect(result).toBe('[Ln 0, Col 0]')
})

test('atLineColumn returns formatted string for negative line and column', () => {
  const result = ProblemStrings.atLineColumn(-5, -3)
  expect(result).toBe('[Ln -5, Col -3]')
})

test('atLineColumn returns formatted string for very large line and column', () => {
  const result = ProblemStrings.atLineColumn(999_999, 888_888)
  expect(result).toBe('[Ln 999999, Col 888888]')
})

test('copy returns copy string', () => {
  const result = ProblemStrings.copy()
  expect(result).toBe('Copy')
})

test('clearFilter returns clear filters string', () => {
  const result = ProblemStrings.clearFilter()
  expect(result).toBe('Clear Filters')
})

test('code returns code string', () => {
  const result = ProblemStrings.code()
  expect(result).toBe('Code')
})

test('message returns message string', () => {
  const result = ProblemStrings.message()
  expect(result).toBe('Message')
})

test('file returns file string', () => {
  const result = ProblemStrings.file()
  expect(result).toBe('File')
})

test('filter returns filter string', () => {
  const result = ProblemStrings.filter()
  expect(result).toBe('Filter')
})

test('showingOf returns formatted showing count string', () => {
  const result = ProblemStrings.showingOf(5, 10)
  expect(result).toBe('Showing 5 of 10 ')
})

test('showingOf returns formatted string when visible equals total', () => {
  const result = ProblemStrings.showingOf(10, 10)
  expect(result).toBe('Showing 10 of 10 ')
})

test('showingOf returns formatted string when visible is 0', () => {
  const result = ProblemStrings.showingOf(0, 10)
  expect(result).toBe('Showing 0 of 10 ')
})

test('showingOf returns formatted string when total is 0', () => {
  const result = ProblemStrings.showingOf(0, 0)
  expect(result).toBe('Showing 0 of 0 ')
})

test('showingOf returns formatted string when visible is 1', () => {
  const result = ProblemStrings.showingOf(1, 5)
  expect(result).toBe('Showing 1 of 5 ')
})

test('showingOf returns formatted string when visible is greater than total', () => {
  const result = ProblemStrings.showingOf(15, 10)
  expect(result).toBe('Showing 15 of 10 ')
})

test('showingOf returns formatted string for negative values', () => {
  const result = ProblemStrings.showingOf(-5, -10)
  expect(result).toBe('Showing -5 of -10 ')
})

test('source returns source string', () => {
  const result = ProblemStrings.source()
  expect(result).toBe('Source')
})

test('copyMessage returns copy message string', () => {
  const result = ProblemStrings.copyMessage()
  expect(result).toBe('Copy Message')
})

test('noResultsFoundWithProvidedFilterCriteria returns correct string', () => {
  const result = ProblemStrings.noResultsFoundWithProvidedFilterCriteria()
  expect(result).toBe('No results found with provided filter criteria.')
})

test('collapseAll returns collapse all string', () => {
  const result = ProblemStrings.collapseAll()
  expect(result).toBe('Collapse All')
})

test('viewAsList returns view as list string', () => {
  const result = ProblemStrings.viewAsList()
  expect(result).toBe('View as List')
})

test('viewAsTable returns view as table string', () => {
  const result = ProblemStrings.viewAsTable()
  expect(result).toBe('View as Table')
})

test('error returns error string', () => {
  const result = ProblemStrings.error()
  expect(result).toBe('Error')
})

test('showErrors returns show errors string', () => {
  const result = ProblemStrings.showErrors()
  expect(result).toBe('Show Errors')
})

test('showWarnings returns show warnings string', () => {
  const result = ProblemStrings.showWarnings()
  expect(result).toBe('Show Warnings')
})

test('showInfos returns show infos string', () => {
  const result = ProblemStrings.showInfos()
  expect(result).toBe('Show Infos')
})
