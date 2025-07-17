import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getNoResultsWithFilterVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Message,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 1,
    },
    text(ProblemStrings.noResultsFoundWithProvidedFilterCriteria()),
    {
      type: VirtualDomElements.A,
      className: ClassNames.MessageAction,
      childCount: 1,
      onClick: DomEventListenerFunctions.HandleClearFilterClick,
    },
    text(ProblemStrings.clearFilter()),
    text('.'),
  ]
}
