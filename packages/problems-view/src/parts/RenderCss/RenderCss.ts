import { ViewletCommand } from '@lvce-editor/constants'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetIndentRule from '../GetIndentRule/GetIndentRule.ts'
import * as GetUniqueIndents from '../GetUniqueIndents/GetUniqueIndents.ts'
import * as GetVisibleProblems from '../GetVisibleProblems/GetVisibleProblems.ts'

export const renderCss = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  const { collapsedUris, filterValue, focusedIndex, problems, uid } = newState
  const visibleProblems = GetVisibleProblems.getVisibleProblems(problems, collapsedUris, focusedIndex, filterValue)
  const uniqueIndents = GetUniqueIndents.getUniqueIndents(visibleProblems)
  const css = uniqueIndents.map(GetIndentRule.getIndentRule).join('\n')
  return [ViewletCommand.SetCss, uid, css]
}
