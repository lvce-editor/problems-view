import type { FilteredProblem } from '../FilteredProblem/FilteredProblem.ts'

export interface VisibleProblem extends FilteredProblem {
  readonly filterValueLength: number
  readonly icon: string
  readonly isActive: boolean
  readonly isEven: boolean
}
