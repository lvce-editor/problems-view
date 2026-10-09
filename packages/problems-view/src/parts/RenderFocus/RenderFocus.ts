import { ViewletCommand } from '@lvce-editor/constants'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand as Command } from '../ViewletCommand/ViewletCommand.ts'

export const renderFocus = (oldState: ProblemsState, newState: ProblemsState): Command => {
  return [ViewletCommand.FocusSelector, newState.uid, '.ProblemSelected']
}
