import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'
import { handleClickAt } from '../HandleClickAt/HandleClickAt.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const handleProblemClick = async (state: ProblemsState, eventX: number, eventY: number): Promise<ProblemsState> => {
  const newState = handleClickAt(state, eventX, eventY)
  const { focusedIndex } = newState
  if (focusedIndex < 0) {
    return newState
  }
  const { collapsedUris, fileIconCache, filterValue, problems, viewMode } = newState
  const visibleProblems = GetVisibleProblems.getVisibleProblems(
    problems,
    fileIconCache,
    collapsedUris,
    focusedIndex,
    filterValue,
    focusedIndex,
    focusedIndex + 1,
    viewMode,
  )
  const problem = visibleProblems[0]
  if (!problem || problem.listItemType !== ProblemListItemType.Item) {
    return newState
  }
  const { columnIndex, rowIndex, uri } = problem
  await RendererWorker.openUri(uri, true, {
    selections: new Uint32Array([rowIndex, columnIndex, rowIndex, columnIndex]),
  })
  return newState
}
