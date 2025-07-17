import type { Problem } from '../Problem/Problem.ts'

export interface ProblemsState {
  readonly collapsedUris: readonly string[]
  readonly filteredProblems: readonly Problem[]
  readonly filterValue: string
  readonly focusedIndex: number
  readonly height: number
  readonly inputSource: number
  readonly itemHeight: number
  readonly listItems: readonly any[]
  readonly maxLineY: number
  readonly message: string
  readonly minLineY: number
  readonly parentUid: number
  readonly problems: readonly Problem[]
  readonly smallWidthBreakPoint: number
  readonly uid: number
  readonly viewMode: number
  readonly width: number
  readonly workspaceUri: string
  readonly x: number
  readonly y: number
}
