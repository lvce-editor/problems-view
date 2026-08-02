import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetProblems from '../GetProblems/GetProblems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

const refreshProblems = async (state: ProblemsState, activeUri: string): Promise<ProblemsState> => {
  const { workspaceUri } = state
  const { error, problems } = await GetProblems.getProblems(workspaceUri, activeUri)
  return {
    ...state,
    activeUri,
    filteredProblems: problems,
    inputSource: InputSource.Script,
    listItems: [],
    message: error || ProblemsStrings.getMessage(problems.length),
    problems,
  }
}

export const handleActiveEditorChange = async (state: ProblemsState, activeUri: string): Promise<ProblemsState> => {
  const { activeUri: oldActiveUri } = state
  if (activeUri === oldActiveUri) {
    return state
  }
  return refreshProblems(state, activeUri)
}

export const handleDiagnosticsChange = async (state: ProblemsState, uri: string): Promise<ProblemsState> => {
  const { activeUri } = state
  if (uri !== activeUri) {
    return state
  }
  return refreshProblems(state, uri)
}
