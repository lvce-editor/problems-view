import { expect, test } from '@jest/globals'
import { getFilterInputName } from '../src/parts/GetFilterInputName/GetFilterInputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('returns a stable name for user input', () => {
  expect(getFilterInputName(InputSource.User, 'error')).toBe('filter')
})

test('includes the encoded filter value for scripted input', () => {
  expect(getFilterInputName(InputSource.Script, 'a/b ☃')).toBe('filter-a%2Fb%20%E2%98%83')
})

test('returns the stable name when scripted input clears the filter', () => {
  expect(getFilterInputName(InputSource.Script, '')).toBe('filter')
})
