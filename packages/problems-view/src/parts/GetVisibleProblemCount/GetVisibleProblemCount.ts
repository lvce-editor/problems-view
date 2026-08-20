import type { Problem } from '../Problem/Problem.ts'
import * as FilterProblems from '../FilterProblems/FilterProblems.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getVisibleProblemCount = (
  problems: readonly Problem[],
  collapsedUris: readonly string[],
  filterValue: string,
  viewMode: number,
  showErrors = true,
  showWarnings = true,
  showInfos = true,
): number => {
  const effectiveCollapsedUris = viewMode === ProblemsViewMode.Table ? [] : collapsedUris
  const filtered = FilterProblems.filterProblems(problems, effectiveCollapsedUris, filterValue, showErrors, showWarnings, showInfos)
  if (viewMode !== ProblemsViewMode.Table) {
    return filtered.length
  }
  let count = 0
  for (const problem of filtered) {
    if (problem.message) {
      count++
    }
  }
  return count
}
