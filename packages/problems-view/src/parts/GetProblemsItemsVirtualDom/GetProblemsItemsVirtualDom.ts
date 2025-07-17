import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import { getNoResultsWithFilterVirtualDom } from '../GetNoResultsWithFilterVirtualDom/GetNoResultsWithFilterVirtualDom.ts'
import * as GetProblemsListVirtualDom from '../GetProblemsListVirtualDom/GetProblemsListVirtualDom.ts'
import * as GetProblemsNoProblemsFoundVirtualDom from '../GetProblemsNoProblemsFoundVirtualDom/GetProblemsNoProblemsFoundVirtualDom.ts'
import * as GetProblemsTableVirtualDom from '../GetProblemsTableVirtualDom/GetProblemsTableVirtualDom.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getProblemsVirtualDom = (viewMode: number, problems: readonly VisibleProblem[], filterValue: string): readonly VirtualDomNode[] => {
  if (problems.length === 0 && filterValue) {
    return getNoResultsWithFilterVirtualDom()
  }
  if (problems.length === 0) {
    return GetProblemsNoProblemsFoundVirtualDom.getProblemsNoProblemsFoundVirtualDom()
  }
  if (viewMode === ProblemsViewMode.Table) {
    return GetProblemsTableVirtualDom.getProblemsTableVirtualDom(problems)
  }
  return GetProblemsListVirtualDom.getProblemsListVirtualDom(problems)
}
