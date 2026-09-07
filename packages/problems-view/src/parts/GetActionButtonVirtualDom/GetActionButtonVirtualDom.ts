import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getActionButtonVirtualDom = (action: any): readonly VirtualDomNode[] => {
  const { command, icon, id, name } = action
  return [
    {
      childCount: 1,
      className: ClassNames.IconButton,
      name,
      onClick: command,
      title: id,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
