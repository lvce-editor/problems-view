import { test, expect } from '@jest/globals'
import { getFileNameIcon } from '../src/parts/IconTheme/IconTheme.ts'

test('getFileNameIcon returns empty string for any input', () => {
  expect(getFileNameIcon('file.txt')).toBe('')
  expect(getFileNameIcon('anotherfile.js')).toBe('')
  expect(getFileNameIcon('')).toBe('')
  expect(getFileNameIcon(undefined)).toBe('')
  expect(getFileNameIcon(null)).toBe('')
})