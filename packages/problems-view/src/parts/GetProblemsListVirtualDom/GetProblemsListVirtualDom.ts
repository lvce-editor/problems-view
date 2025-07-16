import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsListItemVirtualDom from '../GetProblemsListItemVirtualDom/GetProblemsListItemVirtualDom.ts'

export const getProblemsListVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsList,
      childCount: problems.length,
      role: AriaRoles.Tree,
      ariaLabel: 'Problems Tree', // TODO use i18n string
    },
    ...problems.flatMap(GetProblemsListItemVirtualDom.getProblemVirtualDom),
  ]
  return dom
}
