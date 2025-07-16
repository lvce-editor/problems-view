import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as ClipBoard from '../ClipBoard/ClipBoard.ts'

export const copyMessage = async (state: ProblemsState): Promise<ProblemsState> => {
  const { problems, focusedIndex } = state
  const problem = problems[focusedIndex]
  await ClipBoard.writeText(problem.message)
  return state
}
