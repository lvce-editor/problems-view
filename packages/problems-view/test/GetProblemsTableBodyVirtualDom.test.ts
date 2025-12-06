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
      childCount: 0,
      className: ClassNames.ProblemsTableBody,
      type: VirtualDomElements.Div,
    },
  ]
  expect(dom).toEqual(expectedArray)
})

test('getProblemsTableBodyVirtualDom returns correct dom structure with problems', () => {
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
  const dom = getProblemsTableBodyVirtualDom(problems)

  expect(dom[0]).toEqual({
    childCount: 1,
    className: ClassNames.ProblemsTableBody,
    type: VirtualDomElements.Div,
  })

  expect(dom.length).toBeGreaterThan(1)
})
