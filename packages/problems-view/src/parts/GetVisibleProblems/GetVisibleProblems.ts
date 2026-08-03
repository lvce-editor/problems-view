import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Problem } from '../Problem/Problem.ts'
import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FilterProblems from '../FilterProblems/FilterProblems.ts'
import * as GetIcon from '../GetIcon/GetIcon.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getVisibleProblems = (
  problems: readonly Problem[],
  fileIconCache: FileIconCache,
  collapsedUris: readonly string[],
  focusedIndex: number,
  filterValue: string,
  minLineY = 0,
  maxLineY = Infinity,
  viewMode = ProblemsViewMode.List,
): readonly VisibleProblem[] => {
  Assert.array(problems)
  Assert.array(collapsedUris)
  Assert.number(focusedIndex)
  Assert.string(filterValue)
  const visibleItems = []
  const filterValueLength = filterValue.length
  const filtered = FilterProblems.filterProblems(problems, collapsedUris, filterValue)
  const displayProblems = viewMode === ProblemsViewMode.Table ? filtered.filter((problem) => problem.message) : filtered
  const finalLineY = Math.min(maxLineY, displayProblems.length)
  for (let i = minLineY; i < finalLineY; i++) {
    const problem = displayProblems[i]
    visibleItems.push({
      ...problem,
      filterValueLength,
      icon: GetIcon.getIcon(problem.uri, fileIconCache),
      isActive: i === focusedIndex,
      isEven: i % 2 === 0,
    })
  }
  return visibleItems
}
