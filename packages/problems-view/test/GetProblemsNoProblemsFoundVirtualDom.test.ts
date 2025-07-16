import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsNoProblemsFoundVirtualDom } from '../src/parts/GetProblemsNoProblemsFoundVirtualDom/GetProblemsNoProblemsFoundVirtualDom.ts'

test('getProblemsNoProblemsFoundVirtualDom with empty filterValue', () => {
  const dom = getProblemsNoProblemsFoundVirtualDom('')
  const expectedArray = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Message,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'No problems have been detected in the workspace.',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedArray)
})

test('getProblemsNoProblemsFoundVirtualDom with non-empty filterValue', () => {
  const dom = getProblemsNoProblemsFoundVirtualDom('foo')
  const expectedArray = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Message,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'No results found with provided filter criteria.',
      childCount: 0,
    },
    {
      type: VirtualDomElements.A,
      className: ClassNames.MessageAction,
      childCount: 1,
      onClick: expect.any(String),
    },
    {
      type: VirtualDomElements.Text,
      text: 'Clear Filters',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Text,
      text: '.',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedArray)
})
