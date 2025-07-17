import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderFilterValue = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  return ['Viewlet.setValueByName', InputName.Filter, newState.filterValue]
}
