import type { Problem } from '../Problem/Problem.ts'
import * as ProblemType from '../ProblemType/ProblemType.ts'

export const matchesSeverity = (problem: Problem, showErrors: boolean, showWarnings: boolean, showInfos: boolean): boolean => {
  switch (problem.type) {
    case ProblemType.Error:
      return showErrors
    case ProblemType.Warning:
      return showWarnings
    default:
      return showInfos
  }
}
