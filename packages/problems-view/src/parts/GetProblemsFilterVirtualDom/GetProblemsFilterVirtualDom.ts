import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetActionButtonVirtualDom from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import { getFilterBadgeDom } from '../GetFilterBadgeDom/GetFilterBadgeDom.ts'
import { getInputBoxVirtualDom } from '../GetInputBoxVirtualDom/GetInputBoxVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'

const getChildCount = (badgeText: string | undefined): number => {
  let childCount = 0
  childCount++ // input
  if (badgeText) {
    childCount++ // badge
  }
  childCount++ // action button
  return childCount
}

export const getProblemsFilterVirtualDom = (action: ViewletAction): readonly VirtualDomNode[] => {
  return [
    {
      childCount: getChildCount(action.badgeText),
      className: ClassNames.Filter,
      type: VirtualDomElements.Div,
    },
    getInputBoxVirtualDom(InputName.Filter, action.command, action.placeholder || ''),
    ...getFilterBadgeDom(action.badgeText),
    ...GetActionButtonVirtualDom.getActionButtonVirtualDom({
      command: 'more filters',
      icon: MaskIcon.Filter,
      id: 'more filters', // TODO use i18n string
      onClick: DomEventListenerFunctions.HandleClickMoreFilters,
    }),
  ]
}
