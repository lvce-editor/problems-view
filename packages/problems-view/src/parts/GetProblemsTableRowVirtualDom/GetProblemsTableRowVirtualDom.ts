import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsIconVirtualDom from '../GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.ts'
import * as GetProblemSourceDetail from '../GetProblemSourceDetail/GetProblemSourceDetail.ts'

const getClassName = (isEven: boolean): string => {
  if (isEven) {
    return ClassNames.ProblemsTableRow
  }
  return mergeClassNames(ClassNames.ProblemsTableRow, ClassNames.ProblemsTableRowOdd)
}

export const getProblemsTableRowVirtualDom = (problem: VisibleProblem): readonly VirtualDomNode[] => {
  const { code, source, uri, message, isEven, type } = problem
  // TODO problems are grouped by uri, depending
  // on which renderer is used the data needs to look different
  if (!message) {
    return []
  }
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: getClassName(isEven),
      childCount: 5,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    GetProblemsIconVirtualDom.getProblemsIconVirtualDom(type),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    text(GetProblemSourceDetail.getProblemSourceDetail(source, code)),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    text(message),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    text(uri),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ProblemsTableRowItem,
      childCount: 1,
    },
    text(source),
  ]
  return dom
}
