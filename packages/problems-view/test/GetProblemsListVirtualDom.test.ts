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
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsList,
    childCount: 0,
    role: AriaRoles.Tree,
    ariaLabel: 'Problems Tree',
  })
})

test('getProblemsListVirtualDom with single problem', () => {
  const problem: VisibleProblem = {
    message: 'Test error message',
    uri: 'file:///test.ts',
    listItemType: ProblemListItemType.Expanded,
    source: 'TypeScript',
    rowIndex: 1,
    columnIndex: 5,
    relativePath: 'test.ts',
    code: 'TS1234',
    type: 'error',
    posInSet: 1,
    setSize: 1,
    level: 1,
    count: 1,
    uriMatchIndex: 0,
    sourceMatchIndex: 0,
    messageMatchIndex: 0,
    isCollapsed: false,
    isEven: false,
    isActive: false,
    icon: 'file-icon',
    filterValueLength: 0,
  }

  const problems: readonly VisibleProblem[] = [problem]
  const result = getProblemsListVirtualDom(problems)

  expect(result).toHaveLength(9) // 1 container + 8 problem items
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsList,
    childCount: 1,
    role: AriaRoles.Tree,
    ariaLabel: 'Problems Tree',
  })
})

test('getProblemsListVirtualDom with multiple problems', () => {
  const problem1: VisibleProblem = {
    message: 'First error',
    uri: 'file:///test1.ts',
    listItemType: ProblemListItemType.Expanded,
    source: 'TypeScript',
    rowIndex: 1,
    columnIndex: 5,
    relativePath: 'test1.ts',
    code: 'TS1234',
    type: 'error',
    posInSet: 1,
    setSize: 2,
    level: 1,
    count: 1,
    uriMatchIndex: 0,
    sourceMatchIndex: 0,
    messageMatchIndex: 0,
    isCollapsed: false,
    isEven: false,
    isActive: true,
    icon: 'file-icon',
    filterValueLength: 0,
  }

  const problem2: VisibleProblem = {
    message: 'Second warning',
    uri: 'file:///test2.ts',
    listItemType: ProblemListItemType.Collapsed,
    source: 'ESLint',
    rowIndex: 2,
    columnIndex: 10,
    relativePath: 'test2.ts',
    code: 'ESL123',
    type: 'warning',
    posInSet: 2,
    setSize: 2,
    level: 1,
    count: 1,
    uriMatchIndex: 0,
    sourceMatchIndex: 0,
    messageMatchIndex: 0,
    isCollapsed: true,
    isEven: true,
    isActive: false,
    icon: 'file-icon',
    filterValueLength: 0,
  }

  const problems: readonly VisibleProblem[] = [problem1, problem2]
  const result = getProblemsListVirtualDom(problems)

  expect(result).toHaveLength(17) // 1 container + 8 items for problem1 + 8 items for problem2
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ProblemsList,
    childCount: 2,
    role: AriaRoles.Tree,
    ariaLabel: 'Problems Tree',
  })
})
