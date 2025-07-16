import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsNoProblemsFoundVirtualDom } from '../src/parts/GetProblemsNoProblemsFoundVirtualDom/GetProblemsNoProblemsFoundVirtualDom.ts'

test('getProblemsNoProblemsFoundVirtualDom with empty filterValue', () => {
  const dom = getProblemsNoProblemsFoundVirtualDom('')
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Message,
    childCount: 1,
  })
  expect(dom[1]).toMatchObject({ text: 'No problems have been detected in the workspace.' })
})

test('getProblemsNoProblemsFoundVirtualDom with non-empty filterValue', () => {
  const dom = getProblemsNoProblemsFoundVirtualDom('foo')
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Message,
    childCount: 3,
  })
  expect(dom[1]).toEqual({
    type: VirtualDomElements.Span,
    childCount: 1,
  })
  expect(dom[2]).toMatchObject({ text: 'No results found with provided filter criteria.' })
  expect(dom[3]).toEqual({
    type: VirtualDomElements.A,
    className: ClassNames.MessageAction,
    childCount: 1,
    onClick: expect.any(String),
  })
  expect(dom[4]).toMatchObject({ text: 'Clear Filters' })
  expect(dom[5]).toMatchObject({ text: '.' })
})
