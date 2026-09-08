import { ViewletCommand } from '@lvce-editor/constants'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand as Command } from '../ViewletCommand/ViewletCommand.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: ProblemsState, newState: ProblemsState): Command => {
  return [ViewletCommand.SetFocusContext, newState.uid, WhenExpression.FocusProblems]
}
