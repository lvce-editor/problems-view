import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as FilterProblems from '../FilterProblems/FilterProblems.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as GetVisibleProblemCount from '../GetVisibleProblemCount/GetVisibleProblemCount.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const handleClickAt = (state: ProblemsState, eventX: number, eventY: number): ProblemsState => {
  const { collapsedUris, deltaY, filterValue, itemHeight, problems, smallWidthBreakPoint, viewMode, width, x, y } = state

  // TODO use functional focus rendering
  // Focus.setFocus(FocusKey.Problems)
  const problemCount = GetVisibleProblemCount.getVisibleProblemCount(problems, collapsedUris, filterValue, viewMode)
  if (problemCount === 0) {
    return focusIndex(state, -1)
  }
  const listTopOffset = GetListHeight.getListTopOffset(width, smallWidthBreakPoint, viewMode)
  const index = GetListIndex.getListIndex(eventX, eventY, x, y + listTopOffset, deltaY, itemHeight)
  if (index < 0 || index >= problemCount) {
    return focusIndex(state, -1)
  }
  if (viewMode === ProblemsViewMode.List) {
    const visibleProblems = FilterProblems.filterProblems(problems, collapsedUris, filterValue)
    const problem = visibleProblems[index]
    if (problem.listItemType !== ProblemListItemType.Item) {
      const newCollapsedUris = collapsedUris.includes(problem.uri)
        ? collapsedUris.filter((uri) => uri !== problem.uri)
        : [...collapsedUris, problem.uri]
      return {
        ...state,
        collapsedUris: newCollapsedUris,
        focusedIndex: index,
      }
    }
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
