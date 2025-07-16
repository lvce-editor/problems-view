import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

export const getActions = (state: ProblemsState): readonly ViewletAction[] => {
  const visibleCount = GetVisibleProblems.getVisibleProblems(state.problems, state.collapsedUris, state.focusedIndex, state.filterValue).length
  const problemsCount = state.problems.length
  const isSmall = state.width <= state.smallWidthBreakPoint
  const actions: ViewletAction[] = []
  if (!isSmall) {
    actions.push({
      type: ActionType.ProblemsFilter,
      id: 'Filter',
      command: DomEventListenerFunctions.HandleFilterInput,
      badgeText: visibleCount === problemsCount ? '' : ProblemStrings.showingOf(visibleCount, problemsCount),
      placeholder: ProblemStrings.filter(),
      value: state.inputSource === InputSource.Script ? state.filterValue : '',
    })
  }
  if (state.viewMode === ProblemsViewMode.Table) {
    actions.push({
      type: ActionType.Button,
      id: ProblemStrings.viewAsList(),
      command: 'viewAsList',
      icon: MaskIcon.ListTree,
    })
  } else {
    actions.push(
      {
        type: ActionType.Button,
        id: ProblemStrings.collapseAll(),
        command: 'collapseAll',
        icon: MaskIcon.CollapseAll,
      },
      {
        type: ActionType.Button,
        id: ProblemStrings.viewAsTable(),
        command: 'viewAsTable',
        icon: MaskIcon.ListFlat,
      },
    )
  }
  return actions
}
