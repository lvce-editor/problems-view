import type { Problem } from '../Problem/Problem.ts'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as Arrays from '../Arrays/Arrays.ts'

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
  const newCollapsedUris = Arrays.removeElement(collapsedUris, problem.uri)
  return {
    index: focusedIndex,
    newCollapsedUris,
  }
}

export const handleArrowRight = (state: ProblemsState): ProblemsState => {
  const { problems, focusedIndex, collapsedUris } = state
  const { index, newCollapsedUris } = getArrowRightNewFocusedIndex(problems, collapsedUris, focusedIndex)
  return {
    ...state,
    focusedIndex: index,
    collapsedUris: newCollapsedUris,
  }
}
