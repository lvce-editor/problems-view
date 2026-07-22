import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const filterBadgeNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.FilterBadge,
  type: VirtualDomElements.Div,
}

export const getFilterBadgeDom = (badgeText: string | undefined): readonly VirtualDomNode[] => {
  if (!badgeText) {
    return []
  }
  return [filterBadgeNode, text(badgeText)]
}
