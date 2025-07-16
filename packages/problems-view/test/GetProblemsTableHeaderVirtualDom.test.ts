import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsTableHeaderVirtualDom } from '../src/parts/GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'

test('getProblemsTableHeaderVirtualDom returns correct dom structure', () => {
  const dom = getProblemsTableHeaderVirtualDom()
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableHeader,
    childCount: 1,
  })
  expect(dom[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableRow,
    childCount: 5,
  })
  expect(dom[2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableRowItem,
    childCount: 0,
  })
  expect(dom[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableRowItem,
    childCount: 1,
  })
  expect(dom[5]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableRowItem,
    childCount: 1,
  })
  expect(dom[7]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableRowItem,
    childCount: 1,
  })
  expect(dom[9]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableRowItem,
    childCount: 1,
  })
  expect(dom[4]).toMatchObject({ text: 'Code' })
  expect(dom[6]).toMatchObject({ text: 'Message' })
  expect(dom[8]).toMatchObject({ text: 'File' })
  expect(dom[10]).toMatchObject({ text: 'Source' })
})