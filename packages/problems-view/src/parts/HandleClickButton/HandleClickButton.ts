import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import { collapseAll } from '../CollapseAll/CollapseAll.ts'
import { handleClickMoreFilters } from '../HandleClickMoreFilters/HandleClickMoreFilters.ts'
import { viewAsList } from '../ViewAsList/ViewAsList.ts'
import { viewAsTable } from '../ViewAsTable/ViewAsTable.ts'

export const handleClickButton = async (state: ProblemsState, name: string, eventX = 0, eventY = 0): Promise<ProblemsState> => {
  switch (name) {
    case 'collapseAll':
      return collapseAll(state)
    case 'more filters':
      return handleClickMoreFilters(state, eventX, eventY)
    case 'viewAsList':
      return viewAsList(state)
    case 'viewAsTable':
      return viewAsTable(state)
    default:
      return state
  }
}
