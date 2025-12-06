import type { ProblemsState } from '../ProblemsState/ProblemsState.ts'
import * as GetProblems from '../GetProblems/GetProblems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ViewletProblemsStrings from '../ProblemStrings/ProblemStrings.ts'
import * as ProblemsViewMode from '../ProblemsViewMode/ProblemsViewMode.ts'

const getSavedViewMode = (savedState: any): number => {
  if (savedState && typeof savedState.viewMode === 'number') {
    return savedState.viewMode
  }
  return ProblemsViewMode.List
}

const getSavedFilterValue = (savedState: any): string => {
  if (savedState && typeof savedState.filterValue === 'string') {
    return savedState.filterValue
  }
  return ''
}

const isString = (value: unknown): boolean => {
  return typeof value === 'string'
}

const getSavedCollapsedUris = (savedState: any): readonly string[] => {
  if (savedState && savedState.collapsedUris && Array.isArray(savedState.collapsedUris) && savedState.collapsedUris.every(isString)) {
    return savedState.collapsedUris
  }
  return []
}

export const loadContent = async (state: ProblemsState, savedState: any): Promise<ProblemsState> => {
  const { error, problems } = await GetProblems.getProblems(state.workspaceUri)
  if (error) {
    return {
      ...state,
      message: error,
    }
  }
  const message = ViewletProblemsStrings.getMessage(problems.length)
  const viewMode = getSavedViewMode(savedState)
  const filterValue = getSavedFilterValue(savedState)
  const collapsedUris = getSavedCollapsedUris(savedState)
  return {
    ...state,
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
