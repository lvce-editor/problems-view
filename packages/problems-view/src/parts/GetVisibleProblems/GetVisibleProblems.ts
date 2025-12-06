import type { Problem } from '../Problem/Problem.ts'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FilterProblems from '../FilterProblems/FilterProblems.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'

const getIcon = (uri: string): string => {
  if (!uri) {
    return ''
  }
  return IconTheme.getFileNameIcon(uri)
}

export const getVisibleProblems = (
  problems: readonly Problem[],
  collapsedUris: readonly string[],
  focusedIndex: number,
  filterValue: string,
): readonly VisibleProblem[] => {
  Assert.array(problems)
  Assert.array(collapsedUris)
  Assert.number(focusedIndex)
  Assert.string(filterValue)
  const visibleItems = []
  const filterValueLength = filterValue.length
  const filtered = FilterProblems.filterProblems(problems, collapsedUris, filterValue)
  for (let i = 0; i < filtered.length; i++) {
    const problem = filtered[i]
    visibleItems.push({
      ...problem,
      filterValueLength,
      icon: getIcon(problem.uri),
      isActive: i === focusedIndex,
      isEven: i % 2 === 0,
    })
  }
  return visibleItems
}
