import type { IndexResult } from '../IndexResult/IndexResult.ts'
import type { Problem } from '../Problem/Problem.ts'

export const getArrowRightNewFocusedIndex = (problems: readonly Problem[], collapsedUris: readonly string[], focusedIndex: number): IndexResult => {
  const problem = problems[focusedIndex]
  const newCollapsedUris = collapsedUris.includes(problem.uri) ? collapsedUris.filter((uri) => uri !== problem.uri) : collapsedUris
  return {
    index: focusedIndex,
    newCollapsedUris,
  }
}
