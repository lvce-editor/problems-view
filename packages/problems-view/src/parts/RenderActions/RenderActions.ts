import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'
import * as ViewletProblemsActions from '../GetProblemActions/GetProblemActions.ts'
import { get } from '../ProblemsStates/ProblemsStates.ts'

export const renderActions = (uid: number): readonly VirtualDomNode[] => {
  const { newState } = get(uid)
  const actions = ViewletProblemsActions.getActions(newState)
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
