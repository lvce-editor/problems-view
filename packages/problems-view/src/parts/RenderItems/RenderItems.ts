import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetComponentDom from '../GetComponentDom/GetComponentDom.ts'

export const renderItems = (oldState: ProblemsState, newState: ProblemsState): ViewletCommand => {
  return ['Viewlet.setDom2', newState.uid, GetComponentDom.getComponentDom(newState)]
}
