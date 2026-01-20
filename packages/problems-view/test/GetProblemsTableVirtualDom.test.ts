import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsTableBodyVirtualDom } from '../src/parts/GetProblemsTableBodyVirtualDom/GetProblemsTableBodyVirtualDom.ts'
import { getProblemsTableHeaderVirtualDom } from '../src/parts/GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'
import { getProblemsTableVirtualDom } from '../src/parts/GetProblemsTableVirtualDom/GetProblemsTableVirtualDom.ts'

test('getProblemsTableVirtualDom returns correct dom structure with empty problems', () => {
  const problems: readonly VisibleProblem[] = []
  const dom = getProblemsTableVirtualDom(problems)

  expect(dom[0]).toEqual({
    childCount: 2,
    className: ClassNames.ProblemsTable,
    type: VirtualDomElements.Div,
  })

  const headerDom = getProblemsTableHeaderVirtualDom()
  const bodyDom = getProblemsTableBodyVirtualDom(problems)

  expect(dom.length).toBe(1 + headerDom.length + bodyDom.length)
  expect(dom.slice(1, 1 + headerDom.length)).toEqual(headerDom)
  expect(dom.slice(1 + headerDom.length)).toEqual(bodyDom)
})

test('getProblemsTableVirtualDom returns correct dom structure with problems', () => {
  const problems: readonly VisibleProblem[] = [
    {
      code: 'TS1234',
      columnIndex: 1,
      count: 1,
      fileName: '',
      filterValueLength: 0,
      icon: 'error',
      isActive: false,
      isCollapsed: false,
      isEven: true,
      level: 1,
      listItemType: 1,
      message: 'Test error message',
      messageMatchIndex: -1,
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      sourceMatchIndex: -1,
      type: 'error',
      uri: '/test/file.ts',
      uriMatchIndex: -1,
    },
  ]
  const dom = getProblemsTableVirtualDom(problems)

  expect(dom[0]).toEqual({
    childCount: 2,
    className: ClassNames.ProblemsTable,
    type: VirtualDomElements.Div,
  })

  const headerDom = getProblemsTableHeaderVirtualDom()
  const bodyDom = getProblemsTableBodyVirtualDom(problems)

  expect(dom.length).toBe(1 + headerDom.length + bodyDom.length)
  expect(dom.slice(1, 1 + headerDom.length)).toEqual(headerDom)
  expect(dom.slice(1 + headerDom.length)).toEqual(bodyDom)
})

test('getProblemsTableVirtualDom returns correct dom structure with multiple problems', () => {
  const problems: readonly VisibleProblem[] = [
    {
      code: 'TS1234',
      columnIndex: 1,
      count: 1,
      fileName: '',
      filterValueLength: 0,
      icon: 'error',
      isActive: false,
      isCollapsed: false,
      isEven: true,
      level: 1,
      listItemType: 1,
      message: 'Test error message',
      messageMatchIndex: -1,
      posInSet: 1,
      relativePath: 'file.ts',
      rowIndex: 1,
      setSize: 1,
      source: 'TypeScript',
      sourceMatchIndex: -1,
      type: 'error',
      uri: '/test/file.ts',
      uriMatchIndex: -1,
    },
    {
      code: 'TS5678',
      columnIndex: 5,
      count: 1,
      fileName: '',
      filterValueLength: 0,
      icon: 'warning',
      isActive: false,
      isCollapsed: false,
      isEven: false,
      level: 1,
      listItemType: 1,
      message: 'Test warning message',
      messageMatchIndex: -1,
      posInSet: 2,
      relativePath: 'other.ts',
      rowIndex: 2,
      setSize: 2,
      source: 'ESLint',
      sourceMatchIndex: -1,
      type: 'warning',
      uri: '/test/other.ts',
      uriMatchIndex: -1,
    },
  ]
  const dom = getProblemsTableVirtualDom(problems)

  expect(dom[0]).toEqual({
    childCount: 2,
    className: ClassNames.ProblemsTable,
    type: VirtualDomElements.Div,
  })

  const headerDom = getProblemsTableHeaderVirtualDom()
  const bodyDom = getProblemsTableBodyVirtualDom(problems)

  expect(dom.length).toBe(1 + headerDom.length + bodyDom.length)
  expect(dom.slice(1, 1 + headerDom.length)).toEqual(headerDom)
  expect(dom.slice(1 + headerDom.length)).toEqual(bodyDom)
})
