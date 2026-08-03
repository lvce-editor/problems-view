import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Problem } from '../Problem/Problem.ts'

export interface ProblemsState {
  readonly activeUri: string
  readonly collapsedUris: readonly string[]
  readonly deltaY: number
  readonly fileIconCache: FileIconCache
  readonly filteredProblems: readonly Problem[]
  readonly filterValue: string
  readonly finalDeltaY: number
  readonly focusedIndex: number
  readonly handleOffset: number
  readonly height: number
  readonly inputSource: number
  readonly itemHeight: number
  readonly listItems: readonly any[]
  readonly maxLineY: number
  readonly message: string
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly problems: readonly Problem[]
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly showErrors: boolean
  readonly showInfos: boolean
  readonly showWarnings: boolean
  readonly smallWidthBreakPoint: number
  readonly uid: number
  readonly viewMode: number
  readonly width: number
  readonly workspaceUri: string
  readonly x: number
  readonly y: number
}
