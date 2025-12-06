import type { Problem } from '../Problem/Problem.ts'
import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

interface IndexResult {
  readonly index: number
  readonly newCollapsedUris: readonly string[]
}

const getArrowLeftNewFocusedIndex = (problems: readonly Problem[], collapsedUris: readonly string[], focusedIndex: number): IndexResult => {
  for (let i = focusedIndex; i >= 0; i--) {
    const problem = problems[i]
    if (problem.listItemType !== ProblemListItemType.Item) {
      return {
        index: i,
        newCollapsedUris: [...collapsedUris, problem.uri],
      }
    }
  }
  return {
    index: 0,
    newCollapsedUris: collapsedUris,
  }
}

export const handleArrowLeft = (state: ProblemsState): ProblemsState => {
  const { collapsedUris, focusedIndex, problems } = state
  const { index, newCollapsedUris } = getArrowLeftNewFocusedIndex(problems, collapsedUris, focusedIndex)
  return {
    ...state,
    collapsedUris: newCollapsedUris,
    focusedIndex: index,
  }
}
