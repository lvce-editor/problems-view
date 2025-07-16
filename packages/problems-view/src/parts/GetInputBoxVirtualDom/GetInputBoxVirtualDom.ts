import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as InputName from '../InputName/InputName.ts'

export const getInputBoxVirtualDom = (name: string, onInput: string, placeholder: string): VirtualDomNode => {
  return {
    type: VirtualDomElements.Input,
    className: ClassNames.InputBox,
    autocapitalize: 'off',
    autocorrect: 'off',
    name: InputName.Filter,
    onInput: onInput,
    placeholder: placeholder,
    spellcheck: false,
  }
}
