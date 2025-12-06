import type { Problem } from '../Problem/Problem.ts'

export interface ProblemsResult {
  readonly error: string
  readonly problems: readonly Problem[]
}
