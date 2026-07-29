import { type VirtualDomNode, AriaRoles, mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetProblemIndent from '../GetProblemIndent/GetProblemIndent.ts'
import * as GetProblemsIconVirtualDom from '../GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.ts'
import * as GetProblemSourceDetail from '../GetProblemSourceDetail/GetProblemSourceDetail.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'
import * as ViewletProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

const labelNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Label,
  type: VirtualDomElements.Span,
}

const labelDetailNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.LabelDetail,
  type: VirtualDomElements.Div,
}

const highlightNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Highlight,
  type: VirtualDomElements.Div,
}

const problemAtNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.ProblemAt,
  type: VirtualDomElements.Span,
}

export const getProblemVirtualDom = (problem: VisibleProblem): readonly VirtualDomNode[] => {
  const {
    code,
    columnIndex,
    fileName,
    filterValueLength,
    icon,
    isActive,
    isCollapsed,
    level,
    listItemType,
    message,
    messageMatchIndex,
    posInSet,
    relativePath,
    rowIndex,
    setSize,
    source,
    type,
  } = problem
  let className = ClassNames.Problem
  const indent = GetProblemIndent.getProblemIndent(listItemType)
  className = mergeClassNames(className, `Indent-${indent}`)
  if (isActive) {
    className = mergeClassNames(className, ClassNames.ProblemSelected)
  }
  if (listItemType === ProblemListItemType.Expanded || listItemType === ProblemListItemType.Collapsed) {
    return [
      {
        ariaExpanded: !isCollapsed,
        ariaLevel: level,
        ariaPosInSet: posInSet,
        ariaSelected: isActive,
        ariaSetSize: setSize,
        childCount: 5,
        className,
        role: AriaRoles.TreeItem,
        type: VirtualDomElements.Div,
      },
      listItemType === ProblemListItemType.Collapsed
        ? GetChevronVirtualDom.getChevronRightVirtualDom()
        : GetChevronVirtualDom.getChevronDownVirtualDom(),
      GetFileIconVirtualDom.getFileIconVirtualDom(icon),
      labelNode,
      text(fileName),
      labelDetailNode,
      text(relativePath),
      ...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.ProblemBadge, problem.count),
    ]
  }
  const lineColumn = ViewletProblemsStrings.atLineColumn(rowIndex + 1, columnIndex + 1)
  const label = {
    childCount: 1,
    className: ClassNames.ProblemLabel,
    type: VirtualDomElements.Div,
  }
  /**
   * @type {any}
   */
  const dom = [
    {
      ariaLevel: level,
      ariaPosInSet: posInSet,
      ariaSelected: isActive,
      ariaSetSize: setSize,
      childCount: 3,
      className,
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    GetProblemsIconVirtualDom.getProblemsIconVirtualDom(type),
    label,
  ]
  if (filterValueLength) {
    const before = message.slice(0, messageMatchIndex)
    const middle = message.slice(messageMatchIndex, messageMatchIndex + filterValueLength)
    const after = message.slice(messageMatchIndex + filterValueLength)
    label.childCount += 2
    dom.push(text(before), highlightNode, text(middle), text(after))
  } else {
    dom.push(text(message))
  }
  dom.push(problemAtNode, text(GetProblemSourceDetail.getProblemSourceDetail(source, code)), text(lineColumn))
  return dom
}
