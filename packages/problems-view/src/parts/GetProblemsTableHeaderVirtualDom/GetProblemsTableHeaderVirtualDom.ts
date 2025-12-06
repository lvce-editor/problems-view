import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'

export const getProblemsTableHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  const textCode = ProblemStrings.code()
  const textSource = ProblemStrings.source()
  const textMessage = ProblemStrings.message()
  const textFile = ProblemStrings.file()
  const dom = [
    {
      childCount: 1,
      className: ClassNames.ProblemsTableHeader,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 5,
      className: ClassNames.ProblemsTableRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    text(textCode),
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    text(textMessage),
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    text(textFile),
    {
      childCount: 1,
      className: ClassNames.ProblemsTableRowItem,
      type: VirtualDomElements.Div,
    },
    text(textSource),
  ]
  return dom
}
