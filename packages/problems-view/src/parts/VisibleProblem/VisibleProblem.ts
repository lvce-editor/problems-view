import type { FilteredProblem } from '../FilteredProblem/FilteredProblem.ts'

export interface VisibleProblem extends FilteredProblem {
  readonly isEven: boolean
  readonly isActive: boolean
  readonly icon: string
  readonly filterValueLength: number
}
