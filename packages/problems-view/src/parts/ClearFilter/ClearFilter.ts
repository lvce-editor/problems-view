import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const clearFilter = (state: ProblemsState): ProblemsState => {
  return {
    ...state,
    filterValue: '',
    inputSource: InputSource.Script,
  }
}
