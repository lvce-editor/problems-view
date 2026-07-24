import type { VisibleProblem } from '../VisibleProblem/VisibleProblem.ts'
import * as GetProblemIndent from '../GetProblemIndent/GetProblemIndent.ts'

export const getUniqueIndents = (problems: readonly VisibleProblem[]): readonly string[] => {
  const uniqueIndents: string[] = []
  for (const problem of problems) {
    const indent = GetProblemIndent.getProblemIndent(problem.listItemType)
    if (!uniqueIndents.includes(indent)) {
      uniqueIndents.push(indent)
    }
  }
  return uniqueIndents
}
