import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsTableHeaderVirtualDom } from '../src/parts/GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'

test('getProblemsTableHeaderVirtualDom returns correct dom structure', () => {
  const dom = getProblemsTableHeaderVirtualDom()
  const expectedArray = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableHeader,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRow,
      childCount: 5,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Code',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Message',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'File',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Source',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedArray)
})
