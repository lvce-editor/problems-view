import { expect, test } from '@jest/globals'
import { getIcon } from '../src/parts/GetIcon/GetIcon.ts'

test('returns the cached icon for a uri', () => {
  expect(getIcon('file:///test.ts', { 'file:///test.ts': '/icons/typescript.svg' })).toBe('/icons/typescript.svg')
})

test('returns an empty icon for an unknown or empty uri', () => {
  expect(getIcon('file:///missing.ts', {})).toBe('')
  expect(getIcon('', { '': '/icons/empty.svg' })).toBe('')
})
