import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetActionButtonVirtualDom from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'

export const getProblemsFilterVirtualDom = (action: ViewletAction): readonly VirtualDomNode[] => {
  // TODO avoid mutation
  const dom: VirtualDomNode[] = []
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Filter,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: ClassNames.InputBox,
      spellcheck: false,
      autocapitalize: 'off',
      autocorrect: 'off',
      placeholder: action.placeholder,
      onInput: action.command,
      name: InputName.Filter,
      value: action.value,
    },
  )
  if (action.badgeText) {
    // @ts-ignore
    dom[0].childCount++
    dom.push(
      {
        type: VirtualDomElements.Div,
        className: ClassNames.FilterBadge,
        childCount: 1,
      },
      text(action.badgeText),
    )
  }
  // @ts-ignore
  dom[0].childCount++
  dom.push(
    ...GetActionButtonVirtualDom.getActionButtonVirtualDom({
      id: 'more filters',
      icon: MaskIcon.Filter,
      command: 'more filters',
    }),
  )
  return dom
}
