import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ProblemListItemType from '../ProblemListItemType/ProblemListItemType.ts'

const isNotItem = (problem:Problem):boolean=>{
  return problem.listItemType !== ProblemListItemType.Item
}

export const collapseAll = (state: ProblemsState): ProblemsState => {
  const { problems } = state
  const collapsedUris = problems.filter(isNotItem).map((problem) => problem.uri)
  return {
    ...state,
    collapsedUris: [...new Set(collapsedUris)],
  }
}
