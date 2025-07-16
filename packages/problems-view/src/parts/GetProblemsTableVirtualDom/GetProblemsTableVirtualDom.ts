import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsTableBodyVirtualDom from '../GetProblemsTableBodyVirtualDom/GetProblemsTableBodyVirtualDom.ts'
import * as GetProblemsTableHeaderVirtualDom from '../GetProblemsTableHeaderVirtualDom/GetProblemsTableHeaderVirtualDom.ts'

export const getProblemsTableVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTable,
      childCount: 2,
    },
    ...GetProblemsTableHeaderVirtualDom.getProblemsTableHeaderVirtualDom(),
    ...GetProblemsTableBodyVirtualDom.getProblemsTableBodyVirtualDom(problems),
  ]
  return dom
}
