import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetActionVirtualDom from '../GetActionVirtualDom/GetActionVirtualDom.ts'

export const getActionsVirtualDom = (actions: readonly ViewletAction[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: actions.length,
      className: ClassNames.Actions,
      role: AriaRoles.ToolBar,
      type: VirtualDomElements.Div,
    },
    ...actions.flatMap(GetActionVirtualDom.getActionVirtualDom),
  ]
}
