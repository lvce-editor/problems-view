import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

const tableHeaderNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ProblemsTableHeader,
  type: VirtualDomElements.Div,
}

const tableRowNode: VirtualDomNode = {
  childCount: 5,
  className: ClassNames.ProblemsTableRow,
  type: VirtualDomElements.Div,
}

const emptyRowItemNode: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.ProblemsTableRowItem,
  type: VirtualDomElements.Div,
}

const rowItemNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ProblemsTableRowItem,
  type: VirtualDomElements.Div,
}

export const getProblemsTableHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  const textCode = ProblemStrings.code()
  const textSource = ProblemStrings.source()
  const textMessage = ProblemStrings.message()
  const textFile = ProblemStrings.file()
  const dom = [
    tableHeaderNode,
    tableRowNode,
    emptyRowItemNode,
    rowItemNode,
    text(textCode),
    rowItemNode,
    text(textMessage),
    rowItemNode,
    text(textFile),
    rowItemNode,
    text(textSource),
  ]
  return dom
}
