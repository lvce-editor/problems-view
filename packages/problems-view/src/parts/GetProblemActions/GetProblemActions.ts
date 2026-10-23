import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as FilterProblems from '../FilterProblems/FilterProblems.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'
import * as ProblemStrings from '../ProblemStrings/ProblemStrings.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

const getDiagnosticCount = (
  problems: ProblemsState['problems'],
  filterValue: string,
  showErrors: boolean,
  showWarnings: boolean,
  showInfos: boolean,
): number => {
  const filteredProblems = FilterProblems.filterProblems(problems, [], filterValue, showErrors, showWarnings, showInfos)
  return filteredProblems.filter((problem) => problem.listItemType === ProblemListItemType.Item).length
}

export const getActions = (state: ProblemsState): readonly ViewletAction[] => {
  const { filterValue, inputSource, problems, showErrors, showInfos, showWarnings, smallWidthBreakPoint, viewMode, width } = state
  const visibleCount = getDiagnosticCount(problems, filterValue, showErrors, showWarnings, showInfos)
  const problemsCount = getDiagnosticCount(problems, '', showErrors, showWarnings, showInfos)
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
      command: DomEventListenerFunctions.HandleViewAsList,
      icon: MaskIcon.ListTree,
      id: ProblemStrings.viewAsList(),
      name: 'viewAsList',
      type: ActionType.Button,
    })
  } else {
    actions.push(
      {
        command: DomEventListenerFunctions.HandleCollapseAll,
        icon: MaskIcon.CollapseAll,
        id: ProblemStrings.collapseAll(),
        name: 'collapseAll',
        type: ActionType.Button,
      },
      {
        command: DomEventListenerFunctions.HandleViewAsTable,
        icon: MaskIcon.ListFlat,
        id: ProblemStrings.viewAsTable(),
        name: 'viewAsTable',
        type: ActionType.Button,
      },
    )
  }
  return actions
}
