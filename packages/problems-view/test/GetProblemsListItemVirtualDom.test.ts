import { test, expect } from '@jest/globals'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import { getProblemVirtualDom } from '../src/parts/GetProblemsListItemVirtualDom/GetProblemsListItemVirtualDom.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

const baseProblem: Omit<VisibleProblem, 'listItemType' | 'isCollapsed' | 'isActive' | 'icon' | 'filterValueLength'> = {
  message: 'Syntax error',
  uri: '/path/to/file.ts',
  source: 'TypeScript',
  rowIndex: 10,
  columnIndex: 5,
  relativePath: 'file.ts',
  code: 'TS100',
  type: 'error',
  posInSet: 1,
  setSize: 1,
  level: 1,
  count: 2,
  uriMatchIndex: -1,
  sourceMatchIndex: -1,
  messageMatchIndex: -1,
  isEven: false,
}

test('getProblemVirtualDom returns correct dom for Expanded', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    listItemType: ProblemListItemType.Expanded,
    isCollapsed: false,
    isActive: true,
    icon: 'icon-ts',
    filterValueLength: 0,
    isEven: false,
  }
  const dom = getProblemVirtualDom(problem)
  expect(dom[0]).toMatchObject({
    className: expect.stringContaining('ProblemSelected'),
    ariaExpanded: true,
    role: expect.any(String),
  })
  expect(dom.some((el: any) => el.className && el.className.includes('Chevron'))).toBe(true)
  expect(dom.some((el: any) => el.src === 'icon-ts')).toBe(true)
  expect(dom.some((el: any) => typeof el === 'object' && el.className && el.className.includes('Badge'))).toBe(true)
})

test('getProblemVirtualDom returns correct dom for Collapsed', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    listItemType: ProblemListItemType.Collapsed,
    isCollapsed: true,
    isActive: false,
    icon: 'icon-ts',
    filterValueLength: 0,
    isEven: true,
  }
  const dom = getProblemVirtualDom(problem)
  expect(dom[0]).toMatchObject({
    ariaExpanded: false,
    role: expect.any(String),
  })
  expect(dom.some((el: any) => el.className && el.className.includes('Chevron'))).toBe(true)
  expect(dom.some((el: any) => el.src === 'icon-ts')).toBe(true)
  expect(dom.some((el: any) => typeof el === 'object' && el.className && el.className.includes('Badge'))).toBe(true)
})

test('getProblemVirtualDom returns correct dom for Item without filter highlight', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    listItemType: ProblemListItemType.Item,
    isCollapsed: false,
    isActive: false,
    icon: 'icon-ts',
    filterValueLength: 0,
    isEven: false,
  }
  const dom = getProblemVirtualDom(problem)
  expect(dom[0]).toMatchObject({
    className: expect.stringContaining('Problem'),
    role: expect.any(String),
  })
  expect(dom.some((el: any) => el.className && el.className.includes('ProblemsIcon'))).toBe(true)
  expect(dom.some((el: any) => typeof el === 'object' && el.className && el.className.includes('Label'))).toBe(true)
  expect(dom.some((el: any) => typeof el === 'object' && el.className && el.className.includes('ProblemAt'))).toBe(true)
})

test('getProblemVirtualDom returns correct dom for Item with filter highlight', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    listItemType: ProblemListItemType.Item,
    isCollapsed: false,
    isActive: false,
    icon: 'icon-ts',
    filterValueLength: 6,
    messageMatchIndex: 0,
    message: 'Syntax error',
    isEven: false,
  }
  const dom = getProblemVirtualDom(problem)
  expect(dom.some((el: any) => el.className && el.className.includes('Highlight'))).toBe(true)
  expect(dom.some((el: any) => typeof el === 'object' && el.className && el.className.includes('ProblemAt'))).toBe(true)
})