import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'
import { handleClickAt } from '../HandleClickAt/HandleClickAt.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

export const handleProblemClick = async (state: ProblemsState, eventX: number, eventY: number): Promise<ProblemsState> => {
  const newState = handleClickAt(state, eventX, eventY)
  const { focusedIndex } = newState
  if (focusedIndex < 0) {
    return newState
  }
  const { collapsedUris, fileIconCache, filterValue, problems, showErrors, showInfos, showWarnings, viewMode } = newState
  const visibleProblems = GetVisibleProblems.getVisibleProblems(
    problems,
    fileIconCache,
    collapsedUris,
    focusedIndex,
    filterValue,
    focusedIndex,
    focusedIndex + 1,
    viewMode,
    showErrors,
    showWarnings,
    showInfos,
  )
  const problem = visibleProblems[0]
  if (!problem || problem.listItemType !== ProblemListItemType.Item) {
    return newState
  }
  const { columnIndex, rowIndex, targetUri, uri } = problem
  await RendererWorker.openUri(targetUri || uri, true)
  await RendererWorker.invoke('Main.focus')
  await RendererWorker.invoke('Editor.cursorSet', rowIndex, columnIndex)
  return newState
}
