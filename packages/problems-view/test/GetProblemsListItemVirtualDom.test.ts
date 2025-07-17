import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
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
  fileName: '',
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
  const expectedDom = [
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Problem} ${ClassNames.ProblemSelected}`,
      childCount: 5,
      paddingLeft: '1rem',
      ariaPosInSet: 1,
      ariaSetSize: 1,
      ariaLevel: 1,
      ariaExpanded: true,
      ariaSelected: true,
      role: AriaRoles.TreeItem,
    },
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Chevron} MaskIconChevronDown `,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.FileIcon,
      src: 'icon-ts',
      role: AriaRoles.None,
      childCount: 0,
    },
    {
      type: 12,
      text: '/path/to/file.ts',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.LabelDetail,
      childCount: 1,
    },
    {
      type: 12,
      text: 'file.ts',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: `Badge ${ClassNames.ProblemBadge}`,
      childCount: 1,
    },
    {
      type: 12,
      text: '2',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedDom)
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
  const expectedDom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Problem,
      childCount: 5,
      paddingLeft: '1rem',
      ariaPosInSet: 1,
      ariaSetSize: 1,
      ariaLevel: 1,
      ariaExpanded: false,
      ariaSelected: false,
      role: AriaRoles.TreeItem,
    },
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Chevron} MaskIconChevronRight `,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.FileIcon,
      src: 'icon-ts',
      role: AriaRoles.None,
      childCount: 0,
    },
    {
      type: 12,
      text: '/path/to/file.ts',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.LabelDetail,
      childCount: 1,
    },
    {
      type: 12,
      text: 'file.ts',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: `Badge ${ClassNames.ProblemBadge}`,
      childCount: 1,
    },
    {
      type: 12,
      text: '2',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedDom)
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
  const expectedDom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Problem,
      childCount: 3,
      paddingLeft: '2rem',
      ariaPosInSet: 1,
      ariaSetSize: 1,
      ariaLevel: 1,
      ariaSelected: false,
      role: AriaRoles.TreeItem,
    },
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Label,
      childCount: 1,
    },
    {
      type: 12,
      text: 'Syntax error',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ProblemAt,
      childCount: 2,
    },
    {
      type: 12,
      text: 'TypeScript(TS100) ',
      childCount: 0,
    },
    {
      type: 12,
      text: '[Ln 10, Col 5]',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedDom)
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
  const expectedDom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Problem,
      childCount: 3,
      paddingLeft: '2rem',
      ariaPosInSet: 1,
      ariaSetSize: 1,
      ariaLevel: 1,
      ariaSelected: false,
      role: AriaRoles.TreeItem,
    },
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Label,
      childCount: 3,
    },
    {
      type: 12,
      text: '',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Highlight,
      childCount: 1,
    },
    {
      type: 12,
      text: 'Syntax',
      childCount: 0,
    },
    {
      type: 12,
      text: ' error',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ProblemAt,
      childCount: 2,
    },
    {
      type: 12,
      text: 'TypeScript(TS100) ',
      childCount: 0,
    },
    {
      type: 12,
      text: '[Ln 10, Col 5]',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedDom)
})
