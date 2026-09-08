import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetProblemsTableRowVirtualDom from '../GetProblemsTableRowVirtualDom/GetProblemsTableRowVirtualDom.ts'

export const getProblemsTableBodyVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      childCount: problems.length,
      className: ClassNames.ProblemsTableBody,
      onClick: DomEventListenerFunctions.HandleClick,
      role: AriaRoles.Group,
      type: VirtualDomElements.Div,
    },
    ...problems.flatMap(GetProblemsTableRowVirtualDom.getProblemsTableRowVirtualDom),
  ]
  return dom
}
