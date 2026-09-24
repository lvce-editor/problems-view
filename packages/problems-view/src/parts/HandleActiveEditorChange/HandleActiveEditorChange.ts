import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetActiveUri from '../GetActiveUri/GetActiveUri.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetProblems from '../GetProblems/GetProblems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ProblemsRequest from '../ProblemsRequest/ProblemsRequest.ts'
import * as ProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

const refreshProblems = async (state: ProblemsState, activeUri: string, request: number): Promise<ProblemsState> => {
  const { fileIconCache, uid } = state
  const { error, problems } = await GetProblems.getProblems(activeUri)
  const newFileIconCache = await GetFileIcons.getFileIcons(problems, fileIconCache)
  if (!ProblemsRequest.isLatestProblemsRequest(uid, request)) {
    return state
  }
  return {
    ...state,
    activeUri,
    fileIconCache: newFileIconCache,
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
  const { uid } = state
  const request = ProblemsRequest.startProblemsRequest(uid)
  return refreshProblems(state, activeUri, request)
}

export const handleDiagnosticsChange = async (state: ProblemsState, _uri: string): Promise<ProblemsState> => {
  const { activeUri: currentActiveUri, uid } = state
  const request = ProblemsRequest.startProblemsRequest(uid)
  const activeUri = currentActiveUri || (await GetActiveUri.getActiveUri())
  return refreshProblems(state, activeUri, request)
}
