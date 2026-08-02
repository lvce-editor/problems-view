import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getInputBoxVirtualDom = (name: string, onInput: string | number, placeholder: string): VirtualDomNode => {
  return {
    ariaLabel: placeholder,
    autocapitalize: 'off',
    autocorrect: 'off',
    childCount: 0,
    className: ClassNames.InputBox,
    name,
    onInput,
    placeholder,
    spellcheck: false,
    type: VirtualDomElements.Input,
  }
}
