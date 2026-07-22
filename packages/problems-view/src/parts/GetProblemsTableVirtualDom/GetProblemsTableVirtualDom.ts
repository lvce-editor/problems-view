import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsTableBodyVirtualDom from '../GetProblemsTableBodyVirtualDom/GetProblemsTableBodyVirtualDom.ts'
import * as GetProblemsTableHeaderVirtualDom from '../GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'

const tableNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.ProblemsTable,
  type: VirtualDomElements.Div,
}

export const getProblemsTableVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    tableNode,
    ...GetProblemsTableHeaderVirtualDom.getProblemsTableHeaderVirtualDom(),
    ...GetProblemsTableBodyVirtualDom.getProblemsTableBodyVirtualDom(problems),
  ]
  return dom
}
