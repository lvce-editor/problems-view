import { type VirtualDomNode, AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.js'
import * as GetProblemsIconVirtualDom from '../GetProblemsIconVirtualDom/GetProblemsIconVirtualDom.js'
import * as GetProblemSourceDetail from '../GetProblemSourceDetail/GetProblemSourceDetail.js'
import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.js'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'
import * as ViewletProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

export const getProblemVirtualDom = (problem: VisibleProblem): readonly VirtualDomNode[] => {
  const {
    message,
    rowIndex,
    columnIndex,
    isActive,
    uri,
    icon,
    source,
    relativePath,
    messageMatchIndex,
    filterValueLength,
    code,
    type,
    posInSet,
    setSize,
    level,
    listItemType,
    isCollapsed,
  } = problem
  let className = ClassNames.Problem
  if (isActive) {
    className += ' ' + ClassNames.ProblemSelected
  }
  if (listItemType === ProblemListItemType.Expanded || listItemType === ProblemListItemType.Collapsed) {
    return [
      {
        type: VirtualDomElements.Div,
        className,
        childCount: 5,
        paddingLeft: GetTreeItemIndent.getTreeItemIndent(1),
        ariaPosInSet: posInSet,
        ariaSetSize: setSize,
        ariaLevel: level,
        ariaExpanded: !isCollapsed,
        ariaSelected: isActive,
        role: AriaRoles.TreeItem,
      },
      listItemType === ProblemListItemType.Collapsed
        ? GetChevronVirtualDom.getChevronRightVirtualDom()
        : GetChevronVirtualDom.getChevronDownVirtualDom(),
      GetFileIconVirtualDom.getFileIconVirtualDom(icon),
      text(uri),
      {
        type: VirtualDomElements.Div,
        className: ClassNames.LabelDetail,
        childCount: 1,
      },
      text(relativePath),
      ...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.ProblemBadge, problem.count),
    ]
  }
  const lineColumn = ViewletProblemsStrings.atLineColumn(rowIndex, columnIndex)
  const label = {
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 1,
  }
  /**
   * @type {any}
   */
  const dom = [
    {
      type: VirtualDomElements.Div,
      className,
      childCount: 3,
      paddingLeft: GetTreeItemIndent.getTreeItemIndent(2),
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      ariaLevel: level,
      ariaSelected: isActive,
      role: AriaRoles.TreeItem,
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
        type: VirtualDomElements.Div,
        className: ClassNames.Highlight,
        childCount: 1,
      },
      text(middle),
      text(after),
    )
  } else {
    dom.push(text(message))
  }
  dom.push(
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ProblemAt,
      childCount: 2,
    },
    text(GetProblemSourceDetail.getProblemSourceDetail(source, code)),
    text(lineColumn),
  )
  return dom
}
