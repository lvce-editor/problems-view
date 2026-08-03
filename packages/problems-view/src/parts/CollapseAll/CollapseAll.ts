import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

export const collapseAll = (state: ProblemsState): ProblemsState => {
  const { problems } = state
  const collapsedUris = problems.filter((problem) => problem.listItemType !== ProblemListItemType.Item).map((problem) => problem.uri)
  return {
    ...state,
    collapsedUris: [...new Set(collapsedUris)],
  }
}
