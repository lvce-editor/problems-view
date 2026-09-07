import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

const getOnClick = (command: string | number): number => {
  switch (command) {
    case 'collapseAll':
      return DomEventListenerFunctions.HandleCollapseAll
    case 'more filters':
      return DomEventListenerFunctions.HandleClickMoreFilters
    case 'viewAsList':
      return DomEventListenerFunctions.HandleViewAsList
    case 'viewAsTable':
      return DomEventListenerFunctions.HandleViewAsTable
    default:
      return DomEventListenerFunctions.HandleClickButton
  }
}

export const getActionButtonVirtualDom = (action: Pick<ViewletAction, 'command' | 'icon' | 'id'>): readonly VirtualDomNode[] => {
  const { command, icon, id } = action
  return [
    {
      childCount: 1,
      className: ClassNames.IconButton,
      name: command,
      onClick: getOnClick(command),
      title: id,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(String(icon)),
  ]
}
