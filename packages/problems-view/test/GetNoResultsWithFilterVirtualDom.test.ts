import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getNoResultsWithFilterVirtualDom } from '../src/parts/GetNoResultsWithFilterVirtualDom/GetNoResultsWithFilterVirtualDom.ts'
import * as ProblemStrings from '../src/parts/ProblemStrings/ProblemStrings.ts'

test('getNoResultsWithFilterVirtualDom returns correct virtual dom structure', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result).toHaveLength(6)
})

test('getNoResultsWithFilterVirtualDom first element is message div', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.Message,
    type: VirtualDomElements.Div,
  })
})

test('getNoResultsWithFilterVirtualDom second element is span', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Span,
  })
})

test('getNoResultsWithFilterVirtualDom third element is no results text', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[2]).toEqual({
    childCount: 0,
    text: ProblemStrings.noResultsFoundWithProvidedFilterCriteria(),
    type: 12,
  })
})

test('getNoResultsWithFilterVirtualDom fourth element is clear filter link', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[3]).toEqual({
    childCount: 1,
    className: ClassNames.MessageAction,
    onClick: DomEventListenerFunctions.HandleClearFilterClick,
    type: VirtualDomElements.A,
  })
})

test('getNoResultsWithFilterVirtualDom fifth element is clear filter text', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[4]).toEqual({
    childCount: 0,
    text: ProblemStrings.clearFilter(),
    type: 12,
  })
})

test('getNoResultsWithFilterVirtualDom sixth element is period text', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[5]).toEqual({
    childCount: 0,
    text: '.',
    type: 12,
  })
})

test('getNoResultsWithFilterVirtualDom returns consistent structure on multiple calls', () => {
  const result1 = getNoResultsWithFilterVirtualDom()
  const result2 = getNoResultsWithFilterVirtualDom()

  expect(result1).toEqual(result2)
})