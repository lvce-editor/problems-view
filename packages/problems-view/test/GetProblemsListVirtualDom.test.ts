import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsListVirtualDom } from '../src/parts/GetProblemsListVirtualDom/GetProblemsListVirtualDom.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

test('getProblemsListVirtualDom with empty problems array', () => {
  const problems: readonly VisibleProblem[] = []
  const result = getProblemsListVirtualDom(problems)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    ariaLabel: 'Problems Tree',
    childCount: 0,
    className: ClassNames.ProblemsList,
    role: AriaRoles.Tree,
    type: VirtualDomElements.Div,
  })
})

test('getProblemsListVirtualDom with single problem', () => {
  const problem: VisibleProblem = {
    code: 'TS1234',
    columnIndex: 5,
    count: 1,
    fileName: '',
    filterValueLength: 0,
    icon: 'file-icon',
    isActive: false,
    isCollapsed: false,
    isEven: false,
    level: 1,
    listItemType: ProblemListItemType.Expanded,
    message: 'Test error message',
    messageMatchIndex: 0,
    posInSet: 1,
    relativePath: 'test.ts',
    rowIndex: 1,
    setSize: 1,
    source: 'TypeScript',
    sourceMatchIndex: 0,
    type: 'error',
    uri: 'file:///test.ts',
    uriMatchIndex: 0,
  }

  const problems: readonly VisibleProblem[] = [problem]
  const result = getProblemsListVirtualDom(problems)

  expect(result).toHaveLength(9) // 1 container + 8 problem items
  expect(result[0]).toEqual({
    ariaLabel: 'Problems Tree',
    childCount: 1,
    className: ClassNames.ProblemsList,
    role: AriaRoles.Tree,
    type: VirtualDomElements.Div,
  })
})

test('getProblemsListVirtualDom with multiple problems', () => {
  const problem1: VisibleProblem = {
    code: 'TS1234',
    columnIndex: 5,
    count: 1,
    fileName: '',
    filterValueLength: 0,
    icon: 'file-icon',
    isActive: true,
    isCollapsed: false,
    isEven: false,
    level: 1,
    listItemType: ProblemListItemType.Expanded,
    message: 'First error',
    messageMatchIndex: 0,
    posInSet: 1,
    relativePath: 'test1.ts',
    rowIndex: 1,
    setSize: 2,
    source: 'TypeScript',
    sourceMatchIndex: 0,
    type: 'error',
    uri: 'file:///test1.ts',
    uriMatchIndex: 0,
  }

  const problem2: VisibleProblem = {
    code: 'ESL123',
    columnIndex: 10,
    count: 1,
    fileName: '',
    filterValueLength: 0,
    icon: 'file-icon',
    isActive: false,
    isCollapsed: true,
    isEven: true,
    level: 1,
    listItemType: ProblemListItemType.Collapsed,
    message: 'Second warning',
    messageMatchIndex: 0,
    posInSet: 2,
    relativePath: 'test2.ts',
    rowIndex: 2,
    setSize: 2,
    source: 'ESLint',
    sourceMatchIndex: 0,
    type: 'warning',
    uri: 'file:///test2.ts',
    uriMatchIndex: 0,
  }

  const problems: readonly VisibleProblem[] = [problem1, problem2]
  const result = getProblemsListVirtualDom(problems)

  expect(result).toHaveLength(17) // 1 container + 8 items for problem1 + 8 items for problem2
  expect(result[0]).toEqual({
    ariaLabel: 'Problems Tree',
    childCount: 2,
    className: ClassNames.ProblemsList,
    role: AriaRoles.Tree,
    type: VirtualDomElements.Div,
  })
})
