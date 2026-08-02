import type { Problem } from '../Problem/Problem.ts'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'

interface NewFocusedIndexResult {
  readonly index: number
  readonly newCollapsedUris: readonly string[]
}

const getArrowRightNewFocusedIndex = (
  problems: readonly Problem[],
  collapsedUris: readonly string[],
  focusedIndex: number,
): NewFocusedIndexResult => {
  const problem = problems[focusedIndex]
  const newCollapsedUris = collapsedUris.includes(problem.uri) ? collapsedUris.filter((uri) => uri !== problem.uri) : collapsedUris
  return {
    index: focusedIndex,
    newCollapsedUris,
  }
}

export const handleArrowRight = (state: ProblemsState): ProblemsState => {
  const { collapsedUris, focusedIndex, problems } = state
  const { index, newCollapsedUris } = getArrowRightNewFocusedIndex(problems, collapsedUris, focusedIndex)
  return {
    ...state,
    collapsedUris: newCollapsedUris,
    focusedIndex: index,
  }
}
