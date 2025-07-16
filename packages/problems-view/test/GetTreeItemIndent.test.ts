import { test, expect } from '@jest/globals'
import { getTreeItemIndent } from '../src/parts/GetTreeItemIndent/GetTreeItemIndent.ts'

test('getTreeItemIndent returns correct indent for depth 1', () => {
  expect(getTreeItemIndent(1)).toBe('1rem')
})

test('getTreeItemIndent returns correct indent for depth 0', () => {
  expect(getTreeItemIndent(0)).toBe('0rem')
})

test('getTreeItemIndent returns correct indent for depth 5', () => {
  expect(getTreeItemIndent(5)).toBe('5rem')
})

test('getTreeItemIndent returns correct indent for negative depth', () => {
  expect(getTreeItemIndent(-2)).toBe('-2rem')
})
