import type { Problem } from '../Problem/Problem.ts'

export interface FilteredProblem extends Problem {
  readonly isCollapsed: boolean
  readonly listItemType: number
  readonly messageMatchIndex: number
  readonly sourceMatchIndex: number
  readonly uriMatchIndex: number
}
