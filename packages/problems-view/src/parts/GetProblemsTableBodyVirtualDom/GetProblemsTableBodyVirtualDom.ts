import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsTableRowVirtualDom from '../GetProblemsTableRowVirtualDom/GetProblemsTableRowVirtualDom.ts'

export const getProblemsTableBodyVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableBody,
      childCount: problems.length,
    },
    ...problems.flatMap(GetProblemsTableRowVirtualDom.getProblemsTableRowVirtualDom),
  ]
  return dom
}
