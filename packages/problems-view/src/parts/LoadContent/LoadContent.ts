import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetActiveUri from '../GetActiveUri/GetActiveUri.ts'
import * as GetProblems from '../GetProblems/GetProblems.ts'
import * as GetSavedCollapsedUris from '../GetSavedCollapsedUris/GetSavedCollapsedUris.ts'
import * as GetSavedFilterValue from '../GetSavedFilterValue/GetSavedFilterValue.ts'
import * as GetSavedViewMode from '../GetSavedViewMode/GetSavedViewMode.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ViewletProblemsStrings from '../ProblemStrings/ProblemStrings.ts'

export const loadContent = async (state: ProblemsState, savedState: any): Promise<ProblemsState> => {
  const { workspaceUri } = state
  const activeUri = await GetActiveUri.getActiveUri()
  const { error, problems } = await GetProblems.getProblems(workspaceUri, activeUri)
  if (error) {
    return {
      ...state,
      activeUri,
      filteredProblems: [],
      message: error,
      problems: [],
    }
  }
  const message = ViewletProblemsStrings.getMessage(problems.length)
  const viewMode = GetSavedViewMode.getSavedViewMode(savedState)
  const filterValue = GetSavedFilterValue.getSavedFilterValue(savedState)
  const collapsedUris = GetSavedCollapsedUris.getSavedCollapsedUris(savedState)
  return {
    ...state,
    activeUri,
    collapsedUris,
    filteredProblems: problems,
    filterValue,
    inputSource: InputSource.Script,
    listItems: [],
    message,
    problems,
    viewMode,
  }
}
