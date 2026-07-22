import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

const messageNode: VirtualDomNode = {
  childCount: 3,
  className: ClassNames.Message,
  type: VirtualDomElements.Div,
}

const spanNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const clearFilterNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.MessageAction,
  onClick: DomEventListenerFunctions.HandleClearFilterClick,
  type: VirtualDomElements.A,
}

export const getNoResultsWithFilterVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    messageNode,
    spanNode,
    text(ProblemStrings.noResultsFoundWithProvidedFilterCriteria()),
    clearFilterNode,
    text(ProblemStrings.clearFilter()),
    text('.'),
  ]
}
