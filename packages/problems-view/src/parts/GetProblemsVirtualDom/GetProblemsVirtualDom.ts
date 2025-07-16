import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetProblemsFilterVirtualDom from '../GetProblemsFilterVirtualDom/GetProblemsFilterVirtualDom.ts'
import * as GetProblemsItemsVirtualDom from '../GetProblemsItemsVirtualDom/GetProblemsItemsVirtualDom.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getProblemsVirtualDom = (
  viewMode: number,
  problems: readonly VisibleProblem[],
  filterValue: string,
  isSmall: boolean,
): readonly VirtualDomNode[] => {
  // TODO avoid mutation
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: mergeClassNames(ClassNames.Viewlet, ClassNames.Problems),
    tabIndex: 0,
    onPointerDown: DomEventListenerFunctions.HandlePointerDown,
    onContextMenu: DomEventListenerFunctions.HandleContextMenu,
    onBlur: DomEventListenerFunctions.HandleBlur,
    childCount: 1,
  })
  if (isSmall) {
    dom[0].childCount++
    dom.push(
      ...GetProblemsFilterVirtualDom.getProblemsFilterVirtualDom({
        type: ActionType.ProblemsFilter,
        id: DomId.Filter,
        command: DomEventListenerFunctions.HandleFilterInput,
        badgeText: '',
        placeholder: ProblemStrings.filter(),
        value: '',
      }),
    )
  }
  dom.push(...GetProblemsItemsVirtualDom.getProblemsVirtualDom(viewMode, problems, filterValue))
  return dom
}
