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
  message: string,
): readonly VirtualDomNode[] => {
  // TODO avoid mutation
  const dom = []
  dom.push({
    childCount: 1,
    className: mergeClassNames(ClassNames.Viewlet, ClassNames.Problems),
    onBlur: DomEventListenerFunctions.HandleBlur,
    onContextMenu: DomEventListenerFunctions.HandleContextMenu,
    onPointerDown: DomEventListenerFunctions.HandlePointerDown,
    tabIndex: 0,
    type: VirtualDomElements.Div,
  })
  if (isSmall) {
    dom[0].childCount++
    dom.push(
      ...GetProblemsFilterVirtualDom.getProblemsFilterVirtualDom({
        badgeText: '',
        command: DomEventListenerFunctions.HandleFilterInput,
        id: DomId.Filter,
        placeholder: ProblemStrings.filter(),
        type: ActionType.ProblemsFilter,
        value: '',
      }),
    )
  }
  dom.push(...GetProblemsItemsVirtualDom.getProblemsVirtualDom(viewMode, problems, filterValue, message))
  return dom
}
