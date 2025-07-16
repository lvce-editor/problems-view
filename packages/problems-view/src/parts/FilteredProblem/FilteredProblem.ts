import type { Problem } from '../Problem/Problem.ts'

export interface FilteredProblem extends Problem {
  readonly uriMatchIndex: number
  readonly sourceMatchIndex: number
  readonly messageMatchIndex: number
  readonly listItemType: number
  readonly isCollapsed: boolean
}
