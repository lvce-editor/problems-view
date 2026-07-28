import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getNoResultsWithFilterVirtualDom } from '../GetNoResultsWithFilterVirtualDom/GetNoResultsWithFilterVirtualDom.ts'
import * as GetProblemsListVirtualDom from '../GetProblemsListVirtualDom/GetProblemsListVirtualDom.ts'
import * as GetProblemsNoProblemsFoundVirtualDom from '../GetProblemsNoProblemsFoundVirtualDom/GetProblemsNoProblemsFoundVirtualDom.ts'
import * as GetProblemsTableVirtualDom from '../GetProblemsTableVirtualDom/GetProblemsTableVirtualDom.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Message,
  type: VirtualDomElements.Div,
}

export const getProblemsVirtualDom = (
  viewMode: number,
  problems: readonly VisibleProblem[],
  filterValue: string,
  message: string,
  problemCount = problems.length,
): readonly VirtualDomNode[] => {
  if (problemCount === 0 && message) {
    return [messageNode, text(message)]
  }
  if (problemCount === 0 && filterValue) {
    return getNoResultsWithFilterVirtualDom()
  }
  if (problemCount === 0) {
    return GetProblemsNoProblemsFoundVirtualDom.getProblemsNoProblemsFoundVirtualDom()
  }
  if (viewMode === ProblemsViewMode.Table) {
    return GetProblemsTableVirtualDom.getProblemsTableVirtualDom(problems)
  }
  return GetProblemsListVirtualDom.getProblemsListVirtualDom(problems)
}
