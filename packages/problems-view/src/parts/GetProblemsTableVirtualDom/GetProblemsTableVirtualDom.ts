import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsTableBodyVirtualDom from '../GetProblemsTableBodyVirtualDom/GetProblemsTableBodyVirtualDom.ts'
import * as GetProblemsTableHeaderVirtualDom from '../GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'
import { getTableDividersVirtualDom } from '../GetTableDividersVirtualDom/GetTableDividersVirtualDom.ts'

const tableNode: VirtualDomNode = {
  childCount: 6,
  className: ClassNames.ProblemsTable,
  type: VirtualDomElements.Div,
}

export const getProblemsTableVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    tableNode,
    ...GetProblemsTableHeaderVirtualDom.getProblemsTableHeaderVirtualDom(),
    ...GetProblemsTableBodyVirtualDom.getProblemsTableBodyVirtualDom(problems),
    ...getTableDividersVirtualDom(),
  ]
  return dom
}
