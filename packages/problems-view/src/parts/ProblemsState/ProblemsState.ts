import type { Problem } from '../Problem/Problem.ts'

export interface ProblemsState {
  readonly uid: number
  readonly parentUid: number
  readonly problems: readonly Problem[]
  readonly focusedIndex: number
  readonly message: string
  readonly itemHeight: number
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly filterValue: string
  readonly viewMode: number
  readonly inputSource: number
  readonly minLineY: number
  readonly maxLineY: number
  readonly listItems: readonly any[]
  readonly collapsedUris: readonly string[]
  readonly smallWidthBreakPoint: number
}
