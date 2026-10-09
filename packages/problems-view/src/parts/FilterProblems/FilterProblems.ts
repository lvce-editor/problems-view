import type { FilteredProblem } from '../FilteredProblem/FilteredProblem.ts'
import type { Problem } from '../Problem/Problem.ts'
import { getListItemType } from '../GetListItemType/GetListItemType.ts'
import { matchesFilterValue } from '../MatchesFilterValue/MatchesFilterValue.ts'
import { matchesSeverity } from '../MatchesSeverity/MatchesSeverity.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

export const filterProblems = (
  problems: readonly Problem[],
  collapsedUris: readonly string[],
  filterValue: string,
  showErrors = true,
  showWarnings = true,
  showInfos = true,
): readonly FilteredProblem[] => {
  const filterValueLower = filterValue.toLowerCase()
  const collapsedUriSet = new Set(collapsedUris)
  const hasSeverityFilter = !showErrors || !showWarnings || !showInfos
  const visibleUris = new Set(
    problems
      .filter((problem) => problem.listItemType === ProblemListItemType.Item && matchesSeverity(problem, showErrors, showWarnings, showInfos))
      .map((problem) => problem.uri),
  )
  const filtered = []
  for (const problem of problems) {
    if (problem.listItemType === ProblemListItemType.Item) {
      if (!matchesSeverity(problem, showErrors, showWarnings, showInfos)) {
        continue
      }
    } else if (hasSeverityFilter && !visibleUris.has(problem.uri)) {
      continue
    }
    const uriMatchIndex = matchesFilterValue(problem.uri, filterValueLower)
    const sourceMatchIndex = matchesFilterValue(problem.source, filterValueLower)
    const messageMatchIndex = matchesFilterValue(problem.message, filterValueLower)
    if (uriMatchIndex === -1 && sourceMatchIndex === -1 && messageMatchIndex === -1) {
      continue
    }
    const isCollapsed = collapsedUriSet.has(problem.uri)
    if (isCollapsed && problem.listItemType === ProblemListItemType.Item) {
      continue
    }

    filtered.push({
      ...problem,
      isCollapsed,
      listItemType: getListItemType(problem.listItemType, isCollapsed),
      messageMatchIndex,
      sourceMatchIndex,
      uriMatchIndex,
    })
  }
  return filtered
}
