import type { Problem } from '../Problem/Problem.ts'

export interface ProblemsResult {
  readonly problems: readonly Problem[]
  readonly error: string
}
