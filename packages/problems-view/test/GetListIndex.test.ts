import { test, expect } from '@jest/globals'
import { getListIndex } from '../src/parts/GetListIndex/GetListIndex.ts'

test('getListIndex - event at top of list', () => {
  expect(getListIndex(0, 0, 0, 0, 0, 20)).toBe(0)
})

test('getListIndex - event at second item', () => {
  expect(getListIndex(0, 21, 0, 0, 0, 20)).toBe(1)
})

test('getListIndex - with positive deltaY', () => {
  expect(getListIndex(0, 10, 0, 0, 10, 20)).toBe(1)
})

test('getListIndex - with negative deltaY', () => {
  expect(getListIndex(0, 30, 0, 0, -10, 20)).toBe(1)
})

test('getListIndex - non-zero list y position', () => {
  expect(getListIndex(0, 30, 0, 10, 0, 10)).toBe(2)
})

test('getListIndex - event in the middle of an item (should floor)', () => {
  expect(getListIndex(0, 29, 0, 0, 0, 20)).toBe(1)
})