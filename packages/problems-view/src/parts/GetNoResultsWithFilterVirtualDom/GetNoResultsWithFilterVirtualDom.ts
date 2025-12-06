import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getNoResultsWithFilterVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 3,
      className: ClassNames.Message,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text(ProblemStrings.noResultsFoundWithProvidedFilterCriteria()),
    {
      childCount: 1,
      className: ClassNames.MessageAction,
      onClick: DomEventListenerFunctions.HandleClearFilterClick,
      type: VirtualDomElements.A,
    },
    text(ProblemStrings.clearFilter()),
    text('.'),
  ]
}
