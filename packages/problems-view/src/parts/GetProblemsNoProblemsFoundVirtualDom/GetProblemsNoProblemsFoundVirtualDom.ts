import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getProblemsNoProblemsFoundVirtualDom = (filterValue: string): readonly VirtualDomNode[] => {
  // TODO avoid mutation
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: ClassNames.Message,
    childCount: 1,
  })
  if (filterValue) {
    dom[0].childCount += 2
    dom.push(
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
    )
  } else {
    dom.push(text(ProblemStrings.noProblemsDetected()))
  }
  return dom
}
