import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker';
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const renderActions = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    text('not implemented'),
  ]
}
