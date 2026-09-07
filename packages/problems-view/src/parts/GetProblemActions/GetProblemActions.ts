import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getActions = (state: ProblemsState): readonly ViewletAction[] => {
  const {
    collapsedUris,
    fileIconCache,
    filterValue,
    focusedIndex,
    inputSource,
    problems,
    showErrors,
    showInfos,
    showWarnings,
    smallWidthBreakPoint,
    viewMode,
    width,
  } = state
  const visibleCount = GetVisibleProblems.getVisibleProblems(
    problems,
    fileIconCache,
    collapsedUris,
    focusedIndex,
    filterValue,
    0,
    Infinity,
    viewMode,
    showErrors,
    showWarnings,
    showInfos,
  ).length
  const problemsCount = problems.length
  const isSmall = width <= smallWidthBreakPoint
  const actions: ViewletAction[] = []
  if (!isSmall) {
    actions.push({
      badgeText: visibleCount === problemsCount ? '' : ProblemStrings.showingOf(visibleCount, problemsCount),
      command: DomEventListenerFunctions.HandleFilterInput,
      id: 'Filter',
      name: InputName.ProblemsInput,
      placeholder: ProblemStrings.filter(),
      type: ActionType.ProblemsFilter,
      value: inputSource === InputSource.Script ? filterValue : '',
    })
  }
  if (viewMode === ProblemsViewMode.Table) {
    actions.push({
      command: 'viewAsList',
      icon: MaskIcon.ListTree,
      id: ProblemStrings.viewAsList(),
      type: ActionType.Button,
    })
  } else {
    actions.push(
      {
        command: 'collapseAll',
        icon: MaskIcon.CollapseAll,
        id: ProblemStrings.collapseAll(),
        type: ActionType.Button,
      },
      {
        command: 'viewAsTable',
        icon: MaskIcon.ListFlat,
        id: ProblemStrings.viewAsTable(),
        type: ActionType.Button,
      },
    )
  }
  return actions
}
