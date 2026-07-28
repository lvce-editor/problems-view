import type { Problem } from '../Problem/Problem.ts'
import * as FilterProblems from '../FilterProblems/FilterProblems.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getVisibleProblemCount = (
  problems: readonly Problem[],
  collapsedUris: readonly string[],
  filterValue: string,
  viewMode: number,
): number => {
  const filtered = FilterProblems.filterProblems(problems, collapsedUris, filterValue)
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
