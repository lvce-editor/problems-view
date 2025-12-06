import { type VirtualDomNode, AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetProblemsIconVirtualDom from '../GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.ts'
import * as GetProblemSourceDetail from '../GetProblemSourceDetail/GetProblemSourceDetail.ts'
import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'
import * as ViewletProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

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
  if (isActive) {
    className += ' ' + ClassNames.ProblemSelected
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
        paddingLeft: GetTreeItemIndent.getTreeItemIndent(1),
        role: AriaRoles.TreeItem,
        type: VirtualDomElements.Div,
      },
      listItemType === ProblemListItemType.Collapsed
        ? GetChevronVirtualDom.getChevronRightVirtualDom()
        : GetChevronVirtualDom.getChevronDownVirtualDom(),
      GetFileIconVirtualDom.getFileIconVirtualDom(icon),
      text(fileName),
      {
        childCount: 1,
        className: ClassNames.LabelDetail,
        type: VirtualDomElements.Div,
      },
      text(relativePath),
      ...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.ProblemBadge, problem.count),
    ]
  }
  const lineColumn = ViewletProblemsStrings.atLineColumn(rowIndex, columnIndex)
  const label = {
    childCount: 1,
    className: ClassNames.Label,
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
      paddingLeft: GetTreeItemIndent.getTreeItemIndent(2),
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
    dom.push(
      text(before),
      {
        childCount: 1,
        className: ClassNames.Highlight,
        type: VirtualDomElements.Div,
      },
      text(middle),
      text(after),
    )
  } else {
    dom.push(text(message))
  }
  dom.push(
    {
      childCount: 2,
      className: ClassNames.ProblemAt,
      type: VirtualDomElements.Span,
    },
    text(GetProblemSourceDetail.getProblemSourceDetail(source, code)),
    text(lineColumn),
  )
  return dom
}
