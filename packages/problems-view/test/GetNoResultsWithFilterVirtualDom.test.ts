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
    type: VirtualDomElements.Div,
    className: ClassNames.Message,
    childCount: 3,
  })
})

test('getNoResultsWithFilterVirtualDom second element is span', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[1]).toEqual({
    type: VirtualDomElements.Span,
    childCount: 1,
  })
})

test('getNoResultsWithFilterVirtualDom third element is no results text', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[2]).toEqual({
    type: 12,
    text: ProblemStrings.noResultsFoundWithProvidedFilterCriteria(),
    childCount: 0,
  })
})

test('getNoResultsWithFilterVirtualDom fourth element is clear filter link', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[3]).toEqual({
    type: VirtualDomElements.A,
    className: ClassNames.MessageAction,
    childCount: 1,
    onClick: DomEventListenerFunctions.HandleClearFilterClick,
  })
})

test('getNoResultsWithFilterVirtualDom fifth element is clear filter text', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[4]).toEqual({
    type: 12,
    text: ProblemStrings.clearFilter(),
    childCount: 0,
  })
})

test('getNoResultsWithFilterVirtualDom sixth element is period text', () => {
  const result = getNoResultsWithFilterVirtualDom()

  expect(result[5]).toEqual({
    type: 12,
    text: '.',
    childCount: 0,
  })
})

test('getNoResultsWithFilterVirtualDom returns consistent structure on multiple calls', () => {
  const result1 = getNoResultsWithFilterVirtualDom()
  const result2 = getNoResultsWithFilterVirtualDom()

  expect(result1).toEqual(result2)
})