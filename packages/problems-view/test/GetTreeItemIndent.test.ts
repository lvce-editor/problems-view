import { test, expect } from '@jest/globals'
import * as GetTreeItemIndent from '../src/parts/GetTreeItemIndent/GetTreeItemIndent.ts'

test('getTreeItemIndent returns correct indent for depth 1', () => {
  expect(GetTreeItemIndent.getTreeItemIndent(1)).toBe('1rem')
})

test('getTreeItemIndent returns correct indent for depth 0', () => {
  expect(GetTreeItemIndent.getTreeItemIndent(0)).toBe('0rem')
})

test('getTreeItemIndent returns correct indent for depth 5', () => {
  expect(GetTreeItemIndent.getTreeItemIndent(5)).toBe('5rem')
})

test('getTreeItemIndent returns correct indent for negative depth', () => {
  expect(GetTreeItemIndent.getTreeItemIndent(-2)).toBe('-2rem')
})
