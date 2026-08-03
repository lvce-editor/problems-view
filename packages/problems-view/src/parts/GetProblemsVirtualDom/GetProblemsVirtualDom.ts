import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetFilterInputName from '../GetFilterInputName/GetFilterInputName.ts'
import * as GetProblemsFilterVirtualDom from '../GetProblemsFilterVirtualDom/GetProblemsFilterVirtualDom.ts'
import * as GetProblemsItemsVirtualDom from '../GetProblemsItemsVirtualDom/GetProblemsItemsVirtualDom.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

export const getProblemsVirtualDom = (
  activeUri: string,
  viewMode: number,
  problems: readonly VisibleProblem[],
  filterValue: string,
  inputSource: number,
  isSmall: boolean,
  message: string,
  scrollBarHeight = 0,
  scrollBarActive = false,
  problemCount = problems.length,
): readonly VirtualDomNode[] => {
  const baseDom = {
    childCount: isSmall ? 2 : 1,
    className: mergeClassNames(ClassNames.Viewlet, ClassNames.Problems),
    'data-activeUri': activeUri,
    onBlur: DomEventListenerFunctions.HandleBlur,
    onContextMenu: DomEventListenerFunctions.HandleContextMenu,
    onPointerDown: DomEventListenerFunctions.HandlePointerDown,
    onWheel: DomEventListenerFunctions.HandleWheel,
    tabIndex: TabIndex.Focusable,
    type: VirtualDomElements.Div,
  }

  const filterDom = isSmall
    ? GetProblemsFilterVirtualDom.getProblemsFilterVirtualDom({
        badgeText: '',
        command: DomEventListenerFunctions.HandleFilterInput,
        id: DomId.Filter,
        name: GetFilterInputName.getFilterInputName(inputSource, filterValue),
        placeholder: ProblemStrings.filter(),
        type: ActionType.ProblemsFilter,
        value: filterValue,
      })
    : []

  const itemsDom = GetProblemsItemsVirtualDom.getProblemsVirtualDom(viewMode, problems, filterValue, message, problemCount)
  const scrollBarDom = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarActive)
  const contentClassName =
    viewMode === ProblemsViewMode.Table ? mergeClassNames(ClassNames.ProblemsContent, ClassNames.ProblemsContentTable) : ClassNames.ProblemsContent
  const contentDom = {
    childCount: scrollBarDom.length > 0 ? 2 : 1,
    className: contentClassName,
    type: VirtualDomElements.Div,
  }

  return [baseDom, ...filterDom, contentDom, ...itemsDom, ...scrollBarDom]
}
