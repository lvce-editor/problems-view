import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.js'
import * as ViewletProblemsActions from '../GetProblemActions/GetProblemActions.ts'

export const renderActions = (newState: ProblemsState): readonly VirtualDomNode[] => {
  const actions = ViewletProblemsActions.getActions(newState)
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
