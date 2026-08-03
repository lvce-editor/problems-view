import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetFilterInputName from '../GetFilterInputName/GetFilterInputName.ts'

export const renderFilterValue = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  return ['Viewlet.setValueByName', GetFilterInputName.getFilterInputName(newState.inputSource, newState.filterValue), newState.filterValue]
}
