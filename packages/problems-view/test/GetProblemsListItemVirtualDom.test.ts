import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../src/parts/VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemVirtualDom } from '../src/parts/GetProblemsListItemVirtualDom/GetProblemsListItemVirtualDom.ts'
import * as ProblemListItemType from '../src/parts/ProblemListItemType/ProblemListItemType.ts'

const baseProblem: Omit<VisibleProblem, 'listItemType' | 'isCollapsed' | 'isActive' | 'icon' | 'filterValueLength'> = {
  code: 'TS100',
  columnIndex: 5,
  count: 2,
  fileName: '',
  isEven: false,
  level: 1,
  message: 'Syntax error',
  messageMatchIndex: -1,
  posInSet: 1,
  relativePath: 'file.ts',
  rowIndex: 10,
  setSize: 1,
  source: 'TypeScript',
  sourceMatchIndex: -1,
  type: 'error',
  uri: '/path/to/file.ts',
  uriMatchIndex: -1,
}

test('getProblemVirtualDom returns correct dom for Expanded', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    filterValueLength: 0,
    icon: 'icon-ts',
    isActive: true,
    isCollapsed: false,
    isEven: false,
    listItemType: ProblemListItemType.Expanded,
  }
  const dom = getProblemVirtualDom(problem)
  const expectedDom = [
    {
      ariaExpanded: true,
      ariaLevel: 1,
      ariaPosInSet: 1,
      ariaSelected: true,
      ariaSetSize: 1,
      childCount: 5,
      className: `${ClassNames.Problem} ${ClassNames.ProblemSelected}`,
      paddingLeft: '1rem',
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.Chevron} MaskIconChevronDown `,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.FileIcon,
      role: AriaRoles.None,
      src: 'icon-ts',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.LabelDetail,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'file.ts',
      type: 12,
    },
    {
      childCount: 1,
      className: `Badge ${ClassNames.ProblemBadge}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '2',
      type: 12,
    },
  ]
  expect(dom).toEqual(expectedDom)
})

test('getProblemVirtualDom returns correct dom for Collapsed', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    filterValueLength: 0,
    icon: 'icon-ts',
    isActive: false,
    isCollapsed: true,
    isEven: true,
    listItemType: ProblemListItemType.Collapsed,
  }
  const dom = getProblemVirtualDom(problem)
  const expectedDom = [
    {
      ariaExpanded: false,
      ariaLevel: 1,
      ariaPosInSet: 1,
      ariaSelected: false,
      ariaSetSize: 1,
      childCount: 5,
      className: ClassNames.Problem,
      paddingLeft: '1rem',
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.Chevron} MaskIconChevronRight `,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.FileIcon,
      role: AriaRoles.None,
      src: 'icon-ts',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.LabelDetail,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'file.ts',
      type: 12,
    },
    {
      childCount: 1,
      className: `Badge ${ClassNames.ProblemBadge}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '2',
      type: 12,
    },
  ]
  expect(dom).toEqual(expectedDom)
})

test('getProblemVirtualDom returns correct dom for Item without filter highlight', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    fileName: 'file.ts',
    filterValueLength: 0,
    icon: 'icon-ts',
    isActive: false,
    isCollapsed: false,
    isEven: false,
    listItemType: ProblemListItemType.Item,
    relativePath: '/path/to',
  }
  const dom = getProblemVirtualDom(problem)
  const expectedDom = [
    {
      ariaLevel: 1,
      ariaPosInSet: 1,
      ariaSelected: false,
      ariaSetSize: 1,
      childCount: 3,
      className: ClassNames.Problem,
      paddingLeft: '2rem',
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.Label,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Syntax error',
      type: 12,
    },
    {
      childCount: 2,
      className: ClassNames.ProblemAt,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'TypeScript(TS100) ',
      type: 12,
    },
    {
      childCount: 0,
      text: '[Ln 10, Col 5]',
      type: 12,
    },
  ]
  expect(dom).toEqual(expectedDom)
})

test('getProblemVirtualDom returns correct dom for Item with filter highlight', () => {
  const problem: VisibleProblem = {
    ...baseProblem,
    filterValueLength: 6,
    icon: 'icon-ts',
    isActive: false,
    isCollapsed: false,
    isEven: false,
    listItemType: ProblemListItemType.Item,
    message: 'Syntax error',
    messageMatchIndex: 0,
  }
  const dom = getProblemVirtualDom(problem)
  const expectedDom = [
    {
      ariaLevel: 1,
      ariaPosInSet: 1,
      ariaSelected: false,
      ariaSetSize: 1,
      childCount: 3,
      className: ClassNames.Problem,
      paddingLeft: '2rem',
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.ProblemsIcon} ${ClassNames.ProblemsErrorIcon}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: ClassNames.Label,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.Highlight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Syntax',
      type: 12,
    },
    {
      childCount: 0,
      text: ' error',
      type: 12,
    },
    {
      childCount: 2,
      className: ClassNames.ProblemAt,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'TypeScript(TS100) ',
      type: 12,
    },
    {
      childCount: 0,
      text: '[Ln 10, Col 5]',
      type: 12,
    },
  ]
  expect(dom).toEqual(expectedDom)
})
