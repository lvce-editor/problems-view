import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableDividersVirtualDom = (): readonly VirtualDomNode[] => {
  return [0, 1, 2, 3].map((index) => ({
    childCount: 0,
    className: mergeClassNames('ProblemsTableDivider', `ProblemsTableDivider${index}`),
    ...(index > 0 && {
      'data-column': String(index),
      onPointerDown: DomEventListenerFunctions.HandleColumnResizeStart,
    }),
    type: VirtualDomElements.Div,
  }))
}
