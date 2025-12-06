import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsTableHeaderVirtualDom } from '../src/parts/GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'

test('getProblemsTableHeaderVirtualDom returns correct dom structure', () => {
  const dom = getProblemsTableHeaderVirtualDom()
  const expectedArray = [
    {
      childCount: 1,
      className: ClassNames.ProblemsTableHeader,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 5,
      className: ClassNames.ProblemsTableRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Code',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Message',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Source',
      type: VirtualDomElements.Text,
    },
  ]
  expect(dom).toEqual(expectedArray)
})
