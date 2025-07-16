import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsTableBodyVirtualDom } from '../src/parts/GetProblemsTableBodyVirtualDom/GetProblemsTableBodyVirtualDom.ts'

test('getProblemsTableBodyVirtualDom returns correct dom structure with empty problems', () => {
  const problems: readonly VisibleProblem[] = []
  const dom = getProblemsTableBodyVirtualDom(problems)
  const expectedArray = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableBody,
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedArray)
})

test('getProblemsTableBodyVirtualDom returns correct dom structure with problems', () => {
  const problems: readonly VisibleProblem[] = [
    {
      message: 'Test error message',
      uri: '/test/file.ts',
      listItemType: 1,
      source: 'TypeScript',
      rowIndex: 1,
      columnIndex: 1,
      relativePath: 'file.ts',
      code: 'TS1234',
      type: 'error',
      posInSet: 1,
      setSize: 1,
      level: 1,
      count: 1,
      uriMatchIndex: -1,
      sourceMatchIndex: -1,
      messageMatchIndex: -1,
      isCollapsed: false,
      isEven: true,
      isActive: false,
      icon: 'error',
      filterValueLength: 0,
    },
  ]
  const dom = getProblemsTableBodyVirtualDom(problems)

  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsTableBody,
    childCount: 1,
  })

  expect(dom.length).toBeGreaterThan(1)
})