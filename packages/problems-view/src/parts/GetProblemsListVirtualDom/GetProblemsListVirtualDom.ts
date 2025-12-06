import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsListItemVirtualDom from '../GetProblemsListItemVirtualDom/GetProblemsListItemVirtualDom.ts'

export const getProblemsListVirtualDom = (problems: readonly VisibleProblem[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      ariaLabel: 'Problems Tree', // TODO use i18n string
      childCount: problems.length,
      className: ClassNames.ProblemsList,
      role: AriaRoles.Tree,
      type: VirtualDomElements.Div,
    },
    ...problems.flatMap(GetProblemsListItemVirtualDom.getProblemVirtualDom),
  ]
  return dom
}
