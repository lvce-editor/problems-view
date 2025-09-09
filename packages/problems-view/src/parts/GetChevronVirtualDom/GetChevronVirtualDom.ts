import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getChevronDownVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: mergeClassNames(ClassNames.Chevron, 'MaskIconChevronDown', extraClassName) + (extraClassName === '' ? ' ' : ''),
    childCount: 0,
  }
}

export const getChevronRightVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: mergeClassNames(ClassNames.Chevron, 'MaskIconChevronRight', extraClassName) + (extraClassName === '' ? ' ' : ''),
    childCount: 0,
  }
}
