import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getFilterBadgeDom } from '../src/parts/GetFilterBadgeDom/GetFilterBadgeDom.ts'

test('getFilterBadgeDom returns empty array when badgeText is undefined', () => {
  const result = getFilterBadgeDom(undefined)

  expect(result).toHaveLength(0)
  expect(result).toEqual([])
})

test('getFilterBadgeDom returns empty array when badgeText is empty string', () => {
  const result = getFilterBadgeDom('')

  expect(result).toHaveLength(0)
  expect(result).toEqual([])
})

test('getFilterBadgeDom returns correct virtual DOM structure with badge text', () => {
  const result = getFilterBadgeDom('5')

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'FilterBadge',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '5',
    type: 12,
  })
})

test('getFilterBadgeDom with text containing multiple characters', () => {
  const result = getFilterBadgeDom('10 errors')

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'FilterBadge',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '10 errors',
    type: 12,
  })
})

test('getFilterBadgeDom with special characters in badge text', () => {
  const result = getFilterBadgeDom('⚠ 3 warnings')

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'FilterBadge',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '⚠ 3 warnings',
    type: 12,
  })
})
