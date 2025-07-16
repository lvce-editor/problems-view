import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as GetActionButtonVirtualDom from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import * as GetProblemsFilterVirtualDom from '../GetProblemsFilterVirtualDom/GetProblemsFilterVirtualDom.ts'

export const getActionVirtualDom = (action: ViewletAction): readonly VirtualDomNode[] => {
  switch (action.type) {
    case ActionType.Button:
      return GetActionButtonVirtualDom.getActionButtonVirtualDom(action)
    case ActionType.ProblemsFilter:
      return GetProblemsFilterVirtualDom.getProblemsFilterVirtualDom(action)
    default:
      return []
  }
}
