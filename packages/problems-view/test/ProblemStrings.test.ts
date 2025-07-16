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

test('atLineColumn returns formatted line and column string', () => {
  const result = ProblemStrings.atLineColumn(10, 5)
  expect(result).toBe('[Ln 10, Col 5]')
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