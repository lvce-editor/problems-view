import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleFilterInput = (state: ProblemsState, value: string, inputSource = InputSource.Script): ProblemsState => {
  return {
    ...state,
    filterValue: value,
    inputSource,
  }
}
