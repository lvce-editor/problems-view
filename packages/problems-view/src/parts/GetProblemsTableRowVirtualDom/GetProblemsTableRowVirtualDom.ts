import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetProblemsIconVirtualDom from '../GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.ts'
import * as GetProblemSourceDetail from '../GetProblemSourceDetail/GetProblemSourceDetail.ts'

const rowItemNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ProblemsTableRowItem,
  type: VirtualDomElements.Div,
}

const getClassName = (isEven: boolean): string => {
  if (isEven) {
    return ClassNames.ProblemsTableRow
  }
  return mergeClassNames(ClassNames.ProblemsTableRow, ClassNames.ProblemsTableRowOdd)
}

export const getProblemsTableRowVirtualDom = (problem: VisibleProblem): readonly VirtualDomNode[] => {
  const { code, isEven, message, source, type, uri } = problem
  // TODO problems are grouped by uri, depending
  // on which renderer is used the data needs to look different
  if (!message) {
    return []
  }
  const dom = [
    {
      childCount: 5,
      className: getClassName(isEven),
      type: VirtualDomElements.Div,
    },
    rowItemNode,
    GetProblemsIconVirtualDom.getProblemsIconVirtualDom(type),
    rowItemNode,
    text(GetProblemSourceDetail.getProblemSourceDetail(source, code)),
    rowItemNode,
    text(message),
    rowItemNode,
    text(uri),
    rowItemNode,
    text(source),
  ]
  return dom
}
