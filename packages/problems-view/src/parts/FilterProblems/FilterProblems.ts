import type { FilteredProblem } from '../FilteredProblem/FilteredProblem.ts'
import type { Problem } from '../Problem/Problem.ts'
import { matchesFilterValue } from '../MatchesFilterValue/MatchesFilterValue.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

const getListItemType = (listItemType: number, isCollapsed: boolean): number => {
  if (listItemType === ProblemListItemType.Item) {
    return ProblemListItemType.Item
  }
  if (isCollapsed) {
    return ProblemListItemType.Collapsed
  }
  return ProblemListItemType.Expanded
}

export const filterProblems = (problems: readonly Problem[], collapsedUris: readonly string[], filterValue: string): readonly FilteredProblem[] => {
  const filterValueLower = filterValue.toLowerCase()
  const filtered = []
  for (const problem of problems) {
    const uriMatchIndex = matchesFilterValue(problem.uri, filterValueLower)
    const sourceMatchIndex = matchesFilterValue(problem.source, filterValueLower)
    const messageMatchIndex = matchesFilterValue(problem.message, filterValueLower)
    if (uriMatchIndex === -1 && sourceMatchIndex === -1 && messageMatchIndex === -1) {
      continue
    }
    const isCollapsed = collapsedUris.includes(problem.uri)
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
