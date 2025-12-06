import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getChevronDownVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    childCount: 0,
    className: mergeClassNames(ClassNames.Chevron, 'MaskIconChevronDown', extraClassName) + (extraClassName === '' ? ' ' : ''),
    type: VirtualDomElements.Div,
  }
}

export const getChevronRightVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    childCount: 0,
    className: mergeClassNames(ClassNames.Chevron, 'MaskIconChevronRight', extraClassName) + (extraClassName === '' ? ' ' : ''),
    type: VirtualDomElements.Div,
  }
}
